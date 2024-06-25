"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import CreateDigitalLifeForm from "./CreateDigitalLifeForm";
import TwoCircleLoading from '../../lottiefiles/TwoCircleLoading.json';
import InfinityLoaderanimated from '../../lottiefiles/InfinityLoaderanimated.json';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import CreateDigitalLifeResult from "./CreateDigitalLifeResult";

export function CreateDigitalLifeModal({
  isOpen = false,
  onClose,
  onDone,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  onDone?: () => void;
}) {
  const msgModal = useDisclosure({ isOpen: isOpen });

  return (
    <Modal
      isOpen={msgModal.isOpen}
      onClose={() => {
        onClose && onClose();
      }}
      hideCloseButton={false}
      classNames={{
        wrapper: "",
        base: "h-5/6 pt-[58px] bg-black/50 rounded-2xl shadow-none overflow-hidden relative",
        body: " bg-neutral-900",
        closeButton: "right-4 top-6 absolute"
      }}
      placement="center"
      scrollBehavior="inside"
      size="5xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              {/* <CreateDigitalLifeResult /> */}
              <CreateDigitalLifeForm />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
