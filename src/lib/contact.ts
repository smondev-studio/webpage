export interface ContactPayload {
  name: string;
  email: string;
  business?: string;
  message: string;
  /** Honeypot: el formulario lo deja vacío; un bot lo llena y el backend descarta el mensaje. */
  website?: string;
  timezone?: string;
  language?: string;
}

export type ContactErrorCode =
  | "name_required"
  | "email_required"
  | "email_invalid"
  | "message_required"
  | "config_missing"
  | "rate_limited"
  | "invalid"
  | "server_error"
  | "network_error";

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: ContactErrorCode; retryInMinutes?: number };

const RATE_LIMIT_KEY = "contact_rate_limit";
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hora en ms
const MAX_SUBMISSIONS = 3;

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/** Límite del lado del cliente (comodidad); el que cuenta es el del backend. */
export function checkRateLimit(): { allowed: boolean; remainingTime?: number } {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    if (!stored) return { allowed: true };

    const now = Date.now();
    const recent: number[] = JSON.parse(stored).submissions.filter(
      (timestamp: number) => now - timestamp < RATE_LIMIT_WINDOW,
    );

    if (recent.length >= MAX_SUBMISSIONS) {
      const remaining = RATE_LIMIT_WINDOW - (now - Math.min(...recent));
      return {
        allowed: false,
        remainingTime: Math.ceil(remaining / 1000 / 60),
      };
    }

    localStorage.setItem(
      RATE_LIMIT_KEY,
      JSON.stringify({ submissions: recent }),
    );
    return { allowed: true };
  } catch {
    return { allowed: true }; // sin localStorage, se permite
  }
}

export function recordSubmission(): void {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const submissions = stored ? JSON.parse(stored).submissions : [];
    submissions.push(Date.now());
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ submissions }));
  } catch {
    // sin localStorage: no se registra
  }
}

/** Zona horaria e idioma del navegador. No consulta ningún servicio externo. */
export function collectMetadata(): Pick<
  ContactPayload,
  "timezone" | "language"
> {
  return {
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
  };
}

/** Envía el contacto a `POST {apiUrl}/api/contact` (smondev-backend). */
export async function submitContact(
  payload: ContactPayload,
  apiUrl: string,
): Promise<SubmitResult> {
  if (!payload.name?.trim()) return { ok: false, error: "name_required" };
  if (!payload.email?.trim()) return { ok: false, error: "email_required" };
  if (!isValidEmail(payload.email))
    return { ok: false, error: "email_invalid" };
  if (!payload.message?.trim()) return { ok: false, error: "message_required" };
  if (!apiUrl) return { ok: false, error: "config_missing" };

  const limit = checkRateLimit();
  if (!limit.allowed)
    return {
      ok: false,
      error: "rate_limited",
      retryInMinutes: limit.remainingTime,
    };

  try {
    const res = await fetch(`${apiUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      recordSubmission();
      return { ok: true };
    }
    if (res.status === 429) return { ok: false, error: "rate_limited" };
    if (res.status === 400) return { ok: false, error: "invalid" };
    return { ok: false, error: "server_error" };
  } catch {
    return { ok: false, error: "network_error" };
  }
}
