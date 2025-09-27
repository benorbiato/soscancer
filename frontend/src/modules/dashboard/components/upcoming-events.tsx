import React from 'react'
import { useTranslation } from 'react-i18next'
import { dashboard } from '@/common/locales'
import { UpcomingEvent } from '../types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Clock } from 'lucide-react'

interface UpcomingEventsProps {
  events: UpcomingEvent[]
}

function UpcomingEvents({ events }: UpcomingEventsProps) {
  const { t } = useTranslation(dashboard)

  // Função para converter a data do evento para um objeto Date
  const parseEventDate = (dateString: string): Date => {
    try {
      // Extrai apenas a parte da data (antes do hífen com horário)
      const datePart = dateString.split(' - ')[0]

      // Regex para extrair dia, mês e ano
      const match = datePart.match(/(\d{1,2})\s+de\s+(\w+),\s+(\d{4})/i)

      if (!match) {
        console.warn(`Formato de data não reconhecido: ${dateString}`)
        return new Date()
      }

      const [, day, month, year] = match

      // Mapeia os meses do português para números
      const monthMap: { [key: string]: number } = {
        janeiro: 0,
        fevereiro: 1,
        março: 2,
        abril: 3,
        maio: 4,
        junho: 5,
        julho: 6,
        agosto: 7,
        setembro: 8,
        outubro: 9,
        novembro: 10,
        dezembro: 11,
      }

      const monthNumber = monthMap[month.toLowerCase()]

      if (monthNumber === undefined) {
        console.warn(`Mês não reconhecido: ${month}`)
        return new Date()
      }

      const parsedDate = new Date(parseInt(year), monthNumber, parseInt(day))

      // Verifica se a data é válida
      if (isNaN(parsedDate.getTime())) {
        console.warn(`Data inválida: ${dateString}`)
        return new Date()
      }

      return parsedDate
    } catch (error) {
      console.warn(`Erro ao parsear data: ${dateString}`, error)
      return new Date()
    }
  }

  // Ordena os eventos por data (mais próximos primeiro)
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = parseEventDate(a.date)
    const dateB = parseEventDate(b.date)
    return dateA.getTime() - dateB.getTime()
  })

  if (events.length === 0) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {t('upcomingEvents.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">{t('upcomingEvents.noEvents')}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mb-8 dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          {t('upcomingEvents.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground truncate">{event.title}</h3>
                  <Badge variant={event.type === 'urgent' ? 'destructive' : 'secondary'}>
                    {event.type === 'urgent'
                      ? t('upcomingEvents.urgent')
                      : t('upcomingEvents.normal')}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {event.description}
                </p>
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export { UpcomingEvents }
