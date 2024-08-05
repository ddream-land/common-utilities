# DDreamland common lib

## Installation

`npm i @ddreamland/common -S`

or

`pnpm i @ddreamland/common -S`

## How to use

#### 1. Add style to root

- nextjs

```tsx
import './globals.css'
import '@ddreamland/common/style.css' // Here

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

- react

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@ddreamland/common/style.css' // Here

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

#### 2. Use ddream-land common component

- nextjs

```tsx
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
```

- react

```tsx
<div style={{ height: '600px', width: '280px' }}>
  {/* ddreamland sidebar adptive parent size and position */}
  <DDLSidebar></DDLSidebar>

  {/* <DDLSidebar lang={lang}></DDLSidebar> */}
  {/* <DDLSidebar lang="en" /> */}
  {/* <DDLSidebar lang="zh-CN" /> */}
  
  <LoginModal
    isOpen={isOpen}
    locale={locale}
    onClose={() => {
      setIsOpen(false);
    }}
    onLogin={() => {
      setIsOpen(false);
      // do something
    }}
  />
</div>
```

