"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  ScrollShadow,
} from "@nextui-org/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import OCAIAIcon from "../../icons/OCAIAIcon";
import OCAIBIcon from "../../icons/OCAIBIcon";
import FlashIcon from "../../icons/FlashIcon";
import { useLabels } from "../../context/LabelsContext";

function StylePreferenceOcAi({
  personalityDataList,
  handleFruitClick,
  handleInsertPersonality,
}: {
  personalityDataList: Array<personalityDataType>;
  handleFruitClick: (index1: number, index2: number, index3: number) => void;
  handleInsertPersonality: () => void;
}) {
  const labels = useLabels();
  const getFruitSelectedLength = (list: Array<any>) => {
    let length = 0;

    list &&
      list.length > 0 &&
      list.map((item, index) => {
        item.list.map((aitem: { name: string; selected: boolean }) => {
          if (aitem.selected) {
            length += 1;
          }
        });
      });

    return length;
  };

  return (
    <div className="bg-gradient-to-b from-slate-800 to-zinc-950 backdrop-blur-[120px] rounded-xl shadow border-2 border-zinc-800/20 overflow-y-hidden h-full relative px-6 flex flex-col">
      <div className="h-[96px] flex items-center justify-start flex-row">
        <div className="flex flex-row w-8 h-8 justify-center items-center relative mr-[10px]">
          <OCAIAIcon className="" />
          <OCAIBIcon className="absolute left-6" />
        </div>
        <div className="text-white text-[26px] font-bold font-['Roboto'] capitalize leading-normal">
          {labels.StylePreference.title2}
        </div>
      </div>

      <div className="w-full h-0 border border-gray-800"></div>

        <ScrollShadow className="grow">
          <div className="grid divide-y divide-slate-800">
            {personalityDataList.map((category1, index1) => {
              if (getFruitSelectedLength(category1.list) > 0) {
                return (
                  <Card
                    key={`${category1.name}${index1}`}
                    className="py-4 bg-transparent text-white border-none shadow-none"
                  >
                    <CardHeader className="pb-0 pt-2 flex-col items-start">
                      <div className="text-neutral-500 text-xs font-medium font-['Roboto'] uppercase leading-normal tracking-wide">
                        {category1.name}
                      </div>
                    </CardHeader>
                    <CardBody className="overflow-visible py-6">
                      <div className="flex flex-wrap gap-4">
                        {category1.list.map((category2, index2) => (
                          <>
                            {category2.list.map((pitem, index3) => (
                              <>
                                {pitem.selected && (
                                  <Chip
                                    className="bg-green-400 h-9 cursor-pointer px-6 w-auto text-white "
                                    key={`${category1.name}${index1}+${category2.name}${index2}+${index3}`}
                                    endContent={
                                      <XCircleIcon
                                        className="h-5 w-5 stroke-transparent fill-white"
                                        onClick={() =>
                                          handleFruitClick(index1, index2, index3)
                                        }
                                      />
                                    }
                                    variant="flat"
                                  >
                                    {pitem.name}
                                  </Chip>
                                )}
                              </>
                            ))}
                          </>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                  
                );
              }
            })}
          </div>
        </ScrollShadow>
      
      

      <div className="py-[30px]">
        <Button
          color="primary"
          size="lg"
          fullWidth={true}
          endContent={
            <div className="h-6 pl-1 pr-2 py-0.5 bg-green-500 rounded-md justify-center items-center gap-1 flex">
              <FlashIcon className="w-4 h-4 fill-neutral-900 stroke-neutral-900 relative" />
              <div className="text-center text-neutral-900 text-xs font-semibold font-['Inter']">
                X 4
              </div>
            </div>
          }
          onPress={() => {
            handleInsertPersonality()
          }}
        >
          {labels.StylePreference.btnGenerate}
        </Button>
      </div>
    </div>
  );
}

export default StylePreferenceOcAi;
