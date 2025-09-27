export interface RegistryFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  role: 'volunteer' | 'patient' | 'sponsor'
}

export interface RegistryState {
  isSubmitting: boolean
  showPassword: boolean
  showConfirmPassword: boolean
}

export interface RoleOption {
  value: 'volunteer' | 'patient' | 'sponsor'
  label: string
  description: string
}
