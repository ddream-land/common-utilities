"use client";

import { Button, Input } from "@nextui-org/react";
import { InputClassNames } from "../InputStyle";
import { useLabels } from "../../context/LabelsContext";
import { z } from "zod";
import { phoneCodeVerify } from "../../utils/login.api";
import { useAmDispatch } from "../../../../components/alter-message/AlterMessageContextProvider";
import { RegisterVarinats } from "./Register";
import { useState } from "react";

const CountLimit = 60;

export default function RegisterPhoneVerifyCode({
  variant,
  phone,
  regionCode,
  requestId,
  count,
  code,
  onCodeChange,
  sendCode,
  verifySuccess,
}: {
  variant: RegisterVarinats
  phone: string
  regionCode: string
  requestId: string
  count: number
  code: string
  onCodeChange: (code: string) => void
  sendCode: () => void
  verifySuccess: () => void
}) {
  const labels = useLabels();
  const phoneCodeVerifyApi = phoneCodeVerify();
  const amDispatch = useAmDispatch();
  const [ verifing, setVerifing ] = useState(false);


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


  const FormSchema = z.object({
    code: z.string().length(5, { message: labels.UserFormSchema.code })
  });

  const onVerifyHandler = async () => {
    if (verifing) return
    setVerifing(true)
    const validatedFields = FormSchema.safeParse({
      code: code
    });

    if (validatedFields.success) {
      const res = await phoneCodeVerifyApi.send({
        phone: phone,
        region_code: regionCode,
        code: code,
        request_id: requestId
      });
      if (res && res.code === 0) {
        verifySuccess();
      }
    } else {
      validatedFields.error.issues.map((item) => {
        amDispatch({
          type: "add",
          payload: {
            message: item.message,
            type: "error",
          },
        });
      })
    }


    setVerifing(false)
  }

  return (
    <div className="h-full w-full relative px-8 py-10">
      <div className="flex flex-col gap-3 pt-[68px]">
        <div className="text-white text-xl font-medium font-['PingFang SC'] leading-[18px]">{labels.UserRegister.phoneverifycodetip1}</div>
        <div className="flex flex-row justify-start items-center">
          <div className="text-white/60 text-xs font-normal font-['PingFang SC'] leading-[18px]">{labels.UserRegister.phoneverifycodetip2}</div>
          <div className="text-white text-xs font-medium font-['PingFang SC'] leading-[18px]">+{regionCode} {phone}</div>
        </div>
      </div>
      <div className="py-10 w-full">
        <Input
          color="default"
          type="text"
          size="lg"
          radius="md"
          classNames={InputClassNames}
          placeholder={labels.User.code}
          value={code}
          onChange={(e) => {
            onCodeChange(e.target.value);
          }}
        />
      </div>
      <div className="h-5">
        {count === CountLimit ? (
          <div className="text-[#37e89a] text-xs font-medium font-['PingFang SC'] leading-[17px] cursor-pointer" onClick={sendCode}>{labels.UserRegister.phoneregetcode}</div> 
        ): (
          <div className="text-white/40 text-xs font-normal font-['PingFang SC'] leading-[17px]">{count} {labels.UserRegister.phoneregetcodecountdown}</div>
        )}
      </div>
      <div className="w-full mt-[22px] mb-[29px]">
        <Button
          isLoading={verifing}
          color="default"
          size="lg"
          isDisabled={!code}
          className="w-full bg-[#37e89a] text-black rounded-full"
          onPress={onVerifyHandler}
        >
          {labels.UserRegister.verification}
        </Button>
      </div>
    </div>
  );
}
