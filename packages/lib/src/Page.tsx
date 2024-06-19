import { useState } from 'react'
import { DDLPay } from './components/pay/DDLPay'
import { NextUIProvider } from '@nextui-org/system'
import { useDisclosure } from '@nextui-org/react'

function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure({ defaultOpen: true })

  return (
    <NextUIProvider className="w-full h-full">
      <div className="w-full h-full bg-white">
        <div className="bg-white" onClick={() => onOpen()}>
          Switch Open
        </div>
        {/* <DDLPay></DDLPay> */}
        <DDLPay isOpen={isOpen} onOpenChange={onOpenChange} lang="zh-CN"></DDLPay>
      </div>
    </NextUIProvider>
  )
}

export { Page }
