"use client";
import { Button } from "@nextui-org/react";
import { useLabels } from "../../context/LabelsContext";

export default function LoginSwitchType({
  loginType,
  onChange,
}: {
  loginType: 'email' | 'phone'
  onChange: (type: 'email' | 'phone') => void
}) {
  const labels = useLabels();

  return (
    <div>
      <div className="mb-[34px] flex flex-row gap-1 justify-start items-center">
        <div className="grow h-px bg-[#3d3d3d]"></div>
        <div className="text-center text-[#3d3d3d] text-[9px] font-normal font-['Inter'] leading-normal">{labels.User.loginothermethods}</div>
        <div className="grow h-px bg-[#3d3d3d]"></div>
      </div>
      <Button
        color="default"
        size="lg"
        className="w-full bg-white text-black rounded-full"
        onClick={() => {
          if (loginType === 'email') {
            onChange('phone');
          } else {
            onChange('email');
          }
        }}
      >
        {loginType === 'email' ? labels.User.loginphonebtn : labels.User.loginemailbtn}
      </Button>  
    </div>
  );
}
