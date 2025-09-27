import { MainLayout } from '@/components/layouts/main-layout'
import {
  AgendaDatepicker,
  EventCards,
  CompactEvents,
  SimpleReminders,
} from '@/modules/agenda/components'
import { useAgenda } from '@/modules/agenda/hooks/use-agenda'
import { ProtectedRoute } from '@/components/protected-route'
import { Permission } from '@/lib/permissions'
import { agenda } from '@/common/locales'
import { useTranslation } from 'react-i18next'

export default function Agenda() {
  const { t } = useTranslation(agenda)
  const { state, selectDate, addReminder, updateReminder, deleteReminder } = useAgenda()

  return (
    <ProtectedRoute requiredPermission={Permission.VIEW_AGENDA}>
      <MainLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{t('title')}</h1>
          <p className="text-muted-foreground mt-2">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-6">
            <div className="flex-1">
              <AgendaDatepicker
                selectedDate={state.selectedDate}
                eventDates={state.eventDates}
                onDateSelect={selectDate}
              />
            </div>

            <div className="flex-1">
              <SimpleReminders
                reminders={state.reminders}
                onAddReminder={addReminder}
                onUpdateReminder={updateReminder}
                onDeleteReminder={deleteReminder}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <CompactEvents
              events={state.upcomingEvents}
              title={t('nextEvents')}
              emptyMessage={t('noEvents')}
            />
          </div>
        </div>

        {state.selectedDate && (
          <div className="mt-6">
            <EventCards
              events={state.selectedDateEvents}
              title={`${t('events')} de ${new Date(state.selectedDate).toLocaleDateString(
                'pt-BR',
                {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                },
              )}`}
              emptyMessage={t('noEvents')}
            />
          </div>
        )}
      </MainLayout>
    </ProtectedRoute>
  )
}
