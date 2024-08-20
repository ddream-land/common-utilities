"use client";

import { Button } from "@nextui-org/react";
import { useLabels } from "../../context/LabelsContext";
import { RegisterVarinats } from "./Register";

export default function RegisterSwitchType({
  variant,
  loginType = 'email',
  onChange,
}: {

  variant: RegisterVarinats
  loginType: 'email' | 'phone'
  onChange: (type: 'email' | 'phone') => void
}) {
  const labels = useLabels();

  let labelsUser;
  switch(variant) {
    case "register":
      labelsUser = useLabels().UserRegister
      break;
    case "resetPassword":
      labelsUser = useLabels().UserResetPassword
      break;
    case "deleteUser":
      labelsUser = useLabels().UserDeleteUser
      break;
  }

  return (
    <div className="w-full">
      <div className="mb-[34px] flex flex-row gap-1 justify-start items-center">
        <div className="grow h-px bg-[#3d3d3d]"></div>
        <div className="text-center text-[#3d3d3d] text-[9px] font-normal font-['Inter'] leading-normal">{labelsUser.othermethods}</div>
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
        {loginType === 'email' ? labelsUser.phonebtn : labelsUser.emailbtn}
      </Button>  
    </div>
    
  );
}
