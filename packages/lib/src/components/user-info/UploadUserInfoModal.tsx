'use client'

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  NextUIProvider,
  useDisclosure,
} from '@nextui-org/react'
import { MouseEvent, useEffect, useState } from 'react'
import { LabelsContextProvider, useLabels } from './context/LabelsContext'
import { LocaleContext } from './context/LocaleContext'
import { AlterMessageContextProvider } from '../alter-message/AlterMessageContextProvider'
import { UploadUserInfoForm } from './components/UploadUserInfoForm'


export type UploadUserInfoModalProps = {
  isOpen?: boolean
  locale?: 'en' | 'zh-CN'
  onClose?: () => void
  onSuccess?: () => void,
  onMouseEnter?: (e: MouseEvent) => void
  onMouseOver?: (e: MouseEvent) => void
  onMouseLeave?: (e: MouseEvent) => void
}

export function UploadUserInfoModal({
  isOpen = false,
  locale = 'en',
  onClose,
  onSuccess,
  onMouseEnter,
  onMouseOver,
  onMouseLeave,
}: UploadUserInfoModalProps) {
  const msgModal = useDisclosure({ isOpen: isOpen })
  const labels = useLabels();

  return (
    <NextUIProvider>
      <LocaleContext.Provider value={locale}>
        <LabelsContextProvider locale={locale}>
          <AlterMessageContextProvider>
            <div className="dark">
              <Modal
                size='5xl'
                isDismissable={false}
                isOpen={msgModal.isOpen}
                onClose={() => {
                  onClose && onClose()
                }}
                hideCloseButton={true}
                classNames={{
                  wrapper: '',
                  base: 'bg-transparent shadow-none w-[600px] h-[600px]',
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
                        <UploadUserInfoForm onSuccess={() => {
                          onSuccess && onSuccess()
                          onClose && onClose()
                        }} />
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
