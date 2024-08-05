"use client";
import {
  Button,
  Chip,
  Divider,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useRef, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useLabels } from "../../context/LabelsContext";
import { personalityDataType } from "../../definitions";


function StylePreference({
  personalityDataList,
  openPlistModal,
  handleFruitClick,
  onChange,
}: {
  personalityDataList: Array<personalityDataType>,
  openPlistModal: (name: string, index:number) => void,
  handleFruitClick: (index1:number, index2:number, index3:number) => void,
  onChange: (value: any) => void
}) {
  const labels = useLabels();
  const [isLeft, setIsLeft] = useState(true);
  const [isRight, setIsRight] = useState(false);

  const tabsBox = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<string>("");

  return (
    <div className="h-full flex flex-col">
      
      <div className="px-3 pb-6">
        <div className="relative w-full items-center">
          {!isLeft && (
            <div
              className="w-10 h-full bg-neutral-900/40 absolute left-0 top-0 z-10 flex items-center justify-start"
              onClick={() => {
                tabsBox.current?.scrollTo({
                  left: 0,
                  behavior: "smooth",
                });
              }}
            >
              <ChevronLeftIcon className="w-5 h-5 stroke-white" />
            </div>
          )}
          <div
            className=" scrollbar-hide overflow-x-scroll w-full flex flex-row"
            onScroll={(e) => {
              const eTarget = e.target as HTMLDivElement
              if (eTarget.scrollLeft === 0) {
                setIsLeft(true);
              } else {
                setIsLeft(false);
              }

              if ((eTarget.scrollWidth - eTarget.clientWidth - eTarget.scrollLeft) < 2 ) {
                setIsRight(true);
              } else {
                setIsRight(false);
              }
            }}
            ref={tabsBox}
          >
            <Tabs
              variant="light"
              classNames={{
                cursor: "group-data-[selected=true]:bg-zinc-700 rounded-full",
                tab: "group-data-[selected=true]:bg-zinc-700 px-4",
                tabContent: "text-zinc-400 group-data-[selected=true]:text-white",
              }}
              selectedKey={selected}
              onSelectionChange={(selected) => {
                setSelected(selected as string);
              }}
            >
              {personalityDataList
                .filter((item) => !item.isCustomer)
                .map((category1, index1) => (
                  <Tab
                    key={category1.name}
                    title={category1.name}
                  />
                ))}
            </Tabs>
          </div>
          {!isRight && (
            <div
              className="w-10 h-full bg-neutral-900/40 absolute right-0 top-0 z-10 flex items-center justify-end"
              onClick={() => {
                tabsBox.current?.scrollTo({
                  left: tabsBox.current.scrollWidth - tabsBox.current.clientWidth,
                  behavior: "smooth",
                });
              }}
            >
              <ChevronRightIcon className="w-5 h-5 stroke-white" />
            </div>
          )}
        </div>
      </div>


      <Divider className="bg-neutral-800" />
      <div className="grow overflow-y-scroll">
        {personalityDataList
          .filter((item) => !item.isCustomer)
          .map((category1, index1) => (
            <div className={`px-6 ${selected !== category1.name ? "hidden" : ""}`} key={`${category1.name}${index1}`}>
              {category1.list
                .filter((item) => item.name !== "customerCategory")
                .map((category2, index2) => (
                  <div
                    key={`${index1}+${index2}`}
                    className="py-4 bg-transparent text-white border-none shadow-none"
                  >
                    <div className="py-4 text-neutral-500 text-xs font-medium font-['Roboto'] uppercase leading-normal tracking-wide">
                      {category2.name}
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {category2.list.map((pitem, index3) => (
                        <Chip
                          className={`${
                            pitem.selected
                              ? "bg-green-400 border-green-400"
                              : "bg-zinc-800 border-zinc-700"
                          } text-white px-6 text-sm font-medium font-['Roboto'] capitalize leading-tight h-9  rounded-3xl border justify-center items-center inline-flex w-auto cursor-pointer`}
                          key={`${index1}+${index2}+${index3}`}
                          variant="flat"
                          onClick={() =>
                            handleFruitClick(index1, index2, index3)
                          }
                        >
                          {pitem.name}
                        </Chip>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ))}
      </div>

      {personalityDataList
        .filter((item) => !item.isCustomer)
        .map((category1, index1) => (
          <div key={`${category1.name}${index1}`} className={`py-[30px] flex justify-center items-center ${selected !== category1.name ? "hidden" : ""}`}>
            <Button
              size="lg"
              variant="ghost"
              color="default"
              onPress={() => {
                openPlistModal(category1.name, index1);
              }}
            >{labels.StylePreference.btnAddAttributes}</Button>
          </div>
        ))}
    </div>
  );
}

export default StylePreference;
