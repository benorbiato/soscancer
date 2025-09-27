import React, { useState } from 'react'
import { 
  Settings, 
  Save, 
  RefreshCw,
  Shield,
  Database,
  Mail,
  Bell,
  Globe,
  Lock,
  Users,
  Calendar
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'

export function SystemSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'SOS Cancer',
    siteDescription: 'Plataforma de apoio ao combate ao câncer',
    siteUrl: 'https://soscancer.org',
    timezone: 'America/Sao_Paulo',
    language: 'pt-BR',
    maintenanceMode: false
  })

  // User Settings
  const [userSettings, setUserSettings] = useState({
    allowRegistration: true,
    requireEmailVerification: true,
    allowPasswordReset: true,
    maxLoginAttempts: 5,
    sessionTimeout: 30,
    requireTwoFactor: false
  })

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: '',
    fromEmail: 'noreply@soscancer.org',
    fromName: 'SOS Cancer'
  })

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    eventReminders: true,
    systemAlerts: true,
    weeklyDigest: true
  })

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    sessionTimeout: 30,
    maxConcurrentSessions: 3,
    enableAuditLog: true
  })

  const handleSave = async (section: string) => {
    setIsLoading(true)
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: 'Configurações salvas',
        description: `As configurações de ${section} foram salvas com sucesso.`,
      })
    } catch (error) {
      toast({
        title: 'Erro ao salvar',
        description: 'Ocorreu um erro ao salvar as configurações. Tente novamente.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações do Sistema</h1>
          <p className="text-muted-foreground">
            Configure as opções gerais do sistema e funcionalidades
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Admin</span>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Configurações Gerais
              </CardTitle>
              <CardDescription>
                Configure as informações básicas do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nome do Site</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">URL do Site</Label>
                  <Input
                    id="siteUrl"
                    value={generalSettings.siteUrl}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteUrl: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Descrição do Site</Label>
                <Textarea
                  id="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <select
                    id="timezone"
                    value={generalSettings.timezone}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                  >
                    <option value="America/Sao_Paulo">São Paulo (UTC-3)</option>
                    <option value="America/New_York">Nova York (UTC-5)</option>
                    <option value="Europe/London">Londres (UTC+0)</option>
                    <option value="Asia/Tokyo">Tóquio (UTC+9)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <select
                    id="language"
                    value={generalSettings.language}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="maintenanceMode"
                  checked={generalSettings.maintenanceMode}
                  onCheckedChange={(checked) => setGeneralSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                />
                <Label htmlFor="maintenanceMode">Modo de Manutenção</Label>
              </div>

              <Button onClick={() => handleSave('gerais')} disabled={isLoading}>
                {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Salvar Configurações Gerais
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Settings */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Configurações de Usuários
              </CardTitle>
              <CardDescription>
                Configure as regras e comportamentos relacionados aos usuários
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowRegistration">Permitir Registro de Novos Usuários</Label>
                    <p className="text-sm text-muted-foreground">
                      Permite que novos usuários se registrem no sistema
                    </p>
                  </div>
                  <Switch
                    id="allowRegistration"
                    checked={userSettings.allowRegistration}
                    onCheckedChange={(checked) => setUserSettings(prev => ({ ...prev, allowRegistration: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="requireEmailVerification">Exigir Verificação de Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Usuários devem verificar o email antes de acessar o sistema
                    </p>
                  </div>
                  <Switch
                    id="requireEmailVerification"
                    checked={userSettings.requireEmailVerification}
                    onCheckedChange={(checked) => setUserSettings(prev => ({ ...prev, requireEmailVerification: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="requireTwoFactor">Exigir Autenticação de Dois Fatores</Label>
                    <p className="text-sm text-muted-foreground">
                      Usuários devem configurar 2FA para acessar o sistema
                    </p>
                  </div>
                  <Switch
                    id="requireTwoFactor"
                    checked={userSettings.requireTwoFactor}
                    onCheckedChange={(checked) => setUserSettings(prev => ({ ...prev, requireTwoFactor: checked }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Máximo de Tentativas de Login</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={userSettings.maxLoginAttempts}
                    onChange={(e) => setUserSettings(prev => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Timeout da Sessão (minutos)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={userSettings.sessionTimeout}
                    onChange={(e) => setUserSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave('usuários')} disabled={isLoading}>
                {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Salvar Configurações de Usuários
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Configurações de Email
              </CardTitle>
              <CardDescription>
                Configure o servidor SMTP e templates de email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">Servidor SMTP</Label>
                  <Input
                    id="smtpHost"
                    value={emailSettings.smtpHost}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">Porta SMTP</Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: parseInt(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">Usuário SMTP</Label>
                  <Input
                    id="smtpUser"
                    type="email"
                    value={emailSettings.smtpUser}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpUser: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">Senha SMTP</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">Email Remetente</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromName">Nome do Remetente</Label>
                  <Input
                    id="fromName"
                    value={emailSettings.fromName}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, fromName: e.target.value }))}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave('email')} disabled={isLoading}>
                {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Salvar Configurações de Email
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configurações de Notificações
              </CardTitle>
              <CardDescription>
                Configure como e quando enviar notificações aos usuários
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Notificações por Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Enviar notificações por email
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushNotifications">Notificações Push</Label>
                    <p className="text-sm text-muted-foreground">
                      Enviar notificações push para dispositivos móveis
                    </p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="eventReminders">Lembretes de Eventos</Label>
                    <p className="text-sm text-muted-foreground">
                      Enviar lembretes antes dos eventos
                    </p>
                  </div>
                  <Switch
                    id="eventReminders"
                    checked={notificationSettings.eventReminders}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, eventReminders: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weeklyDigest">Resumo Semanal</Label>
                    <p className="text-sm text-muted-foreground">
                      Enviar resumo semanal das atividades
                    </p>
                  </div>
                  <Switch
                    id="weeklyDigest"
                    checked={notificationSettings.weeklyDigest}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, weeklyDigest: checked }))}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave('notificações')} disabled={isLoading}>
                {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Salvar Configurações de Notificações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configurações de Segurança
              </CardTitle>
              <CardDescription>
                Configure as políticas de segurança e proteção do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Tamanho Mínimo da Senha</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={securitySettings.passwordMinLength}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordMinLength: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxConcurrentSessions">Máximo de Sessões Simultâneas</Label>
                  <Input
                    id="maxConcurrentSessions"
                    type="number"
                    value={securitySettings.maxConcurrentSessions}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, maxConcurrentSessions: parseInt(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="requireSpecialChars">Exigir Caracteres Especiais</Label>
                    <p className="text-sm text-muted-foreground">
                      Senhas devem conter caracteres especiais
                    </p>
                  </div>
                  <Switch
                    id="requireSpecialChars"
                    checked={securitySettings.requireSpecialChars}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, requireSpecialChars: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="requireNumbers">Exigir Números</Label>
                    <p className="text-sm text-muted-foreground">
                      Senhas devem conter números
                    </p>
                  </div>
                  <Switch
                    id="requireNumbers"
                    checked={securitySettings.requireNumbers}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, requireNumbers: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="requireUppercase">Exigir Maiúsculas</Label>
                    <p className="text-sm text-muted-foreground">
                      Senhas devem conter letras maiúsculas
                    </p>
                  </div>
                  <Switch
                    id="requireUppercase"
                    checked={securitySettings.requireUppercase}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, requireUppercase: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableAuditLog">Habilitar Log de Auditoria</Label>
                    <p className="text-sm text-muted-foreground">
                      Registrar todas as ações dos usuários
                    </p>
                  </div>
                  <Switch
                    id="enableAuditLog"
                    checked={securitySettings.enableAuditLog}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, enableAuditLog: checked }))}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave('segurança')} disabled={isLoading}>
                {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Salvar Configurações de Segurança
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
