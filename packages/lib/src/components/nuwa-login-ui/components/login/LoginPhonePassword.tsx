"use client";

import { Button, Input } from "@nextui-org/react";
import { InputClassNames } from "../InputStyle";
import { useLabels } from "../../context/LabelsContext";
import { useState } from "react";
import { login } from "../../utils/login.api";
import md5 from "md5"
import { setCookie } from 'typescript-cookie'
import { NUWASESSION, NUWAUID } from "../../../../utils/base.api";
import { useAmDispatch } from "../../../../components/alter-message/AlterMessageContextProvider";

export default function LoginPhonePassword({
  phone,
  regionCode,
  onLogin,
  gotoLoginPhoneVerifyCode,
}: {
  phone: string
  regionCode: string
  onLogin: () => void
  gotoLoginPhoneVerifyCode: () => void
}) {
  const labels = useLabels();
  const [ password, setPassword ] = useState('');
  const loginApi = login();
  const amDispatch = useAmDispatch();
  const [submitting, setSubmitting] = useState(false)


  const onLoginPhonePasswordSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    const res = await loginApi.send({
      phone: phone,
      region_code: regionCode,
      passwd: md5(password),
      source: 1,
    });
    if (res && res && res.code === 0) {
      setCookie(NUWAUID, res.data.uid);
      setCookie(NUWASESSION, res.data.session);
      onLogin && onLogin();
    }
    setSubmitting(false);
  }

  return (
    <div className="h-full w-full relative px-8 py-10">
      <div className="flex flex-col gap-3 pt-[68px]">
        <div className="text-white text-xl font-medium font-['PingFang SC'] leading-[18px]">{labels.User.loginenterpassword}</div>
        <div className="flex flex-row justify-start items-center h-[18px]">
          <div className="text-white/60 text-xs font-normal font-['PingFang SC'] leading-[18px]"></div>
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
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="h-5">
      </div>
      <div className="w-full mt-[22px] mb-[29px]">
        <Button
          color="default"
          size="lg"
          isDisabled={!password}
          isLoading={submitting}
          className="w-full bg-[#37e89a] text-black rounded-full"
          onPress={onLoginPhonePasswordSubmit}
        >
          {labels.User.loginsubmitbtn}
        </Button>
      </div>
      <div onClick={gotoLoginPhoneVerifyCode} className=" cursor-pointer mt-3 text-center text-[#37e89a] text-xs font-medium font-['PingFang SC'] leading-[17px]">{labels.User.loginpwtip}</div>
    </div>
  );
}
