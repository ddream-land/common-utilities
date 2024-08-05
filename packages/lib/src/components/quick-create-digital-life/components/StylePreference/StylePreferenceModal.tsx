"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import {
  PlusIcon,
} from "@heroicons/react/24/outline";
import originalPersonalityDataZhCN from "./PersonalityDataZhCN.json";
import originalPersonalityDataEn from "./PersonalityDataEn.json";
import StylePreferenceOcAi from "./StylePreferenceOcAi";
import StylePreference from "./StylePreference";
import StylePreferenceCustomerModal from "./StylePreferenceCustomerModal";
import { useLabels } from "../../context/LabelsContext";
import { useLocale } from "../../context/LocaleContext";
import { charaGenerate } from "../../utils/characters.api";
import { z } from "zod";
import { charaGenerateDataType, personalityDataType } from "../../definitions";

function StylePreferenceModal({
  isOpen = false,
  onClose,
  onSuccess,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess: (charaGenerateData: charaGenerateDataType) => void;
}) {

  const labels = useLabels();
  const locale = useLocale();
  const originalPersonalityData =
    locale === "en" ? originalPersonalityDataEn : originalPersonalityDataZhCN;
  const personalityData = originalPersonalityData.map((item) => {
    return {
      name: item.name,
      isCustomer: false,
      list: item.list.map((item2) => {
        return {
          name: item2.name,
          isCustomer: false,
          list: item2.list.map((item3) => {
            return {
              name: item3,
              selected: false,
            };
          }),
        };
      }),
    };
  }) as Array<personalityDataType>;

  
  const spModal = useDisclosure({ isOpen: isOpen });
  const [personalityDataList, usePersonalityDataList] =
    useState<Array<personalityDataType>>(personalityData);
  const [pListName, usePListName] = useState("");
  const [pListIndex, usePListIndex] = useState(-1);
  const [plistModalIsOpen, usePlistModalIsOpen] = useState(false);

  const handleFruitClick = (index1: number, index2: number, index3: number) => {
    const newPersonalityDataList = personalityDataList.map(
      (category1, category1Index) => {
        // 如果不是目标行，则直接返回原数组
        if (category1Index !== index1) {
          return category1;
        }

        return {
          ...category1,
          list: category1.list.map((category2, category2Index) => {
            // 如果不是目标列，则直接返回原数组
            if (category2Index !== index2) {
              return category2;
            }
            // 更新目标位置的值
            return {
              ...category2,
              list: category2.list.map((pitem, itemIndex) => {
                // 如果不是目标列，则直接返回原数组
                if (itemIndex !== index3) {
                  return pitem;
                }
                // 更新目标位置的值
                return {
                  ...pitem,
                  selected: !pitem.selected,
                };
              }),
            };
          }),
        };
      }
    );

    // 更新状态
    usePersonalityDataList(newPersonalityDataList);
  };

  const openPlistModal = (name: string, index: number) => {
    usePlistModalIsOpen(true);
    usePListName(name);
    usePListIndex(index);
  };

  useEffect(() => {
    usePersonalityDataList(personalityData)
  }, [isOpen])

  useEffect(() => {
    return () => {
      usePersonalityDataList(personalityData)
    }
  }, [])


  return (
    <div className="flex flex-col">
      <Modal
        isOpen={spModal.isOpen}
        onClose={() => {
          onClose && onClose()
        }}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        onOpenChange={spModal.onOpenChange}
        placement="center"
        size="full"
        scrollBehavior="inside"
        classNames={{
          wrapper: "",
          body: "bg-transparent p-0",
          backdrop: "h-full",
          base: "h-5/6 w-5/6 border-none shadow-none bg-transparent  text-[#a8b0d3]",
          closeButton: "hover:bg-white/5 active:bg-white/10 -top-10 text-white",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <div className="grid grid-cols-7 gap-4 h-full w-full relative">
                <div className="col-span-4 flex flex-col bg-neutral-900 rounded-xl shadow border-2 border-zinc-800/20 h-full overflow-hidden">
                  <div className="flex flex-row justify-between h-[74px] p-5 items-center">
                    <div className="text-center text-white text-lg font-medium font-['Roboto'] leading-[18px]">{labels.StylePreference.title1}</div>
                    <Button
                      onPress={() => {
                        usePListName("");
                        usePListIndex(-1);
                        usePlistModalIsOpen(true);
                      }}
                      isIconOnly={true}
                      className="bg-white/10 rounded-lg flex justify-center items-center"
                    >
                      <PlusIcon className="w-[26px] h-[26px] stroke-neutral-300" />
                    </Button>
                  </div>
                  <div className="grow overflow-hidden">
                    <StylePreference
                      personalityDataList={personalityDataList}
                      openPlistModal={openPlistModal}
                      handleFruitClick={handleFruitClick}
                      onChange={(value) => {
                        usePersonalityDataList(value);
                      }}
                    />
                  </div>
                  {/* <div className="py-[30px] flex justify-center items-center">
                    <Button size="lg" variant="ghost" color="default">Add Attributes</Button>
                  </div> */}
                </div>
                <div className="col-span-3 h-full overflow-hidden">
                  <StylePreferenceOcAi
                    personalityDataList={personalityDataList}
                    handleFruitClick={handleFruitClick}
                    onSuccess={(charaGenerateData) => {
                      onSuccess && onSuccess(charaGenerateData)
                    }}
                  />
                </div>
              </div>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>

      <StylePreferenceCustomerModal
        personalityDataList={personalityDataList}
        isOpen={plistModalIsOpen}
        name={pListName}
        index={pListIndex}
        usePersonalityDataList={usePersonalityDataList}
        onClose={() => {
          usePListName("");
          usePListIndex(-1);
          usePlistModalIsOpen(false);
        }}
      />
    </div>
  );
}

export default StylePreferenceModal;
