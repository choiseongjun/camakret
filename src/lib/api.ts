/**
 * API Utility
 * Centralized API URL management for all API calls
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Get the full API URL for a given endpoint
 * @param endpoint - API endpoint (e.g., '/api/creators')
 * @returns Full API URL
 */
export function getApiUrl(endpoint: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
}

/**
 * Fetch wrapper that automatically uses the correct API URL
 * @param endpoint - API endpoint
 * @param options - Fetch options
 * @returns Fetch response
 */
export async function apiFetch(endpoint: string, options?: RequestInit): Promise<Response> {
  const url = getApiUrl(endpoint);
  return fetch(url, options);
}

export { API_BASE_URL };
