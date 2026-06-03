import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitContact, isValidEmail, collectMetadata } from '../contact';

const MOCK_URL = 'https://test.supabase.co';
const MOCK_KEY = 'test-anon-key';
const validPayload = { name: 'Juan', email: 'juan@example.com', message: 'Quiero una tienda' };

describe('isValidEmail', () => {
  it.each([
    ['juan@example.com', true],
    ['user+tag@sub.domain.com', true],
    ['  spaced@email.com  ', true], // trim
    ['sin-arroba', false],
    ['@sindominio.com', false],
    ['sin@dominio', false],
    ['', false],
  ])('"%s" → %s', (email, expected) => {
    expect(isValidEmail(email)).toBe(expected);
  });
});

describe('collectMetadata', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('retorna timezone y language siempre', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    const meta = await collectMetadata();
    expect(meta.timezone).toBeTruthy();
    expect(meta.language).toBeTruthy();
  });

  it('retorna country y city cuando ipapi responde OK', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ country_name: 'Argentina', city: 'Buenos Aires' }),
    }));
    const meta = await collectMetadata();
    expect(meta.country).toBe('Argentina');
    expect(meta.city).toBe('Buenos Aires');
  });

  it('no falla si ipapi devuelve error HTTP', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    const meta = await collectMetadata();
    expect(meta.country).toBeUndefined();
    expect(meta.city).toBeUndefined();
  });

  it('no falla si ipapi lanza excepción (timeout, offline)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('timeout')));
    await expect(collectMetadata()).resolves.not.toThrow();
  });
});

describe('submitContact', () => {
  beforeEach(() => vi.restoreAllMocks());

  // --- Validaciones ---
  it('falla si name está vacío', async () => {
    const r = await submitContact({ ...validPayload, name: '' }, MOCK_URL, MOCK_KEY);
    expect(r).toEqual({ ok: false, error: 'name_required' });
  });

  it('falla si name es solo espacios', async () => {
    const r = await submitContact({ ...validPayload, name: '   ' }, MOCK_URL, MOCK_KEY);
    expect(r).toEqual({ ok: false, error: 'name_required' });
  });

  it('falla si email está vacío', async () => {
    const r = await submitContact({ ...validPayload, email: '' }, MOCK_URL, MOCK_KEY);
    expect(r).toEqual({ ok: false, error: 'email_required' });
  });

  it('falla si email es inválido', async () => {
    const r = await submitContact({ ...validPayload, email: 'no-es-email' }, MOCK_URL, MOCK_KEY);
    expect(r).toEqual({ ok: false, error: 'email_invalid' });
  });

  it('falla si message está vacío', async () => {
    const r = await submitContact({ ...validPayload, message: '' }, MOCK_URL, MOCK_KEY);
    expect(r).toEqual({ ok: false, error: 'message_required' });
  });

  it('falla si faltan credenciales de Supabase', async () => {
    const r = await submitContact(validPayload, '', '');
    expect(r).toEqual({ ok: false, error: 'config_missing' });
  });

  // --- Llamada HTTP ---
  it('envía POST a la URL correcta', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', mockFetch);
    await submitContact(validPayload, MOCK_URL, MOCK_KEY);
    expect(mockFetch).toHaveBeenCalledWith(`${MOCK_URL}/rest/v1/contact_requests`, expect.objectContaining({ method: 'POST' }));
  });

  it('incluye apikey, Authorization y Prefer en los headers', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', mockFetch);
    await submitContact(validPayload, MOCK_URL, MOCK_KEY);
    const [, opts] = mockFetch.mock.calls[0];
    expect(opts.headers).toMatchObject({
      apikey: MOCK_KEY,
      Authorization: `Bearer ${MOCK_KEY}`,
      Prefer: 'return=minimal',
    });
  });

  it('envía todos los campos incluyendo metadata geo', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', mockFetch);
    const payload = { ...validPayload, country: 'Argentina', city: 'Rosario', timezone: 'America/Argentina/Cordoba', language: 'es-AR' };
    await submitContact(payload, MOCK_URL, MOCK_KEY);
    const [, opts] = mockFetch.mock.calls[0];
    expect(JSON.parse(opts.body)).toEqual(payload);
  });

  it('business es opcional', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
    const r = await submitContact({ name: 'Juan', email: 'j@j.com', message: 'Hola' }, MOCK_URL, MOCK_KEY);
    expect(r.ok).toBe(true);
  });

  // --- Respuestas servidor ---
  it('retorna ok: true con HTTP 201', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
    expect(await submitContact(validPayload, MOCK_URL, MOCK_KEY)).toEqual({ ok: true });
  });

  it('retorna error http_400 cuando Supabase responde 400', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 400 }));
    expect(await submitContact(validPayload, MOCK_URL, MOCK_KEY)).toEqual({ ok: false, error: 'http_400' });
  });

  it('retorna error http_403 cuando RLS rechaza', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 403 }));
    expect(await submitContact(validPayload, MOCK_URL, MOCK_KEY)).toEqual({ ok: false, error: 'http_403' });
  });

  it('retorna network_error si fetch lanza excepción', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network failure')));
    expect(await submitContact(validPayload, MOCK_URL, MOCK_KEY)).toEqual({ ok: false, error: 'network_error' });
  });
});
