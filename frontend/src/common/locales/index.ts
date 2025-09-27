import i18n from '@/lib/i18n'

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

const namespaces = [
  { ns: 'auth', resources: { en: authEn, pt: authPt } },
  { ns: 'registry', resources: { en: registryEn, pt: registryPt } },
  { ns: 'dashboard', resources: { en: dashboardEn, pt: dashboardPt } },
  { ns: 'agenda', resources: { en: agendaEn, pt: agendaPt } },
  { ns: 'about', resources: { en: aboutEn, pt: aboutPt } },
]

namespaces.forEach(({ ns, resources }) => {
  if (!i18n.hasResourceBundle('en', ns)) {
    i18n.addResourceBundle('en', ns, resources.en, true, true)
    i18n.addResourceBundle('pt', ns, resources.pt, true, true)
  }
})

export const auth = 'auth'
export const registry = 'registry'
export const dashboard = 'dashboard'
export const agenda = 'agenda'
export const about = 'about'
