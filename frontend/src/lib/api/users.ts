import { User, UserCreate, UserUpdate } from '@/types'
import { apiFetch } from './client'

export async function createUser(payload: UserCreate): Promise<User> {
  return apiFetch('/api/v1/users/', { 
    method: 'POST', 
    body: payload 
  })
}

export async function listUsers(): Promise<User[]> {
  return apiFetch('/api/v1/users/')
}

export async function getUser(userId: string): Promise<User> {
  return apiFetch(`/api/v1/users/${userId}`)
}

export async function updateUser(userId: string, payload: UserUpdate): Promise<User> {
  return apiFetch(`/api/v1/users/${userId}`, { 
    method: 'PUT', 
    body: payload 
  })
}

export async function deleteUser(userId: string): Promise<void> {
  return apiFetch(`/api/v1/users/${userId}`, { 
    method: 'DELETE' 
  })
}

export async function getCurrentUser(): Promise<User> {
  return apiFetch('/api/v1/users/me')
}