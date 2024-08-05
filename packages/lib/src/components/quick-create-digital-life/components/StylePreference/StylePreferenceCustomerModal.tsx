"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { cloneDeep, trim } from "lodash-es";
import { useLabels } from "../../context/LabelsContext";
import { personalityDataType } from "../../definitions";

function StylePreferenceCustomerModal({
  isOpen,
  name = "",
  index = -1,
  personalityDataList,
  usePersonalityDataList,
  onClose,
}: {
  isOpen: boolean;
  name: string,
  index: number,
  personalityDataList: Array<personalityDataType>,
  usePersonalityDataList: (value: Array<personalityDataType>) => void,
  onClose: () => void,
}) {

  const labels = useLabels();
  const plistModal = useDisclosure({ isOpen: isOpen });
  const msgModal = useDisclosure();

  const [pListName, usePListName] = useState(name);
  const [pListIndex, usePListIndex] = useState(index);
  const [pListProps, usePListProps] = useState("");
  const [errorMessage, useErrorMessage] = useState("");

  useEffect(() => {
    usePListName(name);
    usePListIndex(index);
  }, [name, index]);

  const handleModalOnClose = () => {
    onClose()

    usePListName(name);
    usePListIndex(index);
    usePListProps("");
  };

  const insertCustomerPlist = () => {
    if (trim(pListName) === "" || trim(pListProps) === "") {
      useErrorMessage(labels.StylePreference.errorMessage);
      msgModal.onOpen();
      return;
    }
    let newValue = cloneDeep(personalityDataList);

    if (pListIndex >= 0) {
      newValue[pListIndex].list = newValue[pListIndex].list.concat([
        {
          name: "customerCategory",
          isCustomer: true,
          list: pListProps.split(",").map((item) => {
            return {
              name: item,
              selected: true,
            };
          }),
        },
      ]);
    } else {
      newValue = personalityDataList.concat([
        {
          name: pListName,
          isCustomer: true,
          list: [
            {
              name: "customerCategory",
              isCustomer: true,
              list: pListProps.split(",").map((item) => {
                return {
                  name: item,
                  selected: true,
                };
              }),
            },
          ],
        },
      ]);
    }

    usePersonalityDataList(newValue);

    handleModalOnClose();
  };

  return (
    <div className="flex flex-col">
      <Modal
        placement={"top"}
        isOpen={msgModal.isOpen}
        onOpenChange={msgModal.onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>{errorMessage}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={plistModal.isOpen}
        onOpenChange={plistModal.onOpenChange}
        placement="top-center"
        className="rounded-[30px]"
        size="lg"
        hideCloseButton={true}
        classNames={{
          body: "pt-[30px] pb-[58px] px-0",
          base: "p-[34px]",
          header: "p-0",
          footer: "p-0",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="">
                <div className="text-white text-2xl font-bold font-['Roboto'] leading-normal">{labels.StylePreference.customTitle}</div>
              </ModalHeader>
              <ModalBody>
                <div className="gap-5 flex flex-col">
                  <Input
                    autoFocus
                    className="w-full"
                    label={labels.StylePreference.category}
                    placeholder={labels.StylePreference.categoryPlaceholder}
                    isDisabled={pListIndex >= 0}
                    labelPlacement="outside"
                    size="lg"
                    classNames={{
                      label: "group[data-filled-within=true]:text-[#9F9FAA] group-data-[filled-within=true]:text-[#9F9FAA]",
                    }}
                    variant="bordered"
                    value={pListName}
                    onChange={(e) => {
                      usePListName(e.target.value);
                    }}
                  />
                  <Input
                    className="w-full"
                    label={labels.StylePreference.attribute}
                    placeholder={labels.StylePreference.attributePlaceholder}
                    labelPlacement="outside"
                    size="lg"
                    classNames={{
                      label: "group[data-filled-within=true]:text-[#9F9FAA] group-data-[filled-within=true]:text-[#9F9FAA]",
                    }}
                    variant="bordered"
                    value={pListProps}
                    onChange={(e) => {
                      usePListProps(e.target.value);
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex flex-row gap-4">
                  <Button
                    className="w-[140px]"
                    color="default"
                    size="lg"
                    variant="ghost"
                    onPress={handleModalOnClose}
                  >
                    {labels.StylePreference.btnCancel}
                  </Button>
                  <Button
                    className="w-[140px]"
                    color="primary"
                    size="lg"
                    onPress={insertCustomerPlist}
                  >
                    {labels.StylePreference.btnAdd}
                  </Button>
                </div>
                
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default StylePreferenceCustomerModal;
