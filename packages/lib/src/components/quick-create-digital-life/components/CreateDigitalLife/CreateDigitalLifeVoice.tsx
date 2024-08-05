"use client";
import React, { useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import VoicePreview from "./VoicePreview";
import { SelectVoiceModal } from "../SelectVoice/SelectVoiceModal";
import { useLabels } from "../../context/LabelsContext";
import { useLocale } from "../../context/LocaleContext";
import { VoiceModelType } from "../../../../types/definitions.voice";
import ToneVoiceFile from "../../../voice-preview/ToneVoiceFile";
import { cn } from "@nextui-org/react";
import { nuwaVoicesType, nuwaVoiceType } from "../../definitions";

function CreateDigitalLifeVoice({
  value,
  max,
  onChange
}: {
  value: nuwaVoicesType
  max: number
  onChange?: (nuwaVoicesData: nuwaVoicesType) => void;
}) {
  const labels = useLabels();
  const locale = useLocale();
  const [isOpen, setIsOpen] = React.useState(false);
  const [voiceModelList, setVoiceModelList] = React.useState<Array<VoiceModelType>>([])

  useEffect(() => {
    if (onChange && voiceModelList.length > 0) {
      const newValues = Array<nuwaVoiceType>();
      voiceModelList.map((voiceModel) => {
        //const audioUrl = voiceModel.tone.filter((item) => item.tone_type === 'neutral')[0].audio_url
        const audioUrl = voiceModel.tone.length > 0 ? voiceModel.tone[0].audio_url : 0
        audioUrl && newValues.push({
          publish_id: voiceModel.publish_id,
          name: voiceModel.publish_info.name,
          audio_url: audioUrl
        })
      })
      onChange({
        version: '1.0',
        list: newValues
      })
    }
  }, [voiceModelList])

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full h-6 justify-start items-center gap-2.5 inline-flex">
        <div className="text-white text-sm font-semibold font-['Inter'] leading-normal">
          {labels.CreateDigitalLifeModal.voice}
        </div>
      </div>

      {voiceModelList.map((voiceModel, index) => (
        <ToneVoiceFile
          voiceSrc={voiceModel.tone[0].audio_url}
          onTrashClick={() => {
            setVoiceModelList(voiceModelList.filter((item, i) => i !== index))
          }}
        />
      ))}

      <div
        onClick={() => {setIsOpen(true)}}
        className={cn(voiceModelList.length === max ? "hidden" : "inline-flex", "w-full h-[136px] p-4 rounded-2xl border-2 border-zinc-700 border-dashed flex-col justify-center items-center gap-2")}
      >
        <PlusCircleIcon className="w-6 h-6 stroke-zinc-400 group-hover/item:stroke-white" />
        <div className="text-center text-zinc-400 group-hover/item:text-white text-xs font-medium font-['Inter']">
          {labels.CreateDigitalLifeModal.voiceUpload}
        </div>
      </div>

      <SelectVoiceModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        locale={locale}
        onClick={(voiceModel) => {
          setIsOpen(false);
          setVoiceModelList([...voiceModelList, voiceModel])
        }}
      />
    </div>
  );
}

export default CreateDigitalLifeVoice;
