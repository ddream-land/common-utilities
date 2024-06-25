"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ExportIcon from "../../icons/ExportIcon";
import UserTwoIcon from "../../icons/UserTwoIcon";
import { Button } from "@nextui-org/react";
import { useLabels } from "../../context/LabelsContext";

function CreateDigitalLifeAvatar({}: {}) {
  const labels = useLabels();
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full h-6 justify-start items-center gap-2.5 inline-flex">
        <div className="text-white text-sm font-semibold font-['Inter'] leading-normal">
        {labels.CreateDigitalLifeModal.avatar}
        </div>
      </div>

      <div className="w-full px-6 bg-zinc-800 rounded-xl justify-between items-center gap-3 inline-flex">
        <div className="justify-start items-center gap-3 flex h-[68px]">
          <UserTwoIcon className="w-6 h-6" />
          <div className="text-slate-100 text-base font-normal font-['Inter'] leading-normal">Keira_e8_s96.pth</div>
        </div>
        <Button isIconOnly size="sm" className="h-8 w-8 p-0 bg-black rounded-full justify-center items-center flex"><XMarkIcon className="w-5 h-5 stroke-white" /></Button>
      </div>

      <div className="group/item w-full h-[136px] p-4 rounded-2xl border-2 border-zinc-700 hover:border-white border-dashed flex-col justify-center items-center gap-2 inline-flex">
        <ExportIcon className="w-6 h-6 stroke-zinc-400 group-hover/item:stroke-white" />
        <div className="text-center text-zinc-400 group-hover/item:text-white text-xs font-medium font-['Inter']">
          {labels.CreateDigitalLifeModal.avatarUpload}
        </div>
      </div>
    </div>
  );
}

export default CreateDigitalLifeAvatar;
