import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n'
import './index.scss'
import { DDLSidebar } from './components/sidebar/DDLSidebar'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DDLSidebar />
  </React.StrictMode>
)
