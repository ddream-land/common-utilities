import { FC } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { DigitalLifeDetailType } from "../../../utils/definitions.digitallife";
import DigitalLifeAvatar from "../../../icons/DigitalLifeAvatar";
import DefaultNuwaAvatarBase64 from "../../../images/default-nuwa-avatar";
import { useLabels } from "../../../context/LabelsContext";

interface DigitalLifeAvatarPreviewProps {
  digitalLifePublicInfo: DigitalLifeDetailType;
}

const DigitalLifeAvatarPreview: FC<DigitalLifeAvatarPreviewProps> = ({ digitalLifePublicInfo }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const labels = useLabels();

  return (
    <>
      <div className="flex items-center justify-between gap-2 ">
        <div className="flex flex-grow items-center justify-start bg-[#3F3F46] px-[18px] py-5 gap-4 rounded-lg">
          <DigitalLifeAvatar className="w-6 h-6" />
          <div className="#EEEFF1 font-normal text-base text-wrap flex justify-start">
            <span>{digitalLifePublicInfo.spec}</span>
            {/* <span className="ml-1">ver.{digitalLifePublicInfo.spec_version}</span> */}
            <span className="ml-1">ver.{digitalLifePublicInfo.data.extensions?.nuwa_avatars?.version ?? "1.0"}</span>
          </div>
        </div>

        <Button onPress={onOpen} className="bg-[#3F3F46] max-w-fit h-full rounded-lg px-3 py-5">
          <span className="text-white text-base font-medium">{labels.DigitalLifeStore.preview}</span>
        </Button>
        <Modal
          isOpen={isOpen}
          placement={"top-center"}
          className="bg-transparent rounded-none  -translate-y-2/4"
          size="sm"
          hideCloseButton
          onOpenChange={onOpenChange}
        >
          <ModalContent className="w-[522px]">
            {(onClose) => (
              <>
                {/* <ModalHeader className="flex justify-center items-center ">
                  <span className="text-white font-medium text-lg">Live 2D Avtar</span>
                </ModalHeader> */}
                <ModalBody className=" flex flex-col items-center justify-center p-8">
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

                  <span className="text-xl font-semibold text-white animate-pulse mt-3">
                    {labels.DigitalLifeStore.comeSoon}
                  </span>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default DigitalLifeAvatarPreview;
