import { NextUIProvider } from '@nextui-org/react'
import { SupportLangs } from '../../types/SupportLangs'
import { BalanceType } from '../../utils/BalanceType'
import { AlterMessageContextProvider } from '../alter-message/AlterMessageContextProvider'
import { Pay } from './Pay'

export type DDLPayProps = Readonly<{
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onPaymentComplete?: () => void
  lang?: SupportLangs
  balanceType?: BalanceType
  onNotHaveEnoughDDreamToken?: () => void
}>

function DDLPay({
  isOpen,
  onOpenChange,
  onPaymentComplete,
  lang,
  balanceType,
  onNotHaveEnoughDDreamToken,
}: DDLPayProps) {
  return (
    <NextUIProvider>
      <AlterMessageContextProvider>
        <Pay
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onPaymentComplete={onPaymentComplete}
          lang={lang}
          balanceType={balanceType}
          onNotHaveEnoughDDreamToken={onNotHaveEnoughDDreamToken}
        ></Pay>
      </AlterMessageContextProvider>
    </NextUIProvider>
  )
}

export { DDLPay }
