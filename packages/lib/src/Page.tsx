import { DDLPay } from './components/pay/DDLPay'
import { Button, useDisclosure } from '@nextui-org/react'
import { QuickCreateDigitalLifeModal } from './components/quick-create-digital-life/QuickCreateDigitalLifeModal'
import {
  LoginContextProvider,
  useLoginDispatch,
} from './components/nuwa-login-ui/LoginContextProvider'
import { LoginPage } from './LoginPage'
import { DDLSidebar } from './components/sidebar/DDLSidebar'
import { useState } from 'react'
import { UploadUserInfoModal } from './components/user-info/UploadUserInfoModal'
import { DigitalLifeStoreModal } from './components/digital-life-store/DigitalLifeStoreModal'
import { BalanceType } from './utils/BalanceType'
import DDLUrl from './utils/url'

function Page() {
  // DDLUrl.setBaseUrl('https://test-service.ddream.land')
  DDLUrl.setBaseUrl('https://test-srv.saga.nirvanaworld.cn')
  const { isOpen, onOpen, onOpenChange } = useDisclosure({ defaultOpen: false })
  const [ocQuickCreateOpen, setOcQuickCreateOpen] = useState(false)
  const [ocQuickCreateOpenCustom, setOcQuickCreateOpenCustom] = useState(false)
  const [userInfoOpen, setUserInfoOpen] = useState(false)
  const {
    isOpen: squareModalIsOpen,
    onOpen: openSquareModal,
    onClose: closeSquareModal,
  } = useDisclosure()

  return (
    <LoginContextProvider>
      <div className="w-full h-full bg-white">
        <div className="p-10 flex flex-row gap-2 justify-start items-center">
          <LoginPage />
          <Button color="primary" size="lg" onPress={() => setOcQuickCreateOpen(true)}>
            oc quick create
          </Button>
          <Button color="primary" size="lg" onPress={() => setOcQuickCreateOpenCustom(true)}>
            oc quick create cutome
          </Button>
          <Button color="primary" size="lg" onPress={() => setUserInfoOpen(true)}>
            user info
          </Button>
          <Button color="primary" size="lg" onPress={() => openSquareModal()}>
            digital life store open
          </Button>
          <UploadUserInfoModal
            isOpen={userInfoOpen}
            onClose={() => {
              setUserInfoOpen(false)
            }}
            onSuccess={() => {}}
            locale="en"
          />

          {/* <div className="w-[500px] h-full">
            <DDLSidebar title={{ name: 'Role AI' }}></DDLSidebar>
          </div> */}
          <UploadUserInfoModal
            isOpen={userInfoOpen}
            onClose={() => {
              setUserInfoOpen(false)
            }}
            onSuccess={() => {}}
            locale="en"
          />

          {/* <div className="w-[500px] h-full">
          <DDLSidebar title={{ name: 'Role AI' }}></DDLSidebar>
        </div> */}

          <Button color="primary" size="lg" onPress={() => onOpen()}>
            Pay
          </Button>
          <DDLPay
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onPaymentComplete={() => {
              console.log('payment complete')
            }}
            lang="zh-CN"
            balanceType={BalanceType.Power}
          ></DDLPay>

          <QuickCreateDigitalLifeModal
            isOpen={ocQuickCreateOpen}
            onClose={() => {
              setOcQuickCreateOpen(false)
            }}
            onSuccess={(res) => {
              console.log(res)
            }}
            locale="zh-CN"
          />

          <QuickCreateDigitalLifeModal
            isOpen={ocQuickCreateOpenCustom}
            onClose={() => {
              setOcQuickCreateOpenCustom(false)
            }}
            onSuccess={(res) => {
              console.log(res)
            }}
            variant="custom"
            locale="zh-CN"
          />

          <DigitalLifeStoreModal
            // locale="en"
            locale="zh-CN"
            isOpen={squareModalIsOpen}
            onClose={closeSquareModal}
            onRunAISuccess={(id, isSuccess) => {
              if (isSuccess) {
                console.log(id, isSuccess)
                closeSquareModal()
              } else {
                console.log('failToRun', id, isSuccess)
              }
            }}
          />
        </div>
      </div>
    </LoginContextProvider>
  )
}

export { Page }
