import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { SettingsFormData } from '../types'

interface PasswordFormProps {
  formData: SettingsFormData
  showCurrentPassword: boolean
  showNewPassword: boolean
  showConfirmPassword: boolean
  isLoading: boolean
  onInputChange: (field: keyof SettingsFormData, value: string) => void
  onTogglePasswordVisibility: (field: 'currentPassword' | 'newPassword' | 'confirmPassword') => void
  onUpdatePassword: () => void
}

export function PasswordForm({
  formData,
  showCurrentPassword,
  showNewPassword,
  showConfirmPassword,
  isLoading,
  onInputChange,
  onTogglePasswordVisibility,
  onUpdatePassword,
}: PasswordFormProps) {
  return (
    <Card className="w-full border-muted-foreground/25 dark:border-muted-foreground/50">
      <CardHeader className="space-y-1.5">
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Alterar Senha
        </CardTitle>
        <CardDescription>Para sua segurança, confirme sua senha atual</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword" className="text-sm font-medium">
            Senha Atual
          </Label>
          <div className="relative">
            <Input
              type={showCurrentPassword ? 'text' : 'password'}
              value={formData.currentPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange('currentPassword', e.target.value)
              }
              placeholder="Digite sua senha atual"
            />
            <button
              type="button"
              onClick={() => onTogglePasswordVisibility('currentPassword')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-sm font-medium">
              Nova Senha
            </Label>
            <div className="relative">
              <Input
                type={showNewPassword ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onInputChange('newPassword', e.target.value)
                }
                placeholder="Digite a nova senha"
              />
              <button
                type="button"
                onClick={() => onTogglePasswordVisibility('newPassword')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirmar Nova Senha
            </Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onInputChange('confirmPassword', e.target.value)
                }
                placeholder="Confirme a nova senha"
              />
              <button
                type="button"
                onClick={() => onTogglePasswordVisibility('confirmPassword')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        <Button
          onClick={onUpdatePassword}
          disabled={isLoading || !formData.currentPassword || !formData.newPassword}
          variant="outline"
          size="default"
          className="border-muted-foreground/25 dark:border-muted-foreground/50 text-foreground hover:bg-muted"
        >
          {isLoading ? 'Atualizando...' : 'Alterar Senha'}
        </Button>
      </CardContent>
    </Card>
  )
}
