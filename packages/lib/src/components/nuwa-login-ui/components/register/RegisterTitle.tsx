"use client";

import { useLabels } from "../../context/LabelsContext";
import LogoTitle from "../LogoTitle";
import { RegisterVarinats } from "./Register";

export default function RegisterTitle({
  variant
}: {
  variant: RegisterVarinats
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
      <LogoTitle />
      <div className="w-full text-center text-white text-lg font-bold font-['Roboto'] leading-normal mb-3 mt-5">{labelsUser.title}</div>
      <div className="w-full text-center text-white text-[9px] font-normal font-['Inter'] leading-normal mb-9 h-[14px]">
        {variant === 'register' && (
          <>
            <span>{labels.User.logintitletip1}</span>
            <span className="text-blue-400 cursor-pointer">{labels.User.logintitletip2}</span>
            <span>{labels.User.logintitletip3}</span>
            <span className="text-blue-400 cursor-pointer">{labels.User.logintitletip4}</span>
            <span>{labels.User.logintitletip5}</span>
          </>
        )}  
      </div>
    </div>
  );
}
