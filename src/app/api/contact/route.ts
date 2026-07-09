import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Require RESEND_API_KEY — fail loudly if missing rather than initializing with a dummy key
const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

// Simple in-memory rate limiter (per-IP, 5 requests per minute)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// Strict email format validation
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    // Rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    // Guard: Resend not configured
    if (!resend) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    const body = await request.json();
    const { name, email, message } = body;

    // Validate presence
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Validate types
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid field types' }, { status: 400 });
    }

    // Validate lengths (prevent abuse / payload bombs)
    if (name.length > 200 || email.length > 320 || message.length > 5000) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    // Validate email format
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Sanitize: strip potential header injection characters from name
    const safeName = name.replace(/[\r\n]/g, ' ').trim();
    const safeMessage = message.trim();

    const { data, error } = await resend.emails.send({
      from: 'Goldvale Contact Form <onboarding@resend.dev>', // Update with your verified domain
      to: ['hello@goldvale.de'],
      subject: `New contact form submission from ${safeName}`,
      text: `Name: ${safeName}\nEmail: ${email}\nMessage: ${safeMessage}`,
      replyTo: email,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
