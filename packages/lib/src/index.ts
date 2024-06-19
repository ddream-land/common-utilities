import './i18n'
import './index.scss'
import DDLUrl from './utils/url'

// suppressHydrationWarning

export { DDLSidebar } from './components/sidebar/DDLSidebar'
export type { DDLSidebarProps } from './components/sidebar/DDLSidebar'

export { DDLSplitLine } from './components/splitLine/DDLSplitLine'
export type { DDLSplitLineProps } from './components/splitLine/DDLSplitLine'

export { LoginModal } from './components/nuwa-login-ui/LoginModal'

export { DDLPay } from './components/pay/DDLPay'
export type { DDLPayProps } from './components/pay/DDLPay'

export function setBaseUrl(url: string) {
  DDLUrl.setBaseUrl(url)
}

export * from './utils/constant'
export * from './utils/auth'
