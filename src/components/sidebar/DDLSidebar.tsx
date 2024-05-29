import { useEffect } from 'react'
import { useLanguageManager } from '../../useLanguageManager'
import classes from './DDLSidebar.module.scss'
import { useTranslation } from 'react-i18next'

export type DDLSidebarProps = Readonly<{
  lang?: 'en' | 'zh-CN'
  children?: React.ReactNode
}>

export function DDLSidebar({ lang }: DDLSidebarProps) {
  const { ensureLanguage } = useLanguageManager()
  const { t } = useTranslation()

  useEffect(function () {
    ensureLanguage(lang)
  }, [])

  return (
    <div className={`${classes.sidebar} w-full h-full bg-transparent`}>
      <div className={`${classes.wrapper} w-full h-full`}>
        <div className={`${classes.minify} w-full h-full hidden`}></div>
        <div className={`${classes.content} w-full h-full`}>
          <div className={`${classes.header}`}>
            <p>Welcom to ddream land</p>
            <p> Logo Icon</p>
            {t('Current Language')}
          </div>
          <div className={`${classes.panel}`}></div>
          <div className={`${classes.recent}`}></div>
        </div>
      </div>
    </div>
  )
}
