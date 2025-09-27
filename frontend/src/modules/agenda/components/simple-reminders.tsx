import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Edit2 } from 'lucide-react'
import { Event } from '../types'
import { formatBrazilianDate } from '@/lib/date-utils'
import { useTranslation } from 'react-i18next'
import { agenda } from '@/common/locales'
import { PermissionGuard } from '@/components/permission-guard'
import { Permission } from '@/lib/permissions'

interface SimpleRemindersProps {
  reminders: Event[]
  onAddReminder: (reminder: Omit<Event, 'id'>) => void
  onUpdateReminder: (id: string, updates: Partial<Event>) => void
  onDeleteReminder: (id: string) => void
}

export function SimpleReminders({
  reminders,
  onAddReminder,
  onUpdateReminder,
  onDeleteReminder,
}: SimpleRemindersProps) {
  const { t } = useTranslation(agenda)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onAddReminder({
      ...formData,
      type: 'reminder',
      status: 'scheduled',
    })

    setFormData({
      title: '',
      date: '',
      time: '',
    })
    setIsAdding(false)
  }

  const formatDate = (dateString: string) => {
    return formatBrazilianDate(dateString)
  }

  return (
    <Card className="w-full border-brand-500 dark:border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{t('events')}</CardTitle>
          <PermissionGuard permission={Permission.CREATE_EVENTS}>
            <Button onClick={() => setIsAdding(true)} size="sm" className="h-8">
              <Plus className="h-4 w-4 mr-1" />
              {t('newEvent')}
            </Button>
          </PermissionGuard>
        </div>
      </CardHeader>
      <CardContent>
        <PermissionGuard permission={Permission.CREATE_EVENTS}>
          {isAdding && (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Tomar medicação"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Data *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Horário *</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" size="sm">
                Criar Lembrete
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => setIsAdding(false)}>
                Cancelar
              </Button>
            </div>
          </form>
          )}
        </PermissionGuard>

        <div className="space-y-3">
          {reminders.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4 text-sm">
              Nenhum lembrete criado
            </p>
          ) : (
            reminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                      {formatDate(reminder.date)} às {reminder.time}
                    </span>
                    <span className="text-xs text-orange-600 dark:text-orange-400">
                      ⏰ Lembrete
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                    {reminder.title}
                  </h4>
                </div>

                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteReminder(reminder.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
