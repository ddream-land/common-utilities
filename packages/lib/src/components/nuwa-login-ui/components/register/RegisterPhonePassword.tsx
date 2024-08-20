"use client";

import { Button, Input } from "@nextui-org/react";
import { InputClassNames } from "../InputStyle";
import { useLabels } from "../../context/LabelsContext";
import { RegisterVarinats } from "./Register";

export default function RegisterPhonePassword({
  doneing,
  variant,
  password,
  onPasswordChange,
  onDone,
}: {
  doneing: boolean
  variant: RegisterVarinats
  password: string
  onPasswordChange: (code: string) => void
  onDone: () => void
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
    <div className="h-full w-full relative px-8 py-10">
      <div className="flex flex-col gap-3 pt-[68px]">
        <div className="text-white text-xl font-medium font-['PingFang SC'] leading-[18px]">{labelsUser.phonepwtitle}</div>
        <div className="flex flex-row justify-start items-center h-[18px]">
          <div className="text-white/60 text-xs font-normal font-['PingFang SC'] leading-[18px]">{labelsUser.phonepwtip}</div>
        </div>
      </div>
      <div className="py-10 w-full">
        <Input
          color="default"
          type="password"
          size="lg"
          radius="md"
          classNames={InputClassNames}
          placeholder={labels.User.password}
          value={password}
          onChange={(e) => {
            onPasswordChange(e.target.value);
          }}
        />
      </div>
      <div className="h-5">
      </div>
      <div className="w-full mt-[22px] mb-[29px]">
        <Button
          isLoading={doneing}
          color="default"
          size="lg"
          isDisabled={!password}
          className="w-full bg-[#37e89a] text-black rounded-full"
          onPress={onDone}
        >
          {labelsUser.phonepwsubmitbtn}
        </Button>
      </div>
    </div>
  );
}
