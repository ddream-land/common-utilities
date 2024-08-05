"use client";

import { NextUIProvider, useDisclosure } from "@nextui-org/react";
import { LocaleContext } from "./context/LocaleContext";
import { LabelsContextProvider } from "./context/LabelsContext";
import { AlterMessageContextProvider } from '../alter-message/AlterMessageContextProvider'
import { CreateDigitalLifeModal } from "./components/CreateDigitalLife/CreateDigitalLifeModal";
import { useEffect, useState } from "react";
import StylePreferenceModal from "./components/StylePreference/StylePreferenceModal";
import { charaGenerateDataType } from "./definitions";

export type QuickCreateDigitalLifeModalProps = {
  isOpen?: boolean, 
  variant?: 'custom' | 'default'
  locale?: 'en' | 'zh-CN',
  avatarMax?: number,
  voiceMax?: number,
  onClose?: () => void,
  onSuccess?: (response: any) => void
}

export function QuickCreateDigitalLifeModal({
  isOpen = false,
  variant = 'default',
  locale = 'en',
  avatarMax = 3,
  voiceMax = 3,
  onClose, 
  onSuccess,
}: QuickCreateDigitalLifeModalProps) {

  const defaultPage = variant === 'default' ? 'StylePreference' : 'CreateDigitalLife'
  const [page, setPage] = useState<'StylePreference'| 'CreateDigitalLife'>(defaultPage);
  const [charaGenerateData, setCharaGenerateData] = useState<charaGenerateDataType>();


  useEffect(() => {
    if (!isOpen) {
      setPage(defaultPage)
      setCharaGenerateData(undefined)
    }
  }, [isOpen])

  return (
    <NextUIProvider>
      <div className="dark  text-foreground bg-background">
      <LocaleContext.Provider value={locale}>
        <LabelsContextProvider locale={locale}>
          <AlterMessageContextProvider>
            {isOpen && (
              <>
                <StylePreferenceModal
                  onClose={() => {
                    onClose && onClose();
                  }}
                  isOpen={isOpen && page === 'StylePreference'}
                  onSuccess={(charaGenerateData) => {
                    setCharaGenerateData(charaGenerateData)
                    setPage('CreateDigitalLife')
                  }}
                />
                <CreateDigitalLifeModal
                  avatarMax={avatarMax}
                  voiceMax={voiceMax}
                  isOpen={isOpen && page === 'CreateDigitalLife'}
                  onPrevious= {() => {
                    setPage('StylePreference')
                    setCharaGenerateData(undefined)
                  }}
                  variant={variant}
                  charaGenerateData={charaGenerateData}
                  onSuccess={(response) => {
                    onSuccess && onSuccess(response);
                    onClose && onClose();
                  }}
                  onClose={() => {
                    onClose && onClose();
                  }}
                />
              </>
            )}
          </AlterMessageContextProvider>
        </LabelsContextProvider>
      </LocaleContext.Provider>
      </div>
    </NextUIProvider>
  );
}
