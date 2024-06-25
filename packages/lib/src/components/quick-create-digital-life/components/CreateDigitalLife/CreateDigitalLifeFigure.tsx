"use client";
import { Button } from "@nextui-org/react";
import FlashIcon from "../../icons/FlashIcon";
import { useLabels } from "../../context/LabelsContext";

function CreateDigitalLifeFigure({}: {}) {
  const labels = useLabels();
  return (
    <div className="w-[406px]">
      <img className="w-[965.07px] h-[462px]" src="https://via.placeholder.com/965x462" />
      <div className="flex gap-[18px] w-full mt-6">
        <Button variant="ghost" size="lg" color="default" fullWidth={true}>{labels.CreateDigitalLifeModal.upload}</Button>
        <Button
          color="primary"
          size="lg"
          fullWidth={true}
          endContent={
            <div className="h-6 pl-1 pr-2 py-0.5 bg-green-500 rounded-md justify-center items-center gap-1 flex">
              <FlashIcon className="w-4 h-4 fill-neutral-900 stroke-neutral-900 relative" />
              <div className="text-center text-neutral-900 text-xs font-semibold font-['Inter']">
                X 4
              </div>
            </div>
          }
        >{labels.CreateDigitalLifeModal.redraw}</Button>
      </div>
    </div>
  );
}

export default CreateDigitalLifeFigure;
