"use client";

import { ScrollShadow } from "@nextui-org/react";


export default function SelectRegionCode({
  onValueChange,
}: {
  onValueChange?: (newValue: string) => void
}) {

  const regionCodeList = [{
    label: '',
    value: [{
      label: '中国大陆',
      value: '86'
    }]
  }]
  
  return (
    <div className="w-full h-full bg-[#2b2b2b] overflow-scroll">
      <ScrollShadow className="px-[27px] py-5 w-full h-full flex flex-col gap-6">
        {regionCodeList.map((item, index) => (
          <div key={index}>
            <div className="text-white text-sm font-medium font-['PingFang SC'] leading-[18px]">{item.label}</div>
            {item.value.map((item2, index2) => (
              <div
                className=" cursor-pointer w-full h-[50px] flex flex-row justify-between items-center border-b border-white/10"
                key={`${index}-${index2}`}
                onClick={() => {
                  onValueChange?.(item2.value)
                }}
              >
                <div className="text-white text-sm font-normal font-['PingFang SC'] leading-[18px]">{item2.label}</div>
                <div className="text-right text-white/60 text-sm font-normal font-['PingFang SC'] leading-[18px]">+{item2.value}</div>
              </div>
            ))}
          </div>
        ))}
      </ScrollShadow>
    </div>
  );
}
