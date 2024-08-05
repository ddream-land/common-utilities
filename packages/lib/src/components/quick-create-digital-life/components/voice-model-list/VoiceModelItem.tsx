"use client";
import React, { useState } from "react";
import { cn } from "@nextui-org/react";
import { VoiceModelType } from "../../../../types/definitions.voice";
import PlaySquareIcon from "../../icons/PlaySquareIcon";
import PlayButton2 from "../../../voice-preview/PlayButton2";

function VoiceModelItem({
  voice,
  isSelected = false,
  onItemClick
}: {
  voice: VoiceModelType,
  isSelected: boolean,
  onItemClick?: (voiceModel: VoiceModelType) => void;
}) {
  const [isPlay, setIsPlay] = useState(false);

  return (
    <div
      className="group/item"
      key={voice.id}
    >
      <div
        className={cn(
          isSelected
            ? 'border-primary'
            : 'group-hover/item:border-primary border-transparent',
          " cursor-pointer basis-0 group shrink bg-neutral-900 rounded-xl shadow-inner border-2 flex-col justify-start items-start inline-flex w-full"
        )}
      >
        <div className="h-[62px] w-full flex flex-row items-center justify-start bg-zinc-900 rounded-lg border border-neutral-800 px-[18px] gap-[13px]">
          {/* <PlaySquareIcon className="w-[30px] h-[30px] cursor-pointer" /> */}
          <PlayButton2
            isPlay={isPlay}
            voiceSrc={voice.tone[0].audio_url}
            onChange={(play: boolean) => {
              setIsPlay(play);
            }}
          />
          <div className=" h-full grow flex flex-row justify-start items-center" onClick={() => onItemClick && onItemClick(voice)}>
            <div className="text-gray-100 text-base font-normal font-['Roboto'] leading-none tracking-wide" >
            {voice.publish_info.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceModelItem;
