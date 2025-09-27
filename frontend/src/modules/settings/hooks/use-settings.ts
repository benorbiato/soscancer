import { useState, useCallback } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useToast } from '@/hooks/use-toast'
import { SettingsFormData, ProfileUpdateData, PasswordUpdateData, SettingsState } from '../types'
import { SETTINGS_CONSTANTS } from '../constants'

export function useSettings() {
  const { user, updateUser } = useAuth()
  const toast = useToast()

  const [state, setState] = useState<SettingsState>({
    isLoading: false,
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
    profileImage: null,
  })

  const [formData, setFormData] = useState<SettingsFormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleInputChange = useCallback((field: keyof SettingsFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }, [])

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      // Validate file type
      if (!SETTINGS_CONSTANTS.PROFILE_IMAGE.ACCEPTED_TYPES.includes(file.type)) {
        toast.error(
          'Tipo de arquivo não suportado',
          SETTINGS_CONSTANTS.MESSAGES.ERROR.INVALID_IMAGE_TYPE,
        )
        return
      }

      // Validate file size
      if (file.size > SETTINGS_CONSTANTS.PROFILE_IMAGE.MAX_SIZE) {
        toast.error('Imagem muito grande', SETTINGS_CONSTANTS.MESSAGES.ERROR.IMAGE_TOO_LARGE)
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setState((prev) => ({ ...prev, profileImage: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    },
    [toast],
  )

  const handleUpdateProfile = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      const updateData: ProfileUpdateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        profileImage: state.profileImage || undefined,
      }

      await updateUser(updateData)
      toast.success(SETTINGS_CONSTANTS.MESSAGES.SUCCESS.PROFILE_UPDATED)
    } catch (error) {
      toast.error(
        SETTINGS_CONSTANTS.MESSAGES.ERROR.PROFILE_UPDATE_FAILED,
        'Tente novamente mais tarde',
      )
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [formData, state.profileImage, updateUser, toast])

  const handleUpdatePassword = useCallback(async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error(SETTINGS_CONSTANTS.MESSAGES.ERROR.PASSWORDS_DONT_MATCH)
      return
    }

    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      // Aqui você implementaria a chamada para a API de mudança de senha
      toast.success(SETTINGS_CONSTANTS.MESSAGES.SUCCESS.PASSWORD_UPDATED)

      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }))
    } catch (error) {
      toast.error(
        SETTINGS_CONSTANTS.MESSAGES.ERROR.PASSWORD_UPDATE_FAILED,
        'Verifique a senha atual',
      )
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [formData, toast])

  const togglePasswordVisibility = useCallback(
    (field: 'currentPassword' | 'newPassword' | 'confirmPassword') => {
      setState((prev) => ({
        ...prev,
        [`show${field.charAt(0).toUpperCase() + field.slice(1)}`]:
          !prev[`show${field.charAt(0).toUpperCase() + field.slice(1)}` as keyof SettingsState],
      }))
    },
    [],
  )

  return {
    state,
    formData,
    handleInputChange,
    handleImageUpload,
    handleUpdateProfile,
    handleUpdatePassword,
    togglePasswordVisibility,
  }
}
