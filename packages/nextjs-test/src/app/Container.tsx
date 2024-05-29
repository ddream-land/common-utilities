'use client'
import { DDLSidebar } from '@ddreamland/common'
import { lazy, useEffect, useState } from 'react'

export function Container() {
  const [lang, setLang] = useState<'en' | 'zh-CN'>('en')

  useEffect(function () {
    setLang('en')
  }, [])

  return (
    <div style={{ height: '600px', width: '280px' }}>
      <button
        onClick={() => {
          setLang(lang == 'en' ? 'zh-CN' : 'en')
        }}
      >
        Switch lang
      </button>
      {/* ddreamland sidebar adptive parent size */}
      {/* <DDLSidebar></DDLSidebar> */}

      {/* <DDLSidebar lang="en" /> */}
      <DDLSidebar lang={lang} />
    </div>
  )
}
