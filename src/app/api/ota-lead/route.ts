import { NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

// Rate limiter
const rateLimitMap = new Map<string, { timestamps: number[] }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry) {
    rateLimitMap.set(ip, { timestamps: [now] });
    return false;
  }
  entry.timestamps = entry.timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  entry.timestamps.push(now);
  return entry.timestamps.length > RATE_LIMIT_MAX;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { name, email, websiteUrl, phone, consentAnalysis, consentNewsletter, calcData, _hp, _t } = body;

    // Honeypot check
    if (_hp) {
      return NextResponse.json({ success: true }); // Fake success for bots
    }

    // Time trap (minimum 3 seconds)
    if (_t && typeof _t === 'number') {
      if (Date.now() - _t < 3000) {
        return NextResponse.json({ success: true }); // Fake success for bots
      }
    }

    if (!email || !websiteUrl || !consentAnalysis) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const safeName = name ? escapeHtml(String(name).trim()) : 'Nicht angegeben';
    const safeEmail = escapeHtml(String(email).trim().toLowerCase());
    const safeWebsite = escapeHtml(String(websiteUrl).trim());
    const safePhone = phone ? escapeHtml(String(phone).trim()) : 'Nicht angegeben';

    // Format calculator details
    const calcSummary = calcData ? `
      <table style="border-collapse:collapse;width:100%;font-size:14px;margin-top:16px;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Betriebsart:</td><td style="padding:8px;border:1px solid #ddd;">${calcData.propertyType || '-'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Einheiten:</td><td style="padding:8px;border:1px solid #ddd;">${calcData.units || '-'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Betriebstage:</td><td style="padding:8px;border:1px solid #ddd;">${calcData.openDays || '-'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">ADR (€):</td><td style="padding:8px;border:1px solid #ddd;">${calcData.adr || '-'} €</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">OTA-Anteil:</td><td style="padding:8px;border:1px solid #ddd;">${Math.round((calcData.otaShare || 0) * 100)}%</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">OTA-Provision:</td><td style="padding:8px;border:1px solid #ddd;">${Math.round((calcData.otaCommission || 0) * 100)}%</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Jahresprovision:</td><td style="padding:8px;border:1px solid #ddd;color:#FF3E7F;font-weight:bold;">${Math.round(calcData.annualCommission || 0)} €</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:600;">Nettoersparnis/Jahr:</td><td style="padding:8px;border:1px solid #ddd;color:#10B981;font-weight:bold;">${Math.round(calcData.netSaving || 0)} €</td></tr>
      </table>
    ` : 'Keine Daten';

    // Send email via Brevo if key exists
    if (BREVO_API_KEY) {
      const brevoPayload = {
        sender: { name: 'Goldvale OTA Rechner', email: 'hello@goldvalestudios.com' },
        to: [{ email: 'hello@goldvalestudios.com', name: 'Goldvale Studios' }],
        replyTo: { email: safeEmail, name: safeName },
        subject: `Neue OTA-Rechner Lead-Anfrage von ${safeName} (${safeWebsite})`,
        htmlContent: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#333;">
            <h2 style="color:#FF3E7F;">Neue OTA-Provisionsrechner Lead-Anfrage</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>E-Mail:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            <p><strong>Website:</strong> <a href="${safeWebsite}">${safeWebsite}</a></p>
            <p><strong>Telefon:</strong> ${safePhone}</p>
            <p><strong>Newsletter zugestimmt:</strong> ${consentNewsletter ? 'Ja' : 'Nein'}</p>
            <hr style="border:0;border-top:1px solid #eee;margin:20px 0;" />
            <h3>Berechnete Werte:</h3>
            ${calcSummary}
            <p style="font-size:12px;color:#888;margin-top:24px;">IP: ${ip} · Datum: ${new Date().toISOString()}</p>
          </div>
        `,
      };

      await fetch(BREVO_API_URL, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': BREVO_API_KEY,
        },
        body: JSON.stringify(brevoPayload),
      }).catch((err) => console.error('Brevo OTA Lead email error:', err));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('OTA Lead API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
