import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n'
import './index.scss'
import { DDLSidebar } from './components/sidebar/DDLSidebar'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div style={{ height: '100%', width: '100%' }}>
      {/* ddreamland sidebar adptive parent size */}
      <DDLSidebar
        title={{ name: 'Role AI' }}
        lang="en"
        recordRecent={{
          key: 'Role AI',
          openUrl: '',
          name: {
            en: 'Rola AI',
            'zh-CN': '角色AI',
          },
          iconUrlOrBase64:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGOSURBVHgBzVVNSsNAGP0SigXxBwQLdRUQqujSC3iAegAvoAfoAcw1eoG6t+7FvS4rFBTqpgELCipCFhLf1zxlnCQkNQn44DGTb77vvcnMJCPynxBF0YFS6gCEffCGPJMqQfErvsER+9WYQKhHwY4R6zDWk7LgkpxkGefVu5KPW7ALsbYhvoXmEAykLFQMHIIXamI/59U7KYIemk0wBMeO44SccV+HwVXwDTzFWICxJvrb4Do4Rewx0wDJmrgBztiq4J1hcszUgSG+zzyt0Td6xthDwsAQHyHhwyqem1iTSYwjtszYj4nL5DU0LXCi4nPnWHAENjgzG23bnLVj1aJm4hSFKUKfko1GSqxpPrh0fkXzBO7wNe0lSDuOAc33mCus9VSLmpmbrMUtWWyTXyQ+fembbJh4Eq+vzuDeOqYr4DsFzWO6Cy6BM8QmsgjKfmhFDAa2mGHSz6sv8i9S4Wtdju8A+lM0QzD38ilicCnxz+7X71riDT+XKmBcOF1eOtr3pUpYV6YvdaDWS/+v+AKrylr/ONNP9AAAAABJRU5ErkJggg==',
        }}
      ></DDLSidebar>

      {/* <DDLSidebar lang="en" />
      <DDLSidebar lang="zh-CN" /> */}
    </div>
  </React.StrictMode>
)
