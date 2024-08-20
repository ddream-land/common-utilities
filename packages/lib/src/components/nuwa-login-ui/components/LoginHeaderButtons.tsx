'use client'

import {
  Button
} from '@nextui-org/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'


export type LoginHeaderButtonsProps = {
  canGoBack: boolean,
  onGoBack?: () => void,
  isCloseable?: boolean
  onClose?: () => void
}

export function LoginHeaderButtons({
  canGoBack = false,
  onGoBack,
  isCloseable = true,
  onClose,
}: LoginHeaderButtonsProps) {

  return (
    <>
      {canGoBack && (
        <Button
          isIconOnly
          className='absolute left-4 top-6 z-10'
          size="md"
          variant="light"
          onPress={() => {
            onGoBack && onGoBack();
          }}
        >
          <ChevronLeftIcon className="h-6 w-6 text-white fill-white" />
        </Button>
      )}

      {isCloseable && (
        <Button
          isIconOnly
          className='absolute right-4 top-6 z-10'
          size="md"
          variant="light"
          onPress={() => {
            onClose && onClose()
          }}
        >
          <XMarkIcon className="h-6 w-6 text-white fill-white" />
        </Button>
      )}
    </>
  )
}
