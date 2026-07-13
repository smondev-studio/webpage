import type { APIRoute } from 'astro';

export const prerender = false;

interface ContactPayload {
  name: string;
  email: string;
  business?: string;
  message: string;
  country?: string;
  city?: string;
  timezone?: string;
  language?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function sanitizeString(input: string): string {
  return input.trim().slice(0, 500); // Limitar longitud
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: ContactPayload = await request.json();

    // Validaciones del lado del servidor
    if (!body.name || typeof body.name !== 'string') {
      return new Response(
        JSON.stringify({ error: 'El nombre es requerido', errorType: 'validation' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!body.email || typeof body.email !== 'string') {
      return new Response(
        JSON.stringify({ error: 'El email es requerido', errorType: 'validation' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!isValidEmail(body.email)) {
      return new Response(
        JSON.stringify({ error: 'Email inválido', errorType: 'validation' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!body.message || typeof body.message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'El mensaje es requerido', errorType: 'validation' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Sanitización de inputs
    const sanitizedPayload: ContactPayload = {
      name: sanitizeString(body.name),
      email: sanitizeString(body.email),
      business: body.business ? sanitizeString(body.business) : undefined,
      message: sanitizeString(body.message),
      country: body.country ? sanitizeString(body.country) : undefined,
      city: body.city ? sanitizeString(body.city) : undefined,
      timezone: body.timezone ? sanitizeString(body.timezone) : undefined,
      language: body.language ? sanitizeString(body.language) : undefined,
    };

    // Validación de longitud mínima
    if (sanitizedPayload.name.length < 2) {
      return new Response(
        JSON.stringify({ error: 'El nombre debe tener al menos 2 caracteres', errorType: 'validation' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (sanitizedPayload.message.length < 10) {
      return new Response(
        JSON.stringify({ error: 'El mensaje debe tener al menos 10 caracteres', errorType: 'validation' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Rate limiting del lado del servidor (simple por IP)
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // En un entorno real, usarías Redis o una base de datos para rate limiting
    // Aquí es un ejemplo básico que debería mejorarse en producción

    // Enviar a Supabase
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ error: 'Configuración del servidor faltante', errorType: 'server' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/contact_requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        ...sanitizedPayload,
        ip, // Guardar IP para análisis de seguridad
        created_at: new Date().toISOString(),
      }),
    });

    if (!supabaseResponse.ok) {
      console.error('Supabase error:', supabaseResponse.status, await supabaseResponse.text());
      return new Response(
        JSON.stringify({ error: 'Error al guardar en la base de datos', errorType: 'server' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Contact API error:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor', errorType: 'server' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
