export const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:5173'

// Request interceptor
function getAuthHeaders() {
  const token = localStorage.getItem('access_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// Response interceptor
async function handleResponse(response: Response) {
  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')

  let data
  try {
    data = isJson ? await response.json() : await response.text()
  } catch (error) {
    data = null
  }

  if (!response.ok) {
    let errorMessage = 'Request failed'
    if (isJson && data) {
      if (data.detail) {
        if (Array.isArray(data.detail)) {
          errorMessage = data.detail.map((err: any) => err.msg || err.message || err).join(', ')
        } else {
          errorMessage = data.detail
        }
      } else if (data.message) {
        errorMessage = data.message
      }
    }
    const error = new Error(errorMessage)
    ;(error as any).status = response.status
    ;(error as any).data = data
    throw error
  }

  return data
}

// Retry logic for failed requests
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3) {
  let lastError: Error

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options)

      // If unauthorized and we have a refresh token, try to refresh
      if (response.status === 401 && attempt < maxRetries) {
        const refreshToken = localStorage.getItem('refresh_token')
        if (refreshToken) {
          try {
            const refreshResponse = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refresh_token: refreshToken }),
            })

            if (refreshResponse.ok) {
              const refreshData = await refreshResponse.json()
              localStorage.setItem('access_token', refreshData.access_token)

              // Retry original request with new token
              const newOptions = {
                ...options,
                headers: {
                  ...options.headers,
                  Authorization: `Bearer ${refreshData.access_token}`,
                },
              }
              const retryResponse = await fetch(url, newOptions)
              return await handleResponse(retryResponse)
            }
          } catch (refreshError) {
            // Refresh failed, clear tokens and redirect to login
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('user')
            window.location.href = '/login'
            throw refreshError
          }
        }
      }

      return await handleResponse(response)
    } catch (error) {
      lastError = error as Error

      // Don't retry on client errors (4xx) except 401
      if (
        (error as any).status >= 400 &&
        (error as any).status < 500 &&
        (error as any).status !== 401
      ) {
        throw error
      }

      // Wait before retry (exponential backoff)
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000))
      }
    }
  }

  throw lastError!
}

export async function apiFetch<T = any>(path: string, options: RequestInit & { body?: T } = {}) {
  const url = `${API_BASE_URL}${path}`
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
  }

  const requestOptions: RequestInit = {
    ...options,
    method: options.method || 'GET',
    headers: { ...defaultHeaders, ...(options.headers || {}) } as HeadersInit,
    body: options.body ? JSON.stringify(options.body) : undefined,
  }

  return fetchWithRetry(url, requestOptions)
}
