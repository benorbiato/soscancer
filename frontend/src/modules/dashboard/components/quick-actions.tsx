import React from 'react'
import { useTranslation } from 'react-i18next'
import { dashboard } from '@/common/locales'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, MessageCircle, Calendar, FileText, Users, Heart, ExternalLink } from 'lucide-react'

interface QuickActionItem {
  id: string
  title: string
  description: string
  icon: string
  url: string
  variant: 'default' | 'secondary' | 'outline'
  isExternal?: boolean
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Phone,
  MessageCircle,
  Calendar,
  FileText,
  Users,
  Heart,
}

interface QuickActionsProps {
  actions: QuickActionItem[]
}

function QuickActions({ actions }: QuickActionsProps) {
  const { t } = useTranslation(dashboard)

  return (
    <Card className="mb-8 dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          {t('quickActions.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action) => {
            const IconComponent = iconMap[action.icon] || Phone
            return (
              <Button
                key={action.id}
                variant={action.variant}
                className="h-auto p-4 flex flex-col items-start gap-2 text-left hover:shadow-md transition-shadow"
                asChild
              >
                <a
                  href={action.url}
                  target={action.isExternal ? '_blank' : '_self'}
                  rel={action.isExternal ? 'noopener noreferrer' : undefined}
                >
                  <div className="flex items-center gap-2 w-full">
                    <IconComponent className="h-5 w-5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm">{action.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                    </div>
                    {action.isExternal && <ExternalLink className="h-3 w-3 flex-shrink-0" />}
                  </div>
                </a>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export { QuickActions }
