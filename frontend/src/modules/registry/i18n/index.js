import i18n from '@/lib/i18n'
import en from './en.json'
import pt from './pt.json'

// Register namespace only once
const NS = 'registry'
const hasNs = i18n.hasResourceBundle('en', NS)
if (!hasNs) {
  i18n.addResourceBundle('en', NS, en, true, true)
  i18n.addResourceBundle('pt', NS, pt, true, true)
}

export const registryNs = NS
