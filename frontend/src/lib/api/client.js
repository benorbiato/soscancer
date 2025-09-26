export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export async function apiFetch(path, options = {}) {
  const url = `${API_BASE_URL}${path}`
  const defaultHeaders = { 'Content-Type': 'application/json' }
  const resp = await fetch(url, {
    method: options.method || 'GET',
    headers: { ...defaultHeaders, ...(options.headers || {}) },
    body: options.body ? JSON.stringify(options.body) : undefined,
  })
  const contentType = resp.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const data = isJson ? await resp.json().catch(() => undefined) : await resp.text()
  if (!resp.ok) {
    const message = isJson ? JSON.stringify(data) : String(data || resp.statusText)
    throw new Error(message || `Request failed: ${resp.status}`)
  }
  return data
}
