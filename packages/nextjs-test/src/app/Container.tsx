'use client'
import { DDLSidebar } from '@ddreamland/common'
import { useState } from 'react'

export function Container() {
  const [lang, setLang] = useState<'en' | 'zh-CN'>('en')

  return (
    <div style={{ height: '600px', width: '280px' }}>
      <button
        onClick={() => {
          setLang(lang == 'en' ? 'zh-CN' : 'en')
        }}
      >
        Switch lang
      </button>
      {/* ddreamland sidebar adptive parent size and position */}
      <DDLSidebar></DDLSidebar>

      {/* <DDLSidebar lang={lang} /> */}
      {/* <DDLSidebar lang="en" /> */}
      {/* <DDLSidebar lang="zh-CN" /> */}
    </div>
  )
}
