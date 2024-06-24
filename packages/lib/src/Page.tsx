import { DDLPay } from './components/pay/DDLPay'
import { useDisclosure } from '@nextui-org/react'
import { DDLSidebar } from './components/sidebar/DDLSidebar'

function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure({ defaultOpen: false })

  return (
    <div className="w-full h-full bg-white">
      <DDLSidebar title={{ name: '123' }}></DDLSidebar>
      <div className="bg-white text-black" onClick={() => onOpen()}>
        Pay
      </div>
      <DDLPay
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onPaymentComplete={() => {
          console.log('payment complete')
        }}
        lang="zh-CN"
      ></DDLPay>
    </div>
  )
}

export { Page }
