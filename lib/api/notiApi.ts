export interface RegisterSubscriberResponse {
  message: string;
  subscriberId?: string;
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message = body.message ?? body.error ?? `Request failed with status ${res.status}`;
    throw Object.assign(new Error(message), {
      statusCode: res.status,
    });
  }
  return res.json() as Promise<T>;
}

export async function registerSubscriber(email: string): Promise<RegisterSubscriberResponse> {
  const res = await fetch('/api/subscribers/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim().toLowerCase() }),
  });
  return handleResponse<RegisterSubscriberResponse>(res);
}
