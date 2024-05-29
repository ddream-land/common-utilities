'use client'

import '@ddreamland/common/style.css'
import { DDLSidebar } from '@ddreamland/common'
import { useState } from 'react'

export function ClientCom() {
  const [lang, setLang] = useState<'en' | 'zh-CN'>('en')

  return (
    <div>
      <button
        onClick={() => {
          setLang(lang == 'en' ? 'zh-CN' : 'en')
        }}
      >
        Change language
      </button>
      <div style={{ height: '600px', width: '280px' }}>
        {/* ddreamland sidebar adptive parent size */}
        {/* <DDLSidebar></DDLSidebar> */}

        <DDLSidebar lang={lang} />
        {/* <DDLSidebar lang="zh-CN" /> */}
      </div>
    </div>
  )
}
