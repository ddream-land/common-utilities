"use client";

import { cn, Modal, ModalBody, ModalContent, NextUIProvider, useDisclosure } from "@nextui-org/react";
import { LocaleContext } from "./context/LocaleContext";
import { LabelsContextProvider } from "./context/LabelsContext";
// import { AlterMessageContextProvider } from "./components/Alter/AlterMessageContextProvider";

import { AlterMessageContextProvider } from "../alter-message/AlterMessageContextProvider";
import { DigitalLifeStore } from "./DigitalLifeStore";
import DigitalLifeDetailDrawerModal from "./components/digital-life-assets/digital-life-detail/DigitalLifeDetailDrawerModal";
import { useState } from "react";
import { SearchDigitalLifeModal } from "./SearchDigitalLifeModal";

export type DigitalLifeStoreModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  locale?: "en" | "zh-CN";
  onRunAISuccess?: (id: string, isSuccess: boolean) => void;
};

export function DigitalLifeStoreModal({
  isOpen = false,
  locale = "zh-CN",
  onClose,
  onRunAISuccess,
}: DigitalLifeStoreModalProps) {
  const dlModal = useDisclosure({ isOpen: isOpen });

  return (
    <NextUIProvider>
      <div className="dark  text-foreground bg-background">
        <LocaleContext.Provider value={locale}>
          <LabelsContextProvider locale={locale}>
            <AlterMessageContextProvider>
              <Modal
                isOpen={dlModal.isOpen}
                // onOpenChange={dlModal.onOpenChange}
                onClose={() => {
                  onClose && onClose();
                }}
                hideCloseButton={true}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                }}
                classNames={{
                  base: "w-[80%] h-[80%] max-w-none scrollbar-y-override overflow-y-auto bg-[#15151A]",
                  body: `p-[20px]`,
                }}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalBody>
                        <DigitalLifeStore className="" onRunAISuccess={onRunAISuccess} />
                      </ModalBody>
                    </>
                  )}
                </ModalContent>
              </Modal>

              <SearchDigitalLifeModal onRunAISuccess={onRunAISuccess} />
            </AlterMessageContextProvider>
          </LabelsContextProvider>
        </LocaleContext.Provider>
      </div>
    </NextUIProvider>
  );
}
