import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n'
import './index.scss'
import { DDLSidebar } from './components/sidebar/DDLSidebar'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div style={{ height: '600px', width: '280px' }}>
      {/* ddreamland sidebar adptive parent size */}
      <DDLSidebar></DDLSidebar>

      {/* <DDLSidebar lang="en" />
      <DDLSidebar lang="zh-CN" /> */}
    </div>

    <div style={{ height: '600px', width: '280px' }}>
      {/* ddreamland sidebar adptive parent size */}
    </div>
  </React.StrictMode>
)
