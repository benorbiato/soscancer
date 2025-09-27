import { useState, useEffect, useMemo } from 'react';
import { Event, AgendaState } from '../types';
import { SAMPLE_EVENTS, getUpcomingEvents, getEventsByDate, getEventDates } from '../constants';

export function useAgenda() {
  const [state, setState] = useState<AgendaState>({
    selectedDate: null,
    events: SAMPLE_EVENTS,
    upcomingEvents: [],
    isLoading: false,
    error: null
  });

  // Separar eventos normais de lembretes
  const regularEvents = useMemo(() => {
    return state.events.filter(event => event.type !== 'reminder');
  }, [state.events]);

  const reminders = useMemo(() => {
    return state.events.filter(event => event.type === 'reminder');
  }, [state.events]);

  // Calcular eventos futuros (todos os eventos)
  const upcomingEvents = useMemo(() => {
    return getUpcomingEvents(state.events, 5);
  }, [state.events]);

  // Calcular datas com eventos (todos os eventos)
  const eventDates = useMemo(() => {
    return getEventDates(state.events);
  }, [state.events]);

  // Eventos do dia selecionado
  const selectedDateEvents = useMemo(() => {
    if (!state.selectedDate) return [];
    return getEventsByDate(state.events, state.selectedDate);
  }, [state.events, state.selectedDate]);

  const selectDate = (date: string | null) => {
    setState(prev => ({
      ...prev,
      selectedDate: date
    }));
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString()
    };

    setState(prev => ({
      ...prev,
      events: [...prev.events, newEvent]
    }));
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    setState(prev => ({
      ...prev,
      events: prev.events.map(event =>
        event.id === id ? { ...event, ...updates } : event
      )
    }));
  };

  const deleteEvent = (id: string) => {
    setState(prev => ({
      ...prev,
      events: prev.events.filter(event => event.id !== id)
    }));
  };

  // Funções específicas para lembretes
  const addReminder = (reminder: Omit<Event, 'id'>) => {
    const newReminder: Event = {
      ...reminder,
      id: Date.now().toString(),
      type: 'reminder',
      status: 'scheduled'
    };

    setState(prev => ({
      ...prev,
      events: [...prev.events, newReminder]
    }));
  };

  const updateReminder = (id: string, updates: Partial<Event>) => {
    setState(prev => ({
      ...prev,
      events: prev.events.map(event =>
        event.id === id ? { ...event, ...updates } : event
      )
    }));
  };

  const deleteReminder = (id: string) => {
    setState(prev => ({
      ...prev,
      events: prev.events.filter(event => event.id !== id)
    }));
  };

  return {
    state: {
      ...state,
      upcomingEvents,
      eventDates,
      selectedDateEvents,
      regularEvents,
      reminders
    },
    selectDate,
    addEvent,
    updateEvent,
    deleteEvent,
    addReminder,
    updateReminder,
    deleteReminder
  };
}
