export interface ApiError {
  message: string;
  statusCode: number;
}

export interface RegisterSubscriberResponse {
  message: string;
  subscriberId?: string;
}

interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as ApiErrorResponse);
    const message = body.message ?? body.error ?? `Request failed with status ${res.status}`;
    const statusCode = body.statusCode ?? res.status;
    throw Object.assign(new Error(message), { statusCode });
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
