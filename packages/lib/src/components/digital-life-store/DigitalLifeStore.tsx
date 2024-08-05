"use client";

import { cn, useDisclosure } from "@nextui-org/react";
import { useLabels } from "./context/LabelsContext";
import { useState } from "react";
import { DEFAULT_DIGITALLIFE, DigitalLifeCardType } from "./utils/definitions.digitallife";
import DigitalLifeDetailDrawerModal from "./components/digital-life-assets/digital-life-detail/DigitalLifeDetailDrawerModal";
import DigitalLifeList from "./components/digital-life-assets/digital-life-list/DigitalLifeList";

import { AlterMessageContextProvider, useAmDispatch } from "../alter-message/AlterMessageContextProvider";
import DisplayNoneIcon from "./icons/DisplayNoneIcon";

export type DigitalLifeStoreProps = {
  onRunAISuccess?: (id: string, isSuccess: boolean) => void;
  className?: string;
};

export function DigitalLifeStore({ onRunAISuccess, className }: DigitalLifeStoreProps) {
  const [digitalLifeListKey, setDigitalLifeListKey] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);
  const [selectedDigitalLife, setSelectedDigitalLife] = useState<DigitalLifeCardType | null>(null);
  const [dlRefreshCount, setdlRefreshCount] = useState(0);
  const amDispatch = useAmDispatch();
  const labels = useLabels();

  const updateRefreshCount = (
    prevCount: number,
    setDigitalLifeListKey: React.Dispatch<React.SetStateAction<number>>,
    digitalLifeListKey: number
  ) => {
    const newCount = prevCount + 1;
    if (newCount >= 6) {
      setDigitalLifeListKey(digitalLifeListKey + 1);
      return 0; // Reset count
    }
    return newCount;
  };

  return (
    <div className="dark  text-foreground bg-background">
      <div className={cn("w-full bg-[#15151A] flex flex-col px-6", className)}>
        {isEmpty && (
          <div id="display-none" className="w-full h-[600px] flex flex-col text-center justify-center items-center">
            <DisplayNoneIcon className="w-12 h-12" />
            <div className="text-sm font-normal text-[#70707A] mt-4">
              <p>{labels.DigitalLifeStore.displayNoneText1}</p>
              <p>{labels.DigitalLifeStore.displayNoneText2}</p>
            </div>
          </div>
        )}

        <div id="digital-life-assets-list" className={cn(isEmpty ? "hidden" : "block", "w-full")}>
          <DigitalLifeList
            key={digitalLifeListKey}
            type="all"
            selectedDigitalLife={selectedDigitalLife}
            onItemClick={(digitalLife) => {
              setSelectedDigitalLife(digitalLife);
            }}
            onChange={(digitalLifeList) => {
              if (digitalLifeList.length === 0) {
                setIsEmpty(true);
              } else {
                setIsEmpty(false);
              }
            }}
          />
        </div>

        {/* digital life detail modal */}
        <DigitalLifeDetailDrawerModal
          publishId={selectedDigitalLife?.p_id}
          selectedDigitalLife={selectedDigitalLife}
          isOpen={selectedDigitalLife !== null}
          onChange={(isOpen) => {
            if (!isOpen) {
              setSelectedDigitalLife(null);
              setdlRefreshCount((prevCount) =>
                updateRefreshCount(prevCount, setDigitalLifeListKey, digitalLifeListKey)
              );
            }
          }}
          onRunSuccess={(id, success) => {
            onRunAISuccess && onRunAISuccess(id, success);
            if (success) {
              // setIsModalOpen(false);
              setSelectedDigitalLife(null);
              amDispatch({
                type: "add",
                payload: {
                  message: labels.Alter.successfullyRunedOnRoleAI,
                  type: "success",
                },
              });
            }
          }}
        />
      </div>
    </div>
  );
}
