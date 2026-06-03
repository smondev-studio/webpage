export interface ContactPayload {
  name: string;
  email: string;
  business?: string;
  message: string;
  country?: string;
  city?: string;
  timezone?: string;
  language?: string;
}

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export async function collectMetadata(): Promise<Pick<ContactPayload, 'country' | 'city' | 'timezone' | 'language'>> {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language;

  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) });
    if (res.ok) {
      const geo = await res.json();
      return {
        country: geo.country_name ?? undefined,
        city: geo.city ?? undefined,
        timezone,
        language,
      };
    }
  } catch {
    // silently ignore — geolocation is best-effort
  }

  return { timezone, language };
}

export async function submitContact(
  payload: ContactPayload,
  supabaseUrl: string,
  supabaseKey: string,
): Promise<SubmitResult> {
  if (!payload.name?.trim()) return { ok: false, error: 'name_required' };
  if (!payload.email?.trim()) return { ok: false, error: 'email_required' };
  if (!isValidEmail(payload.email)) return { ok: false, error: 'email_invalid' };
  if (!payload.message?.trim()) return { ok: false, error: 'message_required' };
  if (!supabaseUrl || !supabaseKey) return { ok: false, error: 'config_missing' };

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/contact_requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return { ok: false, error: `http_${res.status}` };
    return { ok: true };
  } catch {
    return { ok: false, error: 'network_error' };
  }
}
