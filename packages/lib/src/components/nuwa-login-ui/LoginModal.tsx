'use client'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  NextUIProvider,
  useDisclosure,
} from '@nextui-org/react'
import Login from './components/login/Login'
import { AlterMessageContextProvider } from '../alter-message/AlterMessageContextProvider'
import { MouseEvent, useEffect, useState } from 'react'
import Register from './components/register/Register'
import ResetPassword from './components/resetPassword/ResetPassword'
import DeleteUser from './components/deleteUser/DeleteUser'
import { LabelsContextProvider } from './context/LabelsContext'
import { LocaleContextProvider } from './context/LocaleContext'
import { LoginHeaderButtons } from './components/LoginHeaderButtons'


export type LoginModalProps = {
  inviter?: number | undefined
  channel?: string | undefined
  isOpen?: boolean
  openPage?: 'login' | 'register' | 'resetPassword' | 'deleteUser'
  defaultLoginType?: 'phone' | 'email'
  canSwitchLoginType?: boolean
  locale?: 'en' | 'zh-CN'
  isCloseable?: boolean
  onClose?: () => void
  onLogin?: () => void
  onRegister?: () => void
  onResetPassword?: () => void
  onDeleteUser?: () => void
  onMouseEnter?: (e: MouseEvent) => void
  onMouseOver?: (e: MouseEvent) => void
  onMouseLeave?: (e: MouseEvent) => void
}

export function LoginModal({
  inviter,
  channel,
  isOpen = false,
  openPage = 'login',
  defaultLoginType = 'email',
  canSwitchLoginType = true,
  locale,
  isCloseable = true,
  onClose,
  onLogin,
  onRegister,
  onResetPassword,
  onDeleteUser,
  onMouseEnter,
  onMouseOver,
  onMouseLeave,
}: LoginModalProps) {
  const msgModal = useDisclosure({ isOpen: isOpen })
  const [routerHistory, setRouterHistory] = useState<string[]>([openPage])
  const defaultLocale = 'zh-CN'

  const goBack = () => {
    if (routerHistory.length > 0) {
      setRouterHistory(routerHistory.slice(0, -1))
    }
  }

  useEffect(() => {
    if (isOpen) {
      setRouterHistory([openPage])
    }
  }, [isOpen])

  useEffect(() => {
    setRouterHistory([openPage])
  }, [openPage])

  return (
    <NextUIProvider>
      <LocaleContextProvider locale={locale || defaultLocale}>
        <LabelsContextProvider locale={locale || defaultLocale}>
          <AlterMessageContextProvider>
            <div className="dark">
              <Modal
                isDismissable={isCloseable}
                isOpen={msgModal.isOpen}
                onClose={() => {
                  onClose && onClose()
                }}
                hideCloseButton={true}
                classNames={{
                  wrapper: '',
                  base: 'bg-transparent shadow-none w-[360px]',
                  body: 'p-0 m-0',
                }}
                onMouseEnter={(e) => {
                  onMouseEnter && onMouseEnter(e)
                }}
                onMouseOver={(e) => {
                  onMouseOver && onMouseOver(e)
                }}
                onMouseLeave={(e) => {
                  onMouseLeave && onMouseLeave(e)
                }}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalBody>
                        <div className="bg-[#191919] w-[360px] h-[640px] rounded-[48px] relative border-[#898989] border border-solid overflow-hidden">
                          <LoginHeaderButtons
                            canGoBack={routerHistory.length > 1}
                            onGoBack={goBack}
                            isCloseable={isCloseable}
                            onClose={onClose}
                          />

                          <div className={`${routerHistory[routerHistory.length - 1] === 'login' ? 'block' : 'hidden'} w-full h-full`}>
                            <Login
                              onLogin={onLogin}
                              defaultLoginType={defaultLoginType}
                              canSwitchLoginType={canSwitchLoginType}
                              gotoRegister={() => {
                                setRouterHistory([
                                  ...routerHistory,
                                  'register'
                                ])
                              }}
                              gotoResetPassword={() => {
                                setRouterHistory([
                                  ...routerHistory,
                                  'resetPassword'
                                ])
                              }}
                              isCloseable={isCloseable}
                              onClose={onClose}
                            />
                          </div>
                          <div
                            className={`${routerHistory[routerHistory.length - 1] === 'register' ? 'block' : 'hidden'} w-full h-full`}
                          >
                            <Register
                              variant="register"
                              defaultLoginType={defaultLoginType}
                              canSwitchLoginType={canSwitchLoginType}
                              inviter={inviter}
                              channel={channel}
                              gotoLogin={() => {
                                if (routerHistory[routerHistory.length - 2] === 'login') {
                                  goBack()
                                } else {
                                  setRouterHistory([
                                    ...routerHistory,
                                    'login'
                                  ])
                                }
                              }}
                              onDone={() => {
                                if (onRegister) {
                                  onRegister()
                                } else {
                                  // setPage('login')
                                  onLogin && onLogin()
                                }
                              }}
                              isCloseable={isCloseable}
                              onClose={onClose}
                            />
                          </div>
                          <div
                            className={`${
                              routerHistory[routerHistory.length - 1] === 'resetPassword' ? 'block' : 'hidden'
                            } w-full h-full`}
                          >
                            <Register
                              variant="resetPassword"
                              defaultLoginType={defaultLoginType}
                              canSwitchLoginType={canSwitchLoginType}
                              onDone={() => {
                                if (onResetPassword) {
                                  onResetPassword()
                                } else {
                                  setRouterHistory(['login'])
                                }
                              }}
                              isCloseable={isCloseable}
                              onClose={onClose}
                            />
                            {/* <ResetPassword
                              onResetPassword={() => {
                                if (onResetPassword) {
                                  onResetPassword()
                                } else {
                                  setRouterHistory(['login'])
                                }
                              }}
                            /> */}
                          </div>
                          <div
                            className={`${
                              routerHistory[routerHistory.length - 1] === 'deleteUser' ? 'block' : 'hidden'
                            } w-full h-full`}
                          >

                            <Register
                              variant="deleteUser"
                              defaultLoginType={defaultLoginType}
                              canSwitchLoginType={canSwitchLoginType}
                              onDone={() => {
                                if (onDeleteUser) {
                                  onDeleteUser()
                                } else {
                                  setRouterHistory(['login'])
                                }
                              }}
                              isCloseable={isCloseable}
                              onClose={onClose}
                            />
                            {/* <DeleteUser
                              onDeleteUser={() => {
                                if (onDeleteUser) {
                                  onDeleteUser()
                                } else {
                                  setRouterHistory(['login'])
                                }
                              }}
                            /> */}
                          </div>
                        </div>
                      </ModalBody>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </AlterMessageContextProvider>
        </LabelsContextProvider>
      </LocaleContextProvider>
    </NextUIProvider>
  )
}
