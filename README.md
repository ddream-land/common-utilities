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
import { DDLSidebar } from '@ddreamland/common'

export function Container() {
  return (
    <div style={{ height: '600px', width: '280px' }}>
      {/* ddreamland sidebar adptive parent size */}
      <DDLSidebar></DDLSidebar>

      {/* <DDLSidebar lang="en" /> */}
      {/* <DDLSidebar lang="zh-CN" /> */}
    </div>
  )
}
```
