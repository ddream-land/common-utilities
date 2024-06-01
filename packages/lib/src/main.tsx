import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n'
import './index.scss'
import { DDLSidebar } from './components/sidebar/DDLSidebar'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div style={{ height: '100%', width: '100%' }}>
      {/* ddreamland sidebar adptive parent size */}
      <DDLSidebar title={{ name: 'Role AI' }} lang="en"></DDLSidebar>

      {/* <DDLSidebar lang="en" />
      <DDLSidebar lang="zh-CN" /> */}
    </div>
  </React.StrictMode>
)
