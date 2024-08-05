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
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { LabelsContextProvider } from './context/LabelsContext'
import { LocaleContext } from './context/LocaleContext'
import { getI18n } from '../../utils/base.api'


export type LoginModalProps = {
  isOpen?: boolean
  openPage?: 'login' | 'register' | 'resetPassword' | 'deleteUser'
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
  isOpen = false,
  openPage = 'login',
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
  const [page, setPage] = useState(openPage)
  const [isBack, setIsBack] = useState(false)
  const defaultLocale = getI18n();

  useEffect(() => {
    if (isOpen) {
      setPage(openPage)
    }
  }, [isOpen])

  useEffect(() => {
    setPage(openPage)
  }, [openPage])

  return (
    <NextUIProvider>
      <LocaleContext.Provider value={locale || defaultLocale}>
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
                        <div className="bg-black w-[360px] h-[670px] px-6 py-10 rounded-3xl relative border-[#898989] border border-solid">
                          {isBack && (
                            <Button
                              isIconOnly
                              className={`absolute left-2 top-2`}
                              size="md"
                              variant="light"
                              onPress={() => {
                                setPage('login')
                                setIsBack(false)
                              }}
                            >
                              <ArrowLeftIcon className="h-6 w-6 text-white fill-white" />
                            </Button>
                          )}

                          {isCloseable && (
                            <Button
                              isIconOnly
                              className="absolute right-2 top-2"
                              size="md"
                              variant="light"
                              onPress={() => {
                                onClose && onClose()
                              }}
                            >
                              <XMarkIcon className="h-6 w-6 text-white fill-white" />
                            </Button>
                          )}

                          <div className={`${page === 'login' ? 'block' : 'hidden'} w-full h-full`}>
                            <Login
                              onLogin={onLogin}
                              gotoRegister={() => {
                                setIsBack(true)
                                setPage('register')
                              }}
                              gotoResetPassword={() => {
                                setIsBack(true)
                                setPage('resetPassword')
                              }}
                            />
                          </div>
                          <div
                            className={`${page === 'register' ? 'block' : 'hidden'} w-full h-full`}
                          >
                            <Register
                              gotoLogin={() => {
                                setIsBack(false)
                                setPage('login')
                              }}
                              onRegister={() => {
                                if (onRegister) {
                                  onRegister()
                                } else {
                                  // setPage('login')
                                  onLogin && onLogin()
                                }
                              }}
                            />
                          </div>
                          <div
                            className={`${
                              page === 'resetPassword' ? 'block' : 'hidden'
                            } w-full h-full`}
                          >
                            <ResetPassword
                              onResetPassword={() => {
                                if (onResetPassword) {
                                  onResetPassword()
                                } else {
                                  setPage('login')
                                }
                              }}
                            />
                          </div>
                          <div
                            className={`${
                              page === 'deleteUser' ? 'block' : 'hidden'
                            } w-full h-full`}
                          >
                            <DeleteUser
                              onDeleteUser={() => {
                                if (onDeleteUser) {
                                  onDeleteUser()
                                } else {
                                  setPage('login')
                                }
                              }}
                            />
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
      </LocaleContext.Provider>
    </NextUIProvider>
  )
}
