import React from 'react'
import { 
  Users, 
  Calendar, 
  BarChart3, 
  Settings,
  TrendingUp,
  Activity,
  Shield,
  UserCheck
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const stats = [
  {
    name: 'Total de Usuários',
    value: '1,234',
    change: '+12%',
    changeType: 'positive',
    icon: Users,
    description: 'Usuários cadastrados no sistema'
  },
  {
    name: 'Eventos Ativos',
    value: '28',
    change: '+4',
    changeType: 'positive',
    icon: Calendar,
    description: 'Eventos agendados para este mês'
  },
  {
    name: 'Taxa de Engajamento',
    value: '89%',
    change: '+5%',
    changeType: 'positive',
    icon: TrendingUp,
    description: 'Usuários ativos nos últimos 30 dias'
  },
  {
    name: 'Sistema Online',
    value: '99.9%',
    change: '0%',
    changeType: 'neutral',
    icon: Activity,
    description: 'Uptime do sistema'
  }
]

const recentActivities = [
  {
    id: 1,
    user: 'João Silva',
    action: 'Criou um novo evento',
    time: '2 horas atrás',
    type: 'event'
  },
  {
    id: 2,
    user: 'Maria Santos',
    action: 'Atualizou perfil',
    time: '4 horas atrás',
    type: 'profile'
  },
  {
    id: 3,
    user: 'Pedro Costa',
    action: 'Registrou-se no sistema',
    time: '6 horas atrás',
    type: 'registration'
  },
  {
    id: 4,
    user: 'Ana Oliveira',
    action: 'Cancelou participação em evento',
    time: '8 horas atrás',
    type: 'event'
  }
]

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Administrativo</h1>
          <p className="text-muted-foreground">
            Visão geral do sistema e métricas importantes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Admin</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              <div className="flex items-center pt-1">
                <span className={`text-xs ${
                  stat.changeType === 'positive' 
                    ? 'text-green-600' 
                    : stat.changeType === 'negative'
                    ? 'text-red-600'
                    : 'text-muted-foreground'
                }`}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  vs mês anterior
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Activities */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Atividades Recentes
            </CardTitle>
            <CardDescription>
              Últimas ações realizadas pelos usuários
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.user}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-xs text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Ações Rápidas
            </CardTitle>
            <CardDescription>
              Acesso rápido às principais funcionalidades
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link to="/admin/users">
                <Users className="mr-2 h-4 w-4" />
                Gerenciar Usuários
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/agenda">
                <Calendar className="mr-2 h-4 w-4" />
                Ver Agenda
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Status do Sistema
          </CardTitle>
          <CardDescription>
            Informações sobre a saúde e performance do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm">API Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm">Banco de Dados</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm">Serviços Externos</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
