export interface Store {
  id: string;
  name: string;
  url: string;
  image: string;
  description?: string;
  category?: string;
}

const API_URL = import.meta.env.PUBLIC_API_URL;
const FETCH_TIMEOUT_MS = 8000;

interface BackendStore {
  id: string;
  name: string;
  url: string;
  logo: string | null;
  heroImage: string | null;
  description: string | null;
  category?: string | null;
  rubro?: string | null;
  industry?: string | null;
}

/**
 * Las imágenes originales (a veces base64 de 100-500 KB) se guardan acá y NO se
 * incrustan en el HTML: src/pages/stores/[id].webp.ts las optimiza y las sirve
 * como archivo. Antes el 92 % del HTML de la portada era base64 (~860 KB).
 */
const rawImages = new Map<string, string>();

export function getRawStoreImage(id: string): string | undefined {
  return rawImages.get(id);
}

export function mapStore(s: BackendStore): Store {
  const raw = s.logo || s.heroImage;
  if (raw) rawImages.set(s.id, raw);
  return {
    id: s.id,
    name: s.name,
    url: s.url,
    image: raw ? `/stores/${s.id}.webp` : "/images/hero-light.webp",
    description: s.description || undefined,
    category: s.category || s.rubro || s.industry || undefined,
  };
}

let storesPromise: Promise<Store[]> | undefined;

export function getStores(): Promise<Store[]> {
  storesPromise ??= fetchStores();
  return storesPromise;
}

async function fetchStores(): Promise<Store[]> {
  if (!API_URL) {
    console.warn("PUBLIC_API_URL not configured, skipping store fetch");
    return [];
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    const response = await fetch(`${API_URL}/api/stores/public`, {
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: BackendStore[] = await response.json();
    return data.map(mapStore);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.warn(`Stores API request timed out after ${FETCH_TIMEOUT_MS}ms`);
    } else {
      console.warn(
        "Failed to fetch stores, showing static fallback:",
        (error as Error).message || error,
      );
    }
    return [];
  }
}
