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
import PlaySquareIcon from "../../icons/PlaySquareIcon";
import ChevronBigLeftIcon from "../../icons/ChevronBigLeftIcon";
import { useState } from "react";
import { useLabels } from "../../context/LabelsContext";

export function SelectVoiceModal({
  isOpen = false,
  locale = "en",
  onClose,
  onChange,
}: {
  isOpen?: boolean;
  locale?: "en" | "zh-CN";
  onClose?: () => void;
  onChange?: () => void;
}) {
  const labels = useLabels();
  const msgModal = useDisclosure({ isOpen: isOpen });
  const voiceList = [
    {
      name: "Voice 1",
      image: "https://i.imgur.com/22nz1yC.png",
    },
    {
      name: "Voice 2",
      image: "https://i.imgur.com/22nz1yC.png",
    }
  ]

  const [selectedLanguage, setSelectedLanguage] = useState<Set<string>>(new Set([]));
  const langs = [
    {key: "en", label: "en"},
    {key: "zh-CN", label: "zh"},
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
      size="xl"
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
              <div className="h-[800px] relative px-6 py-5">
                <div className="w-full">
                  <div className="w-full h-[0px] left-0 top-0 absolute border border-zinc-950"></div>
                  <div className="w-full h-[0px] left-[-0px] top-[1px] absolute border border-neutral-800"></div>
                </div>

                <div className="w-full mb-5 flex flex-row gap-4">
                  <div className="grow">
                    <Tabs radius="full" aria-label="Tabs radius" fullWidth={true} classNames={{
                      tabList: "bg-black",
                      tab: "group-data-[selected=true]:bg-gray-800"
                    }}>
                      <Tab key="all" title="All"/>
                      <Tab key="male" title="Male"/>
                      <Tab key="femal" title="Female"/>
                      <Tab key="collection" title="Collection"/>
                    </Tabs>
                  </div>
                  
                  <Select
                    className="" 
                    radius="full"
                    classNames={{
                      base: "w-20"
                    }}
                    selectedKeys={selectedLanguage}
                    onSelectionChange={(keys) => {
                      setSelectedLanguage(keys as Set<string>)
                    }}
                  >
                    {langs.map((lang) => (
                      <SelectItem key={lang.key}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                

                <div className="gap-[14px] flex flex-col">
                  {voiceList.map((voice, index) => {
                    return (
                      <div className="h-[62px] flex flex-row items-center justify-start bg-zinc-900 rounded-lg border border-neutral-800 px-[18px] gap-[13px]" key={index}>
                        <PlaySquareIcon className="w-[30px] h-[30px] cursor-pointer" />
                        <div className="text-gray-100 text-base font-normal font-['Roboto'] leading-none tracking-wide">
                          Lisa-En-Female1
                        </div>
                      </div>
                    )
                  })}
                </div>
                
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
