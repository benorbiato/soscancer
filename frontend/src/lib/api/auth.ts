import { LoginRequest, TokenResponse, RefreshTokenRequest } from '@/types'
import { apiFetch } from './client'

export async function loginUser(payload: LoginRequest): Promise<TokenResponse> {
  return apiFetch('/api/v1/auth/login', {
    method: 'POST',
    body: payload,
  })
}

export async function registerUser(payload: any): Promise<TokenResponse> {
  return apiFetch('/api/v1/auth/register', {
    method: 'POST',
    body: payload,
  })
}

export async function refreshToken(payload: RefreshTokenRequest): Promise<TokenResponse> {
  return apiFetch('/api/v1/auth/refresh', {
    method: 'POST',
    body: payload,
  })
}

export async function getProfile(): Promise<any> {
  return apiFetch('/api/v1/auth/profile', {
    method: 'GET',
  })
}

export async function updateProfile(payload: any): Promise<any> {
  return apiFetch('/api/v1/auth/profile', {
    method: 'PATCH',
    body: payload,
  })
}

export async function logoutUser(): Promise<void> {
  return apiFetch('/api/v1/auth/logout', {
    method: 'POST',
  })
}
