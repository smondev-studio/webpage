import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitContact, isValidEmail, collectMetadata } from "../contact";

const API = "https://api.test";
const validPayload = {
  name: "Juan",
  email: "juan@example.com",
  message: "Quiero una tienda",
};

describe("isValidEmail", () => {
  it.each([
    ["juan@example.com", true],
    ["user+tag@sub.domain.com", true],
    ["  spaced@email.com  ", true], // trim
    ["sin-arroba", false],
    ["@sindominio.com", false],
    ["sin@dominio", false],
    ["", false],
  ])('"%s" → %s', (email, expected) => {
    expect(isValidEmail(email)).toBe(expected);
  });
});

describe("collectMetadata", () => {
  it("devuelve timezone e idioma del navegador, sin llamar a ningún servicio externo", () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const meta = collectMetadata();
    expect(meta.timezone).toBeTruthy();
    expect(meta.language).toBeTruthy();
    expect(Object.keys(meta).sort()).toEqual(["language", "timezone"]);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});

describe("submitContact", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    const store = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
    });
  });

  // --- Validaciones (no llegan a la red) ---
  it.each([
    ["name vacío", { ...validPayload, name: "" }, "name_required"],
    ["name solo espacios", { ...validPayload, name: "   " }, "name_required"],
    ["email vacío", { ...validPayload, email: "" }, "email_required"],
    [
      "email inválido",
      { ...validPayload, email: "no-es-email" },
      "email_invalid",
    ],
    ["message vacío", { ...validPayload, message: "" }, "message_required"],
  ])("falla con %s", async (_label, payload, error) => {
    const mockFetch = vi.fn();
    vi.stubGlobal("fetch", mockFetch);
    expect(await submitContact(payload, API)).toEqual({ ok: false, error });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("falla si falta la URL de la API", async () => {
    expect(await submitContact(validPayload, "")).toEqual({
      ok: false,
      error: "config_missing",
    });
  });

  // --- Llamada HTTP ---
  it("envía POST JSON a {api}/api/contact", async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true, status: 201 });
    vi.stubGlobal("fetch", mockFetch);
    await submitContact(validPayload, API);
    const [url, opts] = mockFetch.mock.calls[0];
    expect(url).toBe(`${API}/api/contact`);
    expect(opts.method).toBe("POST");
    expect(opts.headers).toMatchObject({ "Content-Type": "application/json" });
  });

  it("manda los campos tal cual (el backend rechaza campos desconocidos), incluido el honeypot", async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true, status: 201 });
    vi.stubGlobal("fetch", mockFetch);
    const payload = {
      ...validPayload,
      business: "Ropa",
      website: "",
      timezone: "America/Argentina/Cordoba",
      language: "es-AR",
    };
    await submitContact(payload, API);
    expect(JSON.parse(mockFetch.mock.calls[0][1].body)).toEqual(payload);
  });

  it("business es opcional", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, status: 201 }),
    );
    expect(
      (
        await submitContact(
          { name: "Juan", email: "j@j.com", message: "Hola" },
          API,
        )
      ).ok,
    ).toBe(true);
  });

  // --- Respuestas del servidor ---
  it("ok: true con HTTP 201", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, status: 201 }),
    );
    expect(await submitContact(validPayload, API)).toEqual({ ok: true });
  });

  it.each([
    [400, "invalid"],
    [429, "rate_limited"],
    [500, "server_error"],
    [404, "server_error"],
  ])("HTTP %i → %s", async (status, error) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status }));
    expect(await submitContact(validPayload, API)).toEqual({
      ok: false,
      error,
    });
  });

  it("network_error si fetch lanza excepción", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network failure")),
    );
    expect(await submitContact(validPayload, API)).toEqual({
      ok: false,
      error: "network_error",
    });
  });

  // --- Límite del lado del cliente ---
  it("después de 3 envíos exitosos en una hora corta el cuarto sin llamar a la red", async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true, status: 201 });
    vi.stubGlobal("fetch", mockFetch);
    for (let i = 0; i < 3; i++)
      expect((await submitContact(validPayload, API)).ok).toBe(true);
    const r = await submitContact(validPayload, API);
    expect(r).toMatchObject({ ok: false, error: "rate_limited" });
    expect(mockFetch).toHaveBeenCalledTimes(3);
  });
});
