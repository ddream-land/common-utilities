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
import { charaGenerate } from "../../utils/characters.api";
import { useState } from "react";
import { charaGenerateDataType, personalityDataType } from "../../definitions";

function StylePreferenceOcAi({
  personalityDataList,
  handleFruitClick,
  onSuccess,
}: {
  personalityDataList: Array<personalityDataType>;
  handleFruitClick: (index1: number, index2: number, index3: number) => void;
  onSuccess: (charaGenerateData: charaGenerateDataType) => void;
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

  const renderSelectedList: Array<{name: string, list: Array<{name: string, index1: number, index2: number, index3: number}>}> = [];

  const getRenderSelectedList = () => {
    personalityDataList.map((category1, index1) => {
      const list: Array<{name: string, index1: number, index2: number, index3: number}> = []
      category1.list.map((category2, index2) => {
        category2.list.map((pitem, index3) => {
          if (pitem.selected) {
            list.push({ name: pitem.name, index1, index2, index3 })
          }
        })
      })

      if (list.length === 0) return;
      renderSelectedList.push({
        name: category1.name,
        list: list
      })
    })
  }
  getRenderSelectedList();

  const handleInsertPersonality = () => {
    const newPersonalityList = personalityDataList
      .map((category1) => {
        return {
          ...category1,
          list: category1.list
            .map((category2) => {
              return category2.list
                .filter((item) => item.selected)
                .map((item) => {
                  return item.name;
                })
                .join(",");
            })
            .filter((item) => {
              return item.length > 0;
            }),
        };
      })
      .filter((item) => {
        return item.list.length > 0;
      });

    const newPersonalityStrAr: Array<any> = [];
    newPersonalityList
      .map((item) => {
        if (item.list.length > 0) {
          newPersonalityStrAr.push(`${item.name}:[${item.list.join(",")}]`);
        }
      })

    let personalityStr = newPersonalityStrAr.join('\n')
    charaGenerateServer({content: personalityStr});
  };
  const [generating, setGenerating] = useState(false);
  const charaGenerateApi = charaGenerate();

  const charaGenerateServer = async ({
    content
  }: {
    content: string
  }) => {
    if (generating) return;
    setGenerating(true);
    
    const res = await charaGenerateApi.send({
      content: content
    });
    if (res && res.code === 0) {
      onSuccess && onSuccess(res.data);
    }
    setGenerating(false);
  }

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
            {renderSelectedList.map((category1, index1) => (
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
                    {category1.list.map((item, index2) => (
                      <Chip
                        className="bg-green-400 h-9 cursor-pointer px-6 w-auto text-white "
                        key={`${item.index1}-${item.index2}-${item.index3}`}
                        endContent={
                          <XCircleIcon
                            className="h-5 w-5 stroke-transparent fill-white"
                            onClick={() =>
                              handleFruitClick(item.index1, item.index2, item.index3)
                            }
                          />
                        }
                        variant="flat"
                      >
                        {item.name}
                      </Chip>
                    ))}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </ScrollShadow>
    
      <div className="py-[30px]">
        <Button
          color="primary"
          size="lg"
          fullWidth={true}
          isLoading={generating}
          isDisabled={renderSelectedList.length === 0}
          className="bg-cyan-500"
          // endContent={
          //   <div className="h-6 pl-1 pr-2 py-0.5 bg-green-500 rounded-md justify-center items-center gap-1 flex">
          //     <FlashIcon className="w-4 h-4 fill-neutral-900 stroke-neutral-900 relative" />
          //     <div className="text-center text-neutral-900 text-xs font-semibold font-['Inter']">
          //       X 4
          //     </div>
          //   </div>
          // }
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
