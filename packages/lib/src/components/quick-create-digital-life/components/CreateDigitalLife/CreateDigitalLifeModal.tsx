"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ScrollShadow,
  useDisclosure,
} from "@nextui-org/react";
import CreateDigitalLifeForm from "./CreateDigitalLifeForm";
import { charaGenerateDataType } from "../../definitions";
import { PlayBtnContextProvider } from "../../../voice-preview/PlayButtonContextProvider";

export function CreateDigitalLifeModal({
  variant,
  avatarMax,
  voiceMax,
  isOpen = false,
  charaGenerateData,
  onClose,
  onSuccess,
  onPrevious
}: {
  variant: 'custom' | 'default'
  avatarMax: number,
  voiceMax: number,
  isOpen?: boolean;
  charaGenerateData: charaGenerateDataType | undefined
  onClose?: () => void
  onSuccess: (response: any) => void
  onPrevious: () => void
}) {
  const msgModal = useDisclosure({ isOpen: isOpen });

  return (
    <Modal
      isOpen={msgModal.isOpen}
      onClose={() => {
        onClose && onClose();
      }}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton={false}
      classNames={{
        wrapper: "",
        base: "h-5/6 w-5/6 pt-[58px] bg-transparent rounded-2xl shadow-none overflow-hidden relative",
        body: " bg-neutral-900 rounded-2xl",
        closeButton: "right-4 top-6 absolute"
      }}
      placement="center"
      scrollBehavior="inside"
      size="full"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <PlayBtnContextProvider>
                {/* <CreateDigitalLifeResult /> */}
                <ScrollShadow hideScrollBar className="w-full h-full">
                  <CreateDigitalLifeForm variant={variant} avatarMax={avatarMax} voiceMax={voiceMax} charaGenerateData={charaGenerateData} onPrevious={onPrevious} onSuccess={(response) => onSuccess && onSuccess(response)} />
                </ScrollShadow>
              </PlayBtnContextProvider>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
