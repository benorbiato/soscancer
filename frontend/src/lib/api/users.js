import { apiFetch } from './client'

export function createUser(payload) {
  return apiFetch('/api/v1/users/', { method: 'POST', body: payload })
}

export function listUsers() {
  return apiFetch('/api/v1/users/')
}

export function getUser(userId) {
  return apiFetch(`/api/v1/users/${userId}`)
}

export function updateUser(userId, payload) {
  return apiFetch(`/api/v1/users/${userId}`, { method: 'PUT', body: payload })
}

export function deleteUser(userId) {
  return apiFetch(`/api/v1/users/${userId}`, { method: 'DELETE' })
}

export function loginUser(payload) {
  return apiFetch('/api/v1/auth/login', { method: 'POST', body: payload })
}
