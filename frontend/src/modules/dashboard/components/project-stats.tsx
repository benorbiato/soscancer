import React from 'react'
import { useTranslation } from 'react-i18next'
import { dashboard } from '@/common/locales'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Calendar, Heart, BookOpen, Phone, MapPin } from 'lucide-react'

interface ProjectStatsProps {
  stats: {
    patientsHelped: number
    eventsHeld: number
    volunteers: number
    materialsDistributed: number
    supportCalls: number
    citiesReached: number
  }
}

function ProjectStats({ stats }: ProjectStatsProps) {
  const { t } = useTranslation(dashboard)

  const statItems = [
    {
      icon: Heart,
      label: t('stats.patientsHelped'),
      value: stats.patientsHelped.toLocaleString('pt-BR'),
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
    },
    {
      icon: Calendar,
      label: t('stats.eventsHeld'),
      value: stats.eventsHeld.toLocaleString('pt-BR'),
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      icon: Users,
      label: t('stats.volunteers'),
      value: stats.volunteers.toLocaleString('pt-BR'),
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
    },
    {
      icon: BookOpen,
      label: t('stats.materialsDistributed'),
      value: stats.materialsDistributed.toLocaleString('pt-BR'),
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    },
    {
      icon: Phone,
      label: t('stats.supportCalls'),
      value: stats.supportCalls.toLocaleString('pt-BR'),
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    },
    {
      icon: MapPin,
      label: t('stats.citiesReached'),
      value: stats.citiesReached.toLocaleString('pt-BR'),
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
    },
  ]

  return (
    <Card className="mb-8 dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          {t('stats.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div key={index} className="text-center space-y-2">
                <div
                  className={`w-12 h-12 mx-auto rounded-lg ${item.bgColor} flex items-center justify-center`}
                >
                  <IconComponent className={`h-6 w-6 ${item.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export { ProjectStats }
