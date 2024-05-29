import { useEffect } from 'react'
import { LANGUAGES } from './i18n'
import i18n, { changeLanguage } from 'i18next'

export function useLanguageManager(lang: string | undefined) {
  useEffect(
    function () {
      ensureLanguage(lang)
    },
    [lang]
  )

  useEffect(function () {
    ensureLanguage(lang)
  }, [])

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
