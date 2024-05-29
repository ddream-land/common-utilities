'use client'
import classes from './DDLSidebar.module.scss'
import { useTranslation } from 'react-i18next'
import { useLanguageManager } from '../../useLanguageManager'
import { useEffect, useState } from 'react'
import axios from 'axios'

export type DDLSidebarProps = Readonly<{
  lang?: 'en' | 'zh-CN'
  children?: React.ReactNode
}>

export function DDLSidebar({ children, lang }: DDLSidebarProps) {
  const {} = useLanguageManager(lang)
  const { t } = useTranslation()

  let now = Date.now()

  // const [currentLanguageText, setCurrentLanguageText] = useState('')

  useEffect(function () {
    setInterval(() => {
      console.log(1111)
      now++
    }, 1000)

    // suppressHydrationWarning
    // setCurrentLanguageText(t('Current Language'))
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
            {/* {currentLanguageText} */}
            {t('Current Language')}
            {now}
          </div>
          <div className={`${classes.panel}`}></div>
          <div className={`${classes.recent}`}></div>
        </div>
      </div>
    </div>
  )
}
