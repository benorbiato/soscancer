import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      appTitle: 'GRUPO PONGAIENSE DE COMBATE AO CÂNCER',
      appSubtitle: 'Join and learn how to help',
      login: 'Login',
      register: 'Register',
      loginWithGoogle: 'Login with Google',
      username: 'user',
      password: 'password',
      copyright: '© Copyright 2025 T3J Tech',
      userTypeSelect: 'Select your user type',
      patient: 'Patient',
      volunteer: 'Volunteer',
      supporter: 'Supporter',
      admin: 'Administrator',
      accessServices: 'Access available services',
      calendar: 'Calendar',
      news: 'News',
      about: 'About the group',
      back: 'Back',
      sending: 'Sending...',
      signup: '+ Sign up',
    },
  },
  pt: {
    translation: {
      appTitle: 'GRUPO PONGAIENSE DE COMBATE AO CÂNCER',
      appSubtitle: 'Faça parte e saiba como ajudar',
      login: 'Login',
      register: 'Cadastro',
      loginWithGoogle: 'Logar com o Google',
      username: 'usuário',
      password: 'senha',
      copyright: '© Copyright 2025 T3J Tech',
      userTypeSelect: 'Selecione seu tipo de usuário',
      patient: 'Paciente',
      volunteer: 'Voluntário',
      supporter: 'Apoiador',
      admin: 'Administrador',
      accessServices: 'Acesse os serviços disponíveis',
      calendar: 'Calendário',
      news: 'Novidades',
      about: 'Conheça o grupo',
      back: 'Voltar',
      sending: 'Enviando...',
      signup: '+ Cadastre-se',
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
