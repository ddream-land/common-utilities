"use client";
import React, { useCallback, useRef, useState } from "react";
import VoicePreviewDigital from "./VoicePreviewDigital";
import { DigitalLifeVoiceType } from "../../../utils/definitions.digitallife";

const formatTime = (seconds: any) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(":");

function DigitalLifeVoicePreview({ voice }: { voice: DigitalLifeVoiceType }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  // console.log(voice);

  return (
    <div className="w-full p-4 pl bg-[#333336] rounded-xl justify-start items-center gap-4 inline-flex">
      <div className="w-full self-stretch p-3 bg-neutral-900 rounded-xl justify-start items-start gap-3 inline-flex">
        <div className="grow shrink basis-0 self-stretch justify-start items-center gap-3 flex">
          <VoicePreviewDigital
            voiceSrc={voice?.audio_url ?? ""}
            classNames={{ playButton: "h-8 w-8" }}
            onTimeChange={(res) => {
              setCurrentTime(res.currentTime);
              setDuration(res.duration || 0);
            }}
          />
        </div>
        <div className="w-24 h-full flex flex-row items-center justify-center">
          <span className="text-zinc-200 text-sm font-normal leading-tight">{formatTime(currentTime)}</span>
          <span className="text-zinc-400 text-sm font-normal leading-tight">/ {formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

export default DigitalLifeVoicePreview;
