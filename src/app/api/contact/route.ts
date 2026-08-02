import { NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

// ── Rate Limiter ──────────────────────────────────────────────────────────────
// Sliding window: max 3 requests per 60s per IP, with automatic cleanup
const rateLimitMap = new Map<string, { timestamps: number[] }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const CLEANUP_INTERVAL_MS = 300_000; // cleanup every 5 min

// Periodic cleanup to prevent memory leaks on long-running serverless instances
let lastCleanup = Date.now();
function cleanupRateLimitMap() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [ip, entry] of rateLimitMap) {
    entry.timestamps = entry.timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (entry.timestamps.length === 0) rateLimitMap.delete(ip);
  }
}

function isRateLimited(ip: string): boolean {
  cleanupRateLimitMap();
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { timestamps: [now] });
    return false;
  }

  // Remove timestamps outside the sliding window
  entry.timestamps = entry.timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  entry.timestamps.push(now);

  return entry.timestamps.length > RATE_LIMIT_MAX;
}

// ── Validation ────────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Block common disposable/temporary email domains
const BLOCKED_DOMAINS = [
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwaway.email',
  'yopmail.com', 'sharklasers.com', 'guerrillamailblock.com', 'grr.la',
  'dispostable.com', 'trashmail.com', '10minutemail.com', 'temp-mail.org',
];

function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return BLOCKED_DOMAINS.includes(domain);
}

// Basic XSS sanitization for HTML email content
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// ── API Route ─────────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    // ── IP-based rate limiting ──
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }

    // ── Guard: Brevo not configured ──
    if (!BREVO_API_KEY) {
      console.error('BREVO_API_KEY is not configured');
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    // ── Parse & validate body ──
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { name, email, message, source, _t } = body as {
      name?: string;
      email?: string;
      message?: string;
      source?: string;
      _t?: string;
    };

    // Validate presence
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Validate types
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid field types' }, { status: 400 });
    }

    // Validate lengths
    if (name.length < 2 || name.length > 200) {
      return NextResponse.json({ error: 'Name must be 2-200 characters' }, { status: 400 });
    }
    if (email.length > 320) {
      return NextResponse.json({ error: 'Email too long' }, { status: 400 });
    }
    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json({ error: 'Message must be 10-5000 characters' }, { status: 400 });
    }

    // Validate email format (stricter: requires 2+ char TLD)
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Block disposable email addresses
    if (isDisposableEmail(email)) {
      return NextResponse.json({ error: 'Disposable email addresses are not allowed' }, { status: 400 });
    }

    // Server-side timing check: reject if _t timestamp indicates < 2s form interaction
    if (_t && typeof _t === 'string') {
      const loadTime = parseInt(_t, 10);
      if (!isNaN(loadTime) && Date.now() - loadTime < 2000) {
        // Likely a bot — return fake success
        return NextResponse.json({ success: true });
      }
    }

    // ── Sanitize ──
    const safeName = escapeHtml(name.replace(/[\r\n]/g, ' ').trim());
    const safeMessage = escapeHtml(message.trim());
    const safeSource = typeof source === 'string'
      ? escapeHtml(source.replace(/[\r\n]/g, ' ').trim())
      : 'general';
    const safeEmail = email.trim().toLowerCase();

    // ── Send via Brevo ──
    const brevoPayload = {
      sender: {
        name: 'Goldvale Studios',
        email: 'hello@goldvalestudios.com',
      },
      to: [
        {
          email: 'hello@goldvalestudios.com',
          name: 'Goldvale Studios',
        },
      ],
      replyTo: {
        email: safeEmail,
        name: safeName,
      },
      subject: `Neue Kontaktanfrage von ${safeName} (${safeSource})`,
      htmlContent: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#1a1a1a;font-size:20px;margin-bottom:24px;">Neue Kontaktanfrage über goldvalestudios.com</h2>
          <table style="border-collapse:collapse;width:100%;font-size:15px;">
            <tr>
              <td style="padding:12px 16px;border:1px solid #e5e5e5;font-weight:600;width:120px;background:#f9f9f9;color:#333;">Quelle</td>
              <td style="padding:12px 16px;border:1px solid #e5e5e5;color:#555;">${safeSource}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;border:1px solid #e5e5e5;font-weight:600;background:#f9f9f9;color:#333;">Name</td>
              <td style="padding:12px 16px;border:1px solid #e5e5e5;color:#555;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;border:1px solid #e5e5e5;font-weight:600;background:#f9f9f9;color:#333;">E-Mail</td>
              <td style="padding:12px 16px;border:1px solid #e5e5e5;color:#555;"><a href="mailto:${safeEmail}" style="color:#b08d57;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding:12px 16px;border:1px solid #e5e5e5;font-weight:600;background:#f9f9f9;color:#333;vertical-align:top;">Nachricht</td>
              <td style="padding:12px 16px;border:1px solid #e5e5e5;color:#555;white-space:pre-wrap;line-height:1.6;">${safeMessage}</td>
            </tr>
          </table>
          <p style="font-size:12px;color:#999;margin-top:24px;">IP: ${ip} · Gesendet am ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}</p>
        </div>
      `,
      textContent: `Quelle: ${safeSource}\nName: ${safeName}\nE-Mail: ${safeEmail}\nNachricht: ${safeMessage}\n\nIP: ${ip}`,
    };

    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(brevoPayload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Brevo API Error:', response.status, errorData);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, messageId: data.messageId });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
