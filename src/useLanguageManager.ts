import { LANGUAGES } from './i18n'
import i18n, { changeLanguage } from 'i18next'

export function useLanguageManager() {
  function ensureLanguage(lang: string | undefined) {
    if (!lang || !LANGUAGES.includes(lang)) {
      return
    }

    if (i18n.language !== lang) {
      changeLanguage(lang)
    }
  }

  return {
    ensureLanguage,
  }
}
