import { DashboardCard } from '../types'

export const DASHBOARD_CONSTANTS = {
  CARDS: [
    {
      id: 'about',
      title: 'Conheça o grupo',
      subtitle: 'Confira nossa história e o que fazemos',
      url: '/about',
    },
    {
      id: 'services',
      title: 'Outros serviços',
      subtitle: 'Saiba mais opções que você pode acessar por aqui',
      url: '/services',
    },
    {
      id: 'donations',
      title: 'Como ajudar?',
      subtitle: 'Nosso canal de doações',
      url: '/donations',
    },
    {
      id: 'educational',
      title: 'Material educativo',
      subtitle: 'Acesse materiais que podem ajudar pacientes oncológicos',
      url: '/educational',
    },
    {
      id: 'volunteer',
      title: 'Como ser um voluntário?',
      subtitle: 'Saiba como participar do grupo',
      url: '/volunteer',
    },
    {
      id: 'support',
      title: 'Como receber apoio?',
      subtitle: 'Saiba como participar do grupo',
      url: '/support',
    },
  ] as DashboardCard[],
  MESSAGES: {
    WELCOME: 'Bem-vindo ao dashboard',
    LOADING: 'Carregando dashboard...',
  },
} as const
