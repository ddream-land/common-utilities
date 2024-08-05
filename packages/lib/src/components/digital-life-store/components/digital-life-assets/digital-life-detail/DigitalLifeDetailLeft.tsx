"use client";
import React from "react";

import DigitalLifeVoicePreview from "../digital-life-voice-preview/DigitalLifeVoicePreview";
import { useDisclosure } from "@nextui-org/react";
import DigitalLifeAvatarPreview from "../digital-life-avtar-preview/DigitalLifeAvatarPreview";
import { DEFAULT_DIGITAL_LIFE_DETAIL_INFO, DigitalLifeDetailType } from "../../../utils/definitions.digitallife";
import DefaultAvatarBase64 from "../../../images/default-avatar";
import { useLabels } from "../../../context/LabelsContext";

function DigitalLifeDetailLeft({ digitalLifePublicInfo }: { digitalLifePublicInfo: DigitalLifeDetailType }) {
  const labels = useLabels();

  return (
    <div className="w-full flex-col justify-start items-start gap-8 flex">
      <div className="justify-center items-start gap-2.5 flex flex-col">
        <div className="text-white text-4xl font-semibold leading-10 inline-flex">{digitalLifePublicInfo.name}</div>
        <div className="justify-start items-center gap-1 inline-flex">
          <div className="flex flex-wrap gap-2">
            {digitalLifePublicInfo.tags.map((tag, index) => (
              <div key={tag} className="px-2 py-0.5 bg-zinc-800 rounded flex items-center">
                <div className="text-white text-xs font-semibold leading-tight whitespace-nowrap">{tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="shrink-0 self-stretch justify-start items-start gap-6 flex flex-row">
        <div className="shrink-0 w-[200px] h-[200px] rounded-xl relative overflow-hidden">
          <img
            alt={digitalLifePublicInfo.avatar}
            className="w-full h-full rounded-xl object-cover"
            src={digitalLifePublicInfo.avatar || DefaultAvatarBase64}
          />
        </div>

        {/* <div className=" grow text-white text-sm font-normal text-wrap whitespace-pre-wrap">
          {digitalLifePublicInfo.description.replace(/\\r\\n/g, "\n").replace(/\\n/g, "\n")}
        </div> */}

        <div
          className="grow text-white text-sm font-normal text-wrap whitespace-pre-wrap overflow-hidden text-ellipsis"
          style={{
            maxHeight: "100%",
            display: "-webkit-box",
            WebkitLineClamp: "var(--max-lines-digital)",
            WebkitBoxOrient: "vertical",
          }}
        >
          {digitalLifePublicInfo.data.creator_notes?.replace(/\\r\\n/g, "\n").replace(/\\n/g, "\n")}
        </div>
      </div>
      <div className="flex justify-start w-full items-center">
        <div className="text-white text-xl font-semibold">{labels.DigitalLifeStore.digitalLifeInformation}</div>
      </div>
      <div className="w-full self-stretch flex-col justify-start items-start gap-5 flex pt-1">
        {digitalLifePublicInfo.first_mes && (
          <div id="item-greting" className="flex flex-col px-5 py-[18px] w-full rounded-xl gap-[17px] bg-[#27272A]">
            <div className="text-white text-base font-semibold">{labels.DigitalLifeStore.greeting}</div>
            <div className="w-full h-[1px] bg-[#323235]"></div>
            <div className="text-white font-normal text-sm text-wrap whitespace-pre-wrap">
              {digitalLifePublicInfo.first_mes}
            </div>
          </div>
        )}
        <div id="item-personality" className="w-full flex flex-col px-5 py-[18px] rounded-xl gap-[17px] bg-[#27272A]">
          <div className="text-white text-base font-semibold">{labels.DigitalLifeStore.personality}</div>
          <div className="w-full h-[1px] bg-[#323235]"></div>
          <div className="text-white font-normal text-sm text-wrap whitespace-pre-wrap">
            {digitalLifePublicInfo.personality}
          </div>
        </div>
        <div id="item-description" className="w-full flex flex-col px-5 py-[18px] rounded-xl gap-[17px] bg-[#27272A]">
          <div className="text-white text-base font-semibold">{labels.DigitalLifeStore.description}</div>
          <div className="w-full h-[1px] bg-[#323235]"></div>
          <div className="text-white font-normal text-sm text-wrap whitespace-pre-wrap">
            {digitalLifePublicInfo.description}
          </div>
        </div>

        <div id="item-world" className="w-full flex flex-col px-5 py-[18px] rounded-xl gap-[17px] bg-[#27272A]">
          <div className="text-white text-base font-semibold">{labels.DigitalLifeStore.world}</div>
          <div className="w-full h-[1px] bg-[#323235]"></div>
          <div className="text-white font-normal text-sm text-wrap whitespace-pre-wrap">
            {digitalLifePublicInfo.data.extensions?.world}
          </div>
        </div>

        <div id="item-voice" className="w-full flex flex-col px-5 py-[18px] rounded-xl gap-[17px] bg-[#27272A]">
          <div className="text-white text-base font-semibold">{labels.DigitalLifeStore.voice}</div>
          <div className="w-full h-[1px] bg-[#323235;]"></div>
          {digitalLifePublicInfo.data.extensions?.nuwa_voices?.list?.map((voice, index) => (
            <div className="" key={index}>
              <DigitalLifeVoicePreview voice={voice} />
            </div>
          ))}
        </div>

        <div id="item-avatar" className="w-full flex flex-col px-5 py-[18px] rounded-xl gap-[17px] bg-[#27272A]">
          <div className="text-white text-base font-semibold">{labels.DigitalLifeStore.avatar}</div>
          <div className="w-full h-[1px] bg-[#323235;]"></div>
          {digitalLifePublicInfo.data.extensions?.nuwa_avatars &&
            digitalLifePublicInfo.data.extensions?.nuwa_avatars?.list.length > 0 && (
              <DigitalLifeAvatarPreview digitalLifePublicInfo={digitalLifePublicInfo} />
            )}
        </div>
      </div>
    </div>
  );
}

export default DigitalLifeDetailLeft;
