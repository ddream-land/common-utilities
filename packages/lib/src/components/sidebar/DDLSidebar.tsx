'use client'
import classes from './DDLSidebar.module.scss'
import { useTranslation } from 'react-i18next'
import { useLanguageManager } from '../../useLanguageManager'
import { useEffect } from 'react'
import axios from 'axios'

export type DDLSidebarProps = Readonly<{
  lang?: 'en' | 'zh-CN'
  children?: React.ReactNode
}>

export function DDLSidebar({ children, lang }: DDLSidebarProps) {
  const {} = useLanguageManager(lang)
  const { t } = useTranslation()

  useEffect(function () {
    ;(async function () {
      const ret = await axios.get('https://catfact.ninja/fact')
      console.log(ret)
    })()
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
