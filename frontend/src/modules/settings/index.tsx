import { AuthenticatedHeader } from '@/components/layouts/authenticated-header'
import { ProfileForm, PasswordForm, DeleteAccountForm } from './components'
import { useSettings } from './hooks/use-settings'

export default function Settings() {
  const {
    state,
    formData,
    handleInputChange,
    handleImageUpload,
    handleUpdateProfile,
    handleUpdatePassword,
    togglePasswordVisibility,
  } = useSettings()

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Configurações da Conta</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie suas informações pessoais e preferências
          </p>
        </div>

        <div className="grid gap-6">
          <ProfileForm
            formData={formData}
            profileImage={state.profileImage}
            isLoading={state.isLoading}
            onInputChange={handleInputChange}
            onImageUpload={handleImageUpload}
            onUpdateProfile={handleUpdateProfile}
          />

          <PasswordForm
            formData={formData}
            showCurrentPassword={state.showCurrentPassword}
            showNewPassword={state.showNewPassword}
            showConfirmPassword={state.showConfirmPassword}
            isLoading={state.isLoading}
            onInputChange={handleInputChange}
            onTogglePasswordVisibility={togglePasswordVisibility}
            onUpdatePassword={handleUpdatePassword}
          />

          <DeleteAccountForm isLoading={state.isLoading} />
        </div>
      </div>
    </div>
  )
}
