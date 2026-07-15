export interface Store {
  id: string;
  name: string;
  url: string;
  image: string;
  description?: string;
}

const API_URL = import.meta.env.PUBLIC_API_URL;

interface BackendStore {
  id: string;
  name: string;
  url: string;
  logo: string | null;
  heroImage: string | null;
  description: string | null;
}

function mapStore(s: BackendStore): Store {
  return {
    id: s.id,
    name: s.name,
    url: s.url,
    image: s.logo || s.heroImage || '/images/hero-light.png',
    description: s.description || undefined,
  };
}

export async function getStores(): Promise<Store[]> {
  if (!API_URL) {
    console.warn('PUBLIC_API_URL not configured');
    return [];
  }

  try {
    const response = await fetch(`${API_URL}/stores/public`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: BackendStore[] = await response.json();
    return data.map(mapStore);
  } catch (error) {
    console.error('Failed to fetch stores:', error);
    return [];
  }
}
