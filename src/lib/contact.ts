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
  errorType?: 'rate_limit' | 'validation' | 'network' | 'server';
}

const RATE_LIMIT_KEY = 'contact_rate_limit';
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hora en ms
const MAX_SUBMISSIONS = 3;

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function checkRateLimit(): { allowed: boolean; remainingTime?: number } {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    if (!stored) {
      return { allowed: true };
    }

    const data = JSON.parse(stored);
    const now = Date.now();

    // Limpiar entradas viejas
    const recentSubmissions = data.submissions.filter(
      (timestamp: number) => now - timestamp < RATE_LIMIT_WINDOW
    );

    if (recentSubmissions.length >= MAX_SUBMISSIONS) {
      const oldestSubmission = Math.min(...recentSubmissions);
      const remainingTime = RATE_LIMIT_WINDOW - (now - oldestSubmission);
      return { 
        allowed: false, 
        remainingTime: Math.ceil(remainingTime / 1000 / 60) // minutos restantes
      };
    }

    // Actualizar localStorage con solo las entradas recientes
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ submissions: recentSubmissions }));
    return { allowed: true };
  } catch {
    // Si falla localStorage, permitir el envío
    return { allowed: true };
  }
}

export function recordSubmission(): void {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const submissions = stored ? JSON.parse(stored).submissions : [];
    submissions.push(Date.now());
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ submissions }));
  } catch {
    // Silenciosamente fallar si localStorage no está disponible
  }
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
  // Rate limiting
  const rateLimit = checkRateLimit();
  if (!rateLimit.allowed) {
    return { 
      ok: false, 
      error: `Demasiados intentos. Esperá ${rateLimit.remainingTime} minutos antes de intentar de nuevo.`,
      errorType: 'rate_limit'
    };
  }

  // Validaciones
  if (!payload.name?.trim()) return { ok: false, error: 'El nombre es requerido', errorType: 'validation' };
  if (!payload.email?.trim()) return { ok: false, error: 'El email es requerido', errorType: 'validation' };
  if (!isValidEmail(payload.email)) return { ok: false, error: 'Email inválido', errorType: 'validation' };
  if (!payload.message?.trim()) return { ok: false, error: 'El mensaje es requerido', errorType: 'validation' };
  if (!supabaseUrl || !supabaseKey) return { ok: false, error: 'Configuración faltante', errorType: 'server' };

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

    if (!res.ok) {
      if (res.status === 429) {
        return { ok: false, error: 'Demasiadas solicitudes. Intentá más tarde.', errorType: 'rate_limit' };
      }
      return { ok: false, error: `Error del servidor (${res.status})`, errorType: 'server' };
    }

    // Registrar el envío exitoso
    recordSubmission();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: 'Error de conexión. Verificá tu internet.', errorType: 'network' };
  }
}
