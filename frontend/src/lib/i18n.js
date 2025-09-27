import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import common translations
import commonEn from '@/common/locales/en.json'
import commonPt from '@/common/locales/pt.json'

// Import module translations
import authEn from '@/modules/auth/locales/en.json'
import authPt from '@/modules/auth/locales/pt.json'
import registryEn from '@/modules/registry/locales/en.json'
import registryPt from '@/modules/registry/locales/pt.json'
import dashboardEn from '@/modules/dashboard/locales/en.json'
import dashboardPt from '@/modules/dashboard/locales/pt.json'
import agendaEn from '@/modules/agenda/locales/en.json'
import agendaPt from '@/modules/agenda/locales/pt.json'
import aboutEn from '@/modules/about/locales/en.json'
import aboutPt from '@/modules/about/locales/pt.json'

const resources = {
  en: {
    translation: commonEn,
    auth: authEn,
    registry: registryEn,
    dashboard: dashboardEn,
    agenda: agendaEn,
    about: aboutEn,
  },
  pt: {
    translation: commonPt,
    auth: authPt,
    registry: registryPt,
    dashboard: dashboardPt,
    agenda: agendaPt,
    about: aboutPt,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
