import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { User } from 'lucide-react'
import { ProfileImage } from './profile-image'
import { SettingsFormData } from '../types'

interface ProfileFormProps {
  formData: SettingsFormData
  profileImage: string | null
  isLoading: boolean
  onInputChange: (field: keyof SettingsFormData, value: string) => void
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onUpdateProfile: () => void
}

export function ProfileForm({
  formData,
  profileImage,
  isLoading,
  onInputChange,
  onImageUpload,
  onUpdateProfile,
}: ProfileFormProps) {
  return (
    <Card className="w-full border-muted-foreground/25 dark:border-muted-foreground/50">
      <CardHeader className="space-y-1.5">
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Informações do Perfil
        </CardTitle>
        <CardDescription>Atualize suas informações pessoais</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Foto de Perfil */}
        <ProfileImage
          profileImage={profileImage}
          userName={formData.name}
          onImageUpload={onImageUpload}
        />

        {/* Campos do Formulário */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nome Completo
            </Label>
            <Input
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange('name', e.target.value)
              }
              placeholder="Seu nome completo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange('email', e.target.value)
              }
              placeholder="seu@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Telefone
            </Label>
            <Input
              value={formData.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange('phone', e.target.value)
              }
              placeholder="(11) 99999-9999"
            />
          </div>
        </div>

        <Button
          onClick={onUpdateProfile}
          disabled={isLoading}
          variant="default"
          size="default"
          className="bg-brand-500 hover:bg-brand-600 text-white"
        >
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </CardContent>
    </Card>
  )
}
