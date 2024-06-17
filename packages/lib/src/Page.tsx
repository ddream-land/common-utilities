import { useState } from 'react'
import { DDLPay } from './components/pay/DDLPay'
import { NextUIProvider } from '@nextui-org/system'

function Page() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <NextUIProvider>
      <div className="w-full h-full">
        <div className="bg-gray-500" onClick={() => setIsOpen(!isOpen)}>
          Switch Open
        </div>
        {/* <DDLPay></DDLPay> */}
        <DDLPay isOpen={isOpen}></DDLPay>
      </div>
    </NextUIProvider>
  )
}

export { Page }
