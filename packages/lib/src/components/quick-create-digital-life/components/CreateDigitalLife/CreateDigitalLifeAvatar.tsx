"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ExportIcon from "../../icons/ExportIcon";
import UserTwoIcon from "../../icons/UserTwoIcon";
import { Button, cn } from "@nextui-org/react";
import { useLabels } from "../../context/LabelsContext";
import UploadFile from "../../../upload-file/UploadFile";
import { nuwaAvatarsType, nuwaAvatarType } from "../../definitions";


function CreateDigitalLifeAvatar({
  value,
  max,
  onChange
}: {
  value: nuwaAvatarsType
  max: number
  onChange?: (nuwaAvatarsData: nuwaAvatarsType) => void;
}) {
  const labels = useLabels();
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full h-6 justify-start items-center gap-2.5 inline-flex">
        <div className="text-white text-sm font-semibold font-['Inter'] leading-normal">
        {labels.CreateDigitalLifeModal.avatar}
        </div>
      </div>

      {value.list.map((item, index) => (
        <div className="w-full px-6 bg-zinc-800 rounded-xl justify-between items-center gap-3 inline-flex">
          <div className="justify-start items-center gap-3 flex h-[68px]">
            <UserTwoIcon className="w-6 h-6" />
            <div className="text-slate-100 text-base font-normal font-['Inter'] leading-normal">{item.name}</div>
          </div>
          <Button
            isIconOnly
            size="sm"
            className="h-8 w-8 p-0 bg-black rounded-full justify-center items-center flex"
            onPress={() => {
              onChange && onChange({
                version: '1.0',
                list: value.list.filter((_, i) => i !== index)
              })
            }}
          ><XMarkIcon className="w-5 h-5 stroke-white" /></Button>
        </div>
      ))}
      

      <div className={cn("w-full h-[136px]", value.list.length >= max ? "hidden" : "")}>
        <UploadFile
          accept="live2d"
          label={labels.CreateDigitalLifeModal.avatarUpload}
          isPreview={false}
          onDone={(res) => {
            const url = res.url;
            const filename = res.file.name.split('.')[0]
            onChange && onChange({
              version: '1.0',
              list: [
                ...value.list,
                {
                  url: url,
                  type: 'LIVE2D',
                  name: filename
                }
              ]
            })
          }}
          icon={<ExportIcon className="w-6 h-6 stroke-zinc-400" />}
        ></UploadFile>
      </div>
    </div>
  );
}

export default CreateDigitalLifeAvatar;
