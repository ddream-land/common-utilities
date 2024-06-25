import { DDLPay } from './components/pay/DDLPay'
import { useDisclosure } from '@nextui-org/react'
import { QuickCreateDigitalLifeModal } from './components/quick-create-digital-life/QuickCreateDigitalLifeModal'

function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure({ defaultOpen: false })

  return (
    <div className="w-full h-full bg-white">
      {/* <div className="bg-white text-black" onClick={() => onOpen()}>
        Pay
      </div>
      <DDLPay
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onPaymentComplete={() => {
          console.log('payment complete')
        }}
        lang="zh-CN"
      ></DDLPay> */}

      <QuickCreateDigitalLifeModal
        isOpen={true}
        onClose={() => {}}
        locale='zh-CN'
      />
    </div>
  )
}

export { Page }
