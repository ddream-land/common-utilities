import './i18n'
import './index.scss'
import DDLUrl from './utils/url'

// suppressHydrationWarning

export { DDLSidebar } from './components/sidebar/DDLSidebar'
export type { DDLSidebarProps } from './components/sidebar/DDLSidebar'

export { DDLSplitLine } from './components/splitLine/DDLSplitLine'
export type { DDLSplitLineProps } from './components/splitLine/DDLSplitLine'

export { LoginModal } from './components/nuwa-login-ui/LoginModal'
export type { LoginModalProps } from './components/nuwa-login-ui/LoginModal'
export {
  LoginContextProvider,
  useLoginDispatch,
} from './components/nuwa-login-ui/LoginContextProvider'

export { QuickCreateDigitalLifeModal } from './components/quick-create-digital-life/QuickCreateDigitalLifeModal'
export type { QuickCreateDigitalLifeModalProps } from './components/quick-create-digital-life/QuickCreateDigitalLifeModal'

export { DDLPay } from './components/pay/DDLPay'
export type { DDLPayProps } from './components/pay/DDLPay'

export { DigitalLifeStoreModal } from './components/digital-life-store/DigitalLifeStoreModal'
export type { DigitalLifeStoreModalProps } from './components/digital-life-store/DigitalLifeStoreModal'

export function setBaseUrl(url: string) {
  DDLUrl.setBaseUrl(url)
}

export { BalanceType } from './utils/BalanceType'

export * from './utils/constant'
import Auth from './utils/auth'

export { Auth }
