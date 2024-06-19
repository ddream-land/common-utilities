import { useEffect, useState } from 'react'
import { DDLPay } from './components/pay/DDLPay'
import { NextUIProvider } from '@nextui-org/react'
import { useDisclosure } from '@nextui-org/react'
import { http } from './utils/http'

function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure({ defaultOpen: false })

  return (
    <NextUIProvider className="w-full h-full">
      <div className="w-full h-full bg-white">
        <div className="bg-white" onClick={() => onOpen()}>
          Switch Open
        </div>
        {/* <DDLPay></DDLPay> */}
        <DDLPay isOpen={isOpen} onOpenChange={onOpenChange}></DDLPay>
      </div>
    </NextUIProvider>
  )
}

export { Page }
