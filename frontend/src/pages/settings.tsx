import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { AuthenticatedHeader } from '@/components/layouts/authenticated-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Eye, EyeOff, Camera, User, Mail, Phone, Lock } from 'lucide-react'

export default function Settings() {
  const { user, updateUser } = useAuth()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Estados do formulário
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [profileImage, setProfileImage] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdateProfile = async () => {
    setIsLoading(true)
    try {
      // Aqui você implementaria a chamada para a API
      await updateUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        profileImage: profileImage || undefined,
      })
      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar perfil', 'Tente novamente mais tarde')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdatePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('As senhas não coincidem')
      return
    }

    setIsLoading(true)
    try {
      // Aqui você implementaria a chamada para a API de mudança de senha
      toast.success('Senha atualizada com sucesso!')
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }))
    } catch (error) {
      toast.error('Erro ao atualizar senha', 'Verifique a senha atual')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Configurações da Conta</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie suas informações pessoais e preferências
          </p>
        </div>

        <div className="grid gap-6">
          {/* Informações do Perfil */}
          <Card className="w-full">
            <CardHeader className="space-y-1.5">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações do Perfil
              </CardTitle>
              <CardDescription>
                Atualize suas informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Foto de Perfil */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white text-2xl font-bold">
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Foto de perfil" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      user?.name?.charAt(0) || 'U'
                    )}
                  </div>
                  <label className="absolute -bottom-2 -right-2 bg-brand-500 hover:bg-brand-600 text-white rounded-full p-2 cursor-pointer transition-colors">
                    <Camera className="h-4 w-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <p className="font-medium">Foto de Perfil</p>
                  <p className="text-sm text-muted-foreground">
                    Clique no ícone da câmera para alterar
                  </p>
                </div>
              </div>

              {/* Campos do Formulário */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Nome Completo</Label>
                  <Input
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Telefone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('phone', e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <Button 
                onClick={handleUpdateProfile}
                disabled={isLoading}
                variant="default"
                size="default"
                className="bg-brand-500 hover:bg-brand-600 text-white"
              >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </CardContent>
          </Card>

          {/* Alteração de Senha */}
          <Card className="w-full">
            <CardHeader className="space-y-1.5">
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Alterar Senha
              </CardTitle>
              <CardDescription>
                Para sua segurança, confirme sua senha atual
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-sm font-medium">Senha Atual</Label>
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('currentPassword', e.target.value)}
                    placeholder="Digite sua senha atual"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm font-medium">Nova Senha</Label>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('newPassword', e.target.value)}
                      placeholder="Digite a nova senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirmar Nova Senha</Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirme a nova senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleUpdatePassword}
                disabled={isLoading || !formData.currentPassword || !formData.newPassword}
                variant="outline"
                size="default"
                className="border-brand-300 text-brand-700 hover:bg-brand-50 hover:border-brand-400"
              >
                {isLoading ? 'Atualizando...' : 'Alterar Senha'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
