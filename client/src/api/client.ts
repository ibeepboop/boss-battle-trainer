const API_BASE_URL = 'http://localhost:3000/api';

export async function apiGet<T>(path: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`);
   return response.json() as Promise<T>;
}
