import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import translationEN from './locales/en/translation.json'
import translationZHCN from './locales/zh-CN/translation.json'

export const LANGUAGES = ['en', 'zh-CN']

const resources = {
  en: {
    translation: translationEN,
  },
  'zh-CN': {
    translation: translationZHCN,
  },
}

const i18nInstance = i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh-CN',
    debug: import.meta.env.DEV,
    preload: LANGUAGES,
    detection: {
      order: [
        'cookie',
        'localStorage',
        'sessionStorage',
        'querystring',
        'navigator',
        'htmlTag',
        'path',
        'subdomain',
      ],
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
    },
    // ns: ['common'],
    // interpolation: {
    //   escapeValue: false,
    // },
  })

export { i18nInstance }
