export interface Store {
  id: string;
  name: string;
  url: string;
  image: string;
  description?: string;
}

const API_URL = import.meta.env.PUBLIC_API_URL;

export async function getStores(): Promise<Store[]> {
  if (!API_URL) {
    console.warn('PUBLIC_API_URL not configured');
    return [];
  }

  try {
    const response = await fetch(`${API_URL}/stores`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch stores:', error);
    return [];
  }
}

export async function getStoreById(id: string): Promise<Store | null> {
  if (!API_URL) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/stores/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch store:', error);
    return null;
  }
}
