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

function mapStore(s: BackendStore): Store {
  return {
    id: s.id,
    name: s.name,
    url: s.url,
    image: s.logo || s.heroImage || '/images/hero-light.png',
    description: s.description || undefined,
    category: s.category || s.rubro || s.industry || undefined,
  };
}

export async function getStores(): Promise<Store[]> {
  if (!API_URL) {
    console.warn('PUBLIC_API_URL not configured, skipping store fetch');
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
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn(`Stores API request timed out after ${FETCH_TIMEOUT_MS}ms`);
    } else {
      console.warn('Failed to fetch stores, showing static fallback:', (error as Error).message || error);
    }
    return [];
  }
}
