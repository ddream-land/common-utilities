"use client";
import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import VoicePreview from "./VoicePreview";
import { SelectVoiceModal } from "../SelectVoice/SelectVoiceModal";
import { useLabels } from "../../context/LabelsContext";

function CreateDigitalLifeVoice({}: {}) {
  const labels = useLabels();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full h-6 justify-start items-center gap-2.5 inline-flex">
        <div className="text-white text-sm font-semibold font-['Inter'] leading-normal">
          {labels.CreateDigitalLifeModal.voice}
        </div>
      </div>

      <div className="w-full h-[88px] p-4 bg-zinc-800 rounded-xl justify-start items-center gap-4 inline-flex">
        <VoicePreview voiceSrc="https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3" />
        <div className="p-0.5 rounded-[28px] justify-center items-center gap-2 flex">
          <TrashIcon className="w-5 h-5 stroke-zinc-500 hover:stroke-white" />
        </div>
      </div>

      <div onClick={() => {setIsOpen(true)}} className="group/item w-full h-[136px] p-4 rounded-2xl border-2 border-zinc-700 hover:border-white border-dashed flex-col justify-center items-center gap-2 inline-flex">
        <PlusCircleIcon className="w-6 h-6 stroke-zinc-400 group-hover/item:stroke-white" />
        <div className="text-center text-zinc-400 group-hover/item:text-white text-xs font-medium font-['Inter']">
        {labels.CreateDigitalLifeModal.voiceUpload}
        </div>
      </div>

      <SelectVoiceModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default CreateDigitalLifeVoice;
