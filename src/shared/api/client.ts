import { ApiError } from './error'

const DEFAULT_API_BASE_URL =
  'https://northstar-stays-api-509218226750.us-central1.run.app/api'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, init)

  if (!response.ok) {
    throw new ApiError(response.status, `Request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export async function apiPost<T>(
  path: string,
  body: unknown,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new ApiError(response.status, `Request failed: ${response.status}`)
  }

  return response.json()
}
