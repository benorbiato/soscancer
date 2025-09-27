export interface SettingsFormData {
  name: string
  email: string
  phone: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface ProfileUpdateData {
  name: string
  email: string
  phone: string
  profileImage?: string
}

export interface PasswordUpdateData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface SettingsState {
  isLoading: boolean
  showCurrentPassword: boolean
  showNewPassword: boolean
  showConfirmPassword: boolean
  profileImage: string | null
}
