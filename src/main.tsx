import React from 'react'
import ReactDOM from 'react-dom/client'
import './tailwind.css'
import { DDLSidebar } from './components/sidebar/DDLSidebar'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DDLSidebar />
  </React.StrictMode>
)
