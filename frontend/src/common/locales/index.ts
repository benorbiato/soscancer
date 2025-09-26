import i18n from '@/lib/i18n'

import authEn from '@/modules/auth/locales/en.json'
import authPt from '@/modules/auth/locales/pt.json'
import registryEn from '@/modules/registry/locales/en.json'
import registryPt from '@/modules/registry/locales/pt.json'

const namespaces = [
  { ns: 'auth', resources: { en: authEn, pt: authPt } },
  { ns: 'registry', resources: { en: registryEn, pt: registryPt } },
]

namespaces.forEach(({ ns, resources }) => {
  if (!i18n.hasResourceBundle('en', ns)) {
    i18n.addResourceBundle('en', ns, resources.en, true, true)
    i18n.addResourceBundle('pt', ns, resources.pt, true, true)
  }
})

export const auth = 'auth'
export const registry = 'registry'
