import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, MapPin, User } from 'lucide-react'
import { Event } from '../types'
import { EVENT_TYPES } from '../constants'
import { formatBrazilianDateFull } from '@/lib/date-utils'

interface EventCardsProps {
  events: Event[]
  title: string
  emptyMessage?: string
}

export function EventCards({
  events,
  title,
  emptyMessage = 'Nenhum evento encontrado',
}: EventCardsProps) {
  const formatDate = (dateString: string) => {
    return formatBrazilianDateFull(dateString)
  }

  const formatTime = (time: string) => {
    return time
  }

  const getEventTypeInfo = (type: Event['type']) => {
    return EVENT_TYPES[type]
  }

  if (events.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">{emptyMessage}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full border-muted-foreground/25 dark:border-muted-foreground/50">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => {
            const typeInfo = getEventTypeInfo(event.type)

            return (
              <div
                key={event.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                    {event.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                  <Badge className={`${typeInfo.color} border-0`}>
                    <span className="mr-1">{typeInfo.icon}</span>
                    <span>{typeInfo.label}</span>
                  </Badge>
                </div>

                <div className="space-y-2">
                  {/* Data e hora */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">
                      {formatDate(event.date)} às {formatTime(event.time)}
                      {event.type === 'reminder' && event.originalDate && (
                        <span className="ml-2 text-xs text-orange-600 dark:text-orange-400">
                          (Evento em {formatDate(event.originalDate)})
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Localização */}
                  {event.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  )}

                  {/* Médico */}
                  {event.doctor && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <User className="h-4 w-4" />
                      <span>{event.doctor}</span>
                    </div>
                  )}

                  {/* Notas */}
                  {event.notes && (
                    <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border-l-4 border-yellow-400">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <strong>Nota:</strong> {event.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
