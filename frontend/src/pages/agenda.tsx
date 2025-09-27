import { AuthenticatedHeader } from '@/components/layouts/authenticated-header'
import { AgendaDatepicker, EventCards, CompactEvents, SimpleReminders } from '@/modules/agenda/components'
import { useAgenda } from '@/modules/agenda/hooks/use-agenda'

export default function Agenda() {
  const { 
    state, 
    selectDate, 
    addReminder, 
    updateReminder, 
    deleteReminder 
  } = useAgenda();

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Agenda</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie seus compromissos e eventos médicos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lado Esquerdo - Calendário e Próximos Eventos */}
          <div className="flex flex-col space-y-6">
            {/* Calendário */}
            <div className="flex-1">
              <AgendaDatepicker
                selectedDate={state.selectedDate}
                eventDates={state.eventDates}
                onDateSelect={selectDate}
              />
            </div>

            {/* Próximos Eventos */}
            <div className="flex-1">
              <CompactEvents
                events={state.upcomingEvents}
                title="Próximos Eventos"
                emptyMessage="Nenhum evento agendado"
              />
            </div>
          </div>

          {/* Lado Direito - Lembretes */}
          <div className="flex flex-col">
            <SimpleReminders
              reminders={state.reminders}
              onAddReminder={addReminder}
              onUpdateReminder={updateReminder}
              onDeleteReminder={deleteReminder}
            />
          </div>
        </div>

        {/* Eventos do dia selecionado */}
        {state.selectedDate && (
          <div className="mt-6">
            <EventCards
              events={state.selectedDateEvents}
              title={`Eventos de ${new Date(state.selectedDate).toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}`}
              emptyMessage="Nenhum evento para esta data"
            />
          </div>
        )}
      </div>
    </div>
  )
}
