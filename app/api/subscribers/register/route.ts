import { NextResponse } from 'next/server';

const NOTI_API_BASE = process.env.NOTI_API_BASE;

if (!NOTI_API_BASE) {
  throw new Error('Missing NOTI_API_BASE environment variable');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.email || typeof body.email !== 'string') {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const res = await fetch(`${NOTI_API_BASE}/subscribers/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: body.email.trim().toLowerCase() }),
    });

    const data = await res.json().catch(() => ({}));

    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
