"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import ChevronBigLeftIcon from "../../icons/ChevronBigLeftIcon";
import { useState } from "react";
import { useLabels } from "../../context/LabelsContext";
import VoiceModelList from "../voice-model-list/VoiceModelList";
import { VoiceModelType, VoiceModelFilterType } from "../../../../types/definitions.voice";

export function SelectVoiceModal({
  isOpen = false,
  locale = "en",
  onClose,
  onClick,
}: {
  isOpen?: boolean;
  locale?: string;
  onClose?: () => void;
  onClick?: (newVoiceModel: VoiceModelType) => void;
}) {
  const labels = useLabels();
  const msgModal = useDisclosure({ isOpen: isOpen });
  const [filters, setFilters] = useState<VoiceModelFilterType>({
    type: "",
    name: "",
    language: '',
  } as VoiceModelFilterType)

  const [voiceModelListKey, setVoiceModelListKey] = useState(0);
  const langs = [
    {key: "", label: "All"},
    {key: "en", label: "En"},
    {key: "zh-CN", label: "Zh"},
    {key: "ja", label: "Ja"},
  ];

  return (
    <Modal
      isOpen={msgModal.isOpen}
      onClose={() => {
        onClose && onClose();
      }}
      hideCloseButton={true}
      classNames={{
        wrapper: "",
        base: "bg-neutral-900 rounded-xl shadow",
        header: "h-[75px]",
        body: " bg-neutral-900 p-0",
      }}
      placement="center"
      scrollBehavior="inside"
      size="2xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <div className="flex flex-row w-full items-center justify-center gap-[10px]">
                <Button isIconOnly className="w-[34px] h-[34px] bg-white/opacity-10 rounded-lg justify-self-start">
                  <ChevronBigLeftIcon className="w-[26px] h-[26px] " />
                </Button>
                <div className="w-full text-center text-white text-lg font-medium font-['Roboto'] leading-[18px]">
                {labels.SelectVoice.addVoice}
                </div>
              </div>
              
            </ModalHeader>
            <ModalBody>
              <div className="h-auto overflow-hidden">

                <div className="w-full mb-5 flex flex-row gap-4 absolute mt-0 px-6 pt-5 bg-neutral-900">
                  <div className="grow">
                    <Tabs
                      radius="full"
                      aria-label="Tabs radius"
                      fullWidth={true}
                      classNames={{
                        tabList: "bg-black",
                        cursor: "group-data-[selected=true]:bg-zinc-500"
                      }}
                      selectedKey={filters.type}
                      onSelectionChange={(key) => {
                        setFilters({
                          ...filters,
                          type: key as string,
                        } as VoiceModelFilterType)
                        setVoiceModelListKey(voiceModelListKey + 1)
                      }}
                    >
                      <Tab key="" title="All"/>
                      <Tab key="male" title="Male"/>
                      <Tab key="female" title="Female"/>
                      <Tab key="boy" title="Boy"/>
                      <Tab key="girl" title="Girl"/>
                    </Tabs>
                  </div>
                  
                  <Select
                    className="" 
                    radius="full"
                    classNames={{
                      base: "w-20"
                    }}
                    selectedKeys={[filters.language]}
                    onChange={(e) => {
                      setFilters({
                        ...filters,
                        language: e.target.value
                      } as VoiceModelFilterType)
                      setVoiceModelListKey(voiceModelListKey + 1)
                    }}
                  >
                    {langs.map((lang) => (
                      <SelectItem key={lang.key}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                
                <div className="mt-[80px] overflow-hidden w-full px-6 h-[420px] pb-5">
                  <VoiceModelList
                    key={voiceModelListKey}
                    onItemClick={(voiceModel) => {
                      if (voiceModel) {
                        onClick && onClick(voiceModel);
                      }
                      // setSelectedVoiceModel(voiceModel);
                      // setIsOpen(true);
                      // voiceDetailModal.onOpen();
                    }}
                    onChange={(voiceList) => {
                      // if (voiceList.length === 0) {
                      //   setIsEmpty(true);
                      // } else {
                      //   setIsEmpty(false);
                      // }
                    }}
                    filters={filters}
                  />
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
