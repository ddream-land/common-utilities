"use client";
import  { useEffect, useState } from "react";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";

function AlterMessage({message, isOpen = false, onClose}: {message: string, isOpen?: boolean, onClose: () => void }) {
  let [messsages, setMessages] = useState<string[]>([message]);

  const msgModal = useDisclosure();
  useEffect(() => {
    if(isOpen) {
      msgModal.onOpen();
    } else {
      msgModal.onClose();
      setMessages([]);
    }
  }, [isOpen])
  return ( 
    <Modal
      placement={"top"}
      backdrop="blur"
      isOpen={msgModal.isOpen}
      onClose={onClose}
      hideCloseButton={true}
      classNames={{
        wrapper: "z-[9999999]",
        body: "bg-transparent",
        base: "bg-transparent",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <div className="flex flex-col gap-3">
                {messsages.map((msg, index) => (
                  <div key={index} className="w-full h-14 bg-white bg-opacity-20 rounded-[20px] flex justify-center items-center">
                    <div className="text-white text-sm font-bold">{msg}</div>
                  </div>
                ))}
              </div>
              
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AlterMessage;
