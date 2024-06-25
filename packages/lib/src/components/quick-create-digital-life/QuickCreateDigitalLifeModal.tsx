"use client";

import { NextUIProvider, useDisclosure } from "@nextui-org/react";
import { LocaleContext } from "./context/LocaleContext";
import { LabelsContextProvider } from "./context/LabelsContext";
import { AlterContextProvider } from "./components/Alter/AlterContextProvider";
import { CreateDigitalLifeModal } from "./components/CreateDigitalLife/CreateDigitalLifeModal";
import { useState } from "react";
import StylePreferenceModal from "./components/StylePreference/StylePreferenceModal";

export function QuickCreateDigitalLifeModal(
  {
  isOpen = false, 
  locale = 'en',
  onClose, 
  onDone,
}:
  {
    isOpen?: boolean, 
    locale?: 'en' | 'zh-CN',
    onClose?: () => void,
    onDone?: () => void,
  }) {

  const [keys, setKeys] = useState<string>('');

  return (
    <NextUIProvider>
      <LocaleContext.Provider value={locale}>
        <LabelsContextProvider locale={locale}>
          <AlterContextProvider>
            <div className="drak">
              {/* <StylePreferenceModal
                onChange={(newValues) => {
                  setKeys(newValues)
                }}
                keys={keys}
                isOpen={true}
              /> */}
              <CreateDigitalLifeModal isOpen={isOpen} />
            </div>
          </AlterContextProvider>
        </LabelsContextProvider>
      </LocaleContext.Provider>
    </NextUIProvider>
  );
}
