"use client";
import { useState } from "react";
import VoicePreview from "./VoicePreview";
import { cn } from "@nextui-org/react";
import { TrashIcon } from "@heroicons/react/24/outline";

const formatTime = (seconds: any) =>
  [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(":");

function ToneVoiceFile({
  voiceSrc,
  onTrashClick,
}: {
  voiceSrc: string
  onTrashClick?: () => void
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  return (
    <div className={cn("p-4 relative self-stretch bg-zinc-800 rounded-xl justify-start items-center gap-4 inline-flex")}>
      <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
        <div className="self-stretch h-[72px] pl-3 pr-4 py-3 bg-neutral-900 rounded-xl justify-start items-start gap-6 flex flex-row">
          <div className="grow shrink flex justify-start items-center h-full">
            <VoicePreview
              voiceSrc={voiceSrc}
              classNames={{playButton: 'h-10 w-10'}}
              onTimeChange={res => {
                setCurrentTime(res.currentTime);
                setDuration(res.duration || 0);
              }}
            />
          </div>
          <div className="w-24 h-full flex flex-row items-center justify-end">
            <span className="text-zinc-200 text-sm font-normal leading-tight">{formatTime(currentTime)}</span>
            <span className="text-zinc-400 text-sm font-normal leading-tight">/ {formatTime(duration)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center h-full cursor-pointer flex-col gap-4 justify-center">
        <TrashIcon className="w-5 h-5 fill-zinc-500"  onClick={onTrashClick}/>
      </div>
    </div>
  );
}

export default ToneVoiceFile;
