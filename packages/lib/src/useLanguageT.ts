import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'

export function useLanguageT(key: string) {
  const { t } = useTranslation()
  const [translation, setTranslation] = useState('')

  useEffect(
    function () {
      setTranslation(t(key))
    },
    [i18n.language]
  )

  return { translation }
}
