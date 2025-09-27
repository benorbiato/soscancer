import { Event } from '../types';
import { getCurrentBrazilianDate, compareBrazilianDates } from '@/lib/date-utils';

export const EVENT_TYPES = {
  consultation: {
    label: 'Consulta',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    icon: '🩺'
  },
  examination: {
    label: 'Exame',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    icon: '🔬'
  },
  treatment: {
    label: 'Tratamento',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    icon: '💊'
  },
  reminder: {
    label: 'Lembrete',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    icon: '⏰'
  }
} as const;

export const SAMPLE_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Consulta com Dr. Silva',
    description: 'Consulta de rotina para acompanhamento',
    date: '2025-10-15',
    time: '09:00',
    location: 'Clínica São Paulo',
    type: 'consultation',
    status: 'scheduled',
    doctor: 'Dr. João Silva',
    notes: 'Trazer exames anteriores'
  },
  {
    id: '2',
    title: 'Exame de Sangue',
    description: 'Hemograma completo e bioquímica',
    date: '2025-10-18',
    time: '08:30',
    location: 'Laboratório Central',
    type: 'examination',
    status: 'scheduled',
    doctor: 'Dr. Maria Santos'
  },
  {
    id: '3',
    title: 'Sessão de Quimioterapia',
    description: '3ª sessão do ciclo de tratamento',
    date: '2025-09-22',
    time: '14:00',
    location: 'Hospital Oncológico',
    type: 'treatment',
    status: 'scheduled',
    doctor: 'Dr. Carlos Oliveira',
    notes: 'Jejum de 4 horas antes'
  },
  {
    id: '4',
    title: 'Lembrete: Tomar Medicação',
    description: 'Medicação prescrita pelo Dr. Silva',
    date: '2025-01-20',
    time: '20:00',
    type: 'reminder',
    status: 'scheduled'
  },
  {
    id: '5',
    title: 'Consulta de Retorno',
    description: 'Avaliação dos resultados dos exames',
    date: '2025-01-25',
    time: '10:30',
    location: 'Clínica São Paulo',
    type: 'consultation',
    status: 'scheduled',
    doctor: 'Dr. João Silva'
  },
  {
    id: '6',
    title: 'Exame de Imagem',
    description: 'Tomografia computadorizada',
    date: '2025-01-28',
    time: '11:00',
    location: 'Centro de Diagnóstico',
    type: 'examination',
    status: 'scheduled',
    doctor: 'Dr. Ana Costa'
  },
  {
    id: '7',
    title: 'Leilão',
    description: 'Leilão beneficente para arrecadação de fundos',
    date: '2025-10-08',
    time: '19:00',
    location: 'Centro de Eventos da Cidade',
    type: 'reminder',
    status: 'scheduled',
    notes: 'Evento beneficente - trazer convite'
  },
];

export const getUpcomingEvents = (events: Event[], limit: number = 5): Event[] => {
  const today = getCurrentBrazilianDate();
  
  return events
    .filter(event => event.date >= today && event.status === 'scheduled')
    .sort((a, b) => compareBrazilianDates(a.date, b.date))
    .slice(0, limit);
};

export const getEventsByDate = (events: Event[], date: string): Event[] => {
  return events.filter(event => event.date === date);
};

export const getEventDates = (events: Event[]): string[] => {
  const dates = events
    .filter(event => event.status === 'scheduled')
    .map(event => event.date);
  
  return [...new Set(dates)].sort();
};
