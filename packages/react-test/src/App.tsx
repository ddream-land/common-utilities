import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@ddreamland/common/style.css'
import { DDLSidebar } from '@ddreamland/common'

function App() {
  const [count, setCount] = useState(0)
  const [lang, setLang] = useState<'en' | 'zh-CN'>('en')
  const [size, setSize] = useState<'mini' | 'full' | undefined>(undefined)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <button
        onClick={() => {
          setLang(lang == 'en' ? 'zh-CN' : 'en')
        }}
      >
        Switch lang
      </button>
      <button
        onClick={() => {
          size ? setSize(undefined) : setSize('mini')
        }}
      >
        Switch Force size: {size}
      </button>
      <div style={{ height: '600px', width: '280px' }}>
        {/* ddreamland sidebar adptive parent size and position */}
        {/* <DDLSidebar></DDLSidebar> */}

        <DDLSidebar title={{ name: 'QWE' }} lang={lang} forceSize={size}></DDLSidebar>
        {/* <DDLSidebar lang="en" /> */}
        {/* <DDLSidebar lang="zh-CN" /> */}
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
