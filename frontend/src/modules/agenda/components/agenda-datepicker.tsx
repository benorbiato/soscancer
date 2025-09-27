import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'
import { agenda } from '@/common/locales'

interface AgendaDatepickerProps {
  selectedDate: string | null
  eventDates: string[]
  onDateSelect: (date: string | null) => void
}

export function AgendaDatepicker({
  selectedDate,
  eventDates,
  onDateSelect,
}: AgendaDatepickerProps) {
  const { t } = useTranslation(agenda)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleDateClick = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd')
    const hasEvents = eventDates.includes(dateString)

    if (hasEvents) {
      onDateSelect(selectedDate === dateString ? null : dateString)
    }
  }

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false
    return isSameDay(date, new Date(selectedDate))
  }

  const hasEvents = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd')
    return eventDates.includes(dateString)
  }

  const isToday = (date: Date) => {
    return isSameDay(date, new Date())
  }

  return (
    <Card className="w-full border-brand-500 dark:border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          {t('calendar')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Header do calendário */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousMonth}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <h3 className="text-lg font-semibold">
              {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
            </h3>

            <Button variant="outline" size="sm" onClick={handleNextMonth} className="h-8 w-8 p-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Dias da semana */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-2">
                {day}
              </div>
            ))}
          </div>

          {/* Dias do mês */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const dayHasEvents = hasEvents(day)
              const isSelected = isDateSelected(day)
              const isCurrentDay = isToday(day)
              const isCurrentMonth = isSameMonth(day, currentMonth)

              return (
                <Button
                  key={day.toISOString()}
                  variant="ghost"
                  size="sm"
                  className={`
                    h-8 w-8 p-0 text-sm
                    ${!isCurrentMonth ? 'text-gray-400 dark:text-gray-600' : ''}
                    ${isCurrentDay ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 font-semibold' : ''}
                    ${isSelected ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                    ${dayHasEvents && !isSelected ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200' : ''}
                    ${!dayHasEvents && !isSelected && !isCurrentDay ? 'hover:bg-gray-100 dark:hover:bg-gray-800' : ''}
                  `}
                  onClick={() => handleDateClick(day)}
                  disabled={!dayHasEvents}
                >
                  {format(day, 'd')}
                </Button>
              )
            })}
          </div>

          {/* Legenda */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-100 dark:bg-green-900 rounded"></div>
              <span>{t('events')}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-100 dark:bg-blue-900 rounded"></div>
              <span>{t('today')}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span>{t('selected')}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
