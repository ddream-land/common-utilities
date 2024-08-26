"use client";

import { Button, Input } from "@nextui-org/react";
import { InputClassNames } from "../InputStyle";
import { useLabels } from "../../context/LabelsContext";
import { z } from "zod";
import { codeLogin, mailCode } from "../../utils/login.api";
import { useAmDispatch } from "../../../../components/alter-message/AlterMessageContextProvider";
import { useEffect, useRef, useState } from "react";
import { setCookie } from 'typescript-cookie'
import { NUWASESSION, NUWAUID } from "../../../../utils/base.api";

const CountLimit = 60;

export default function LoginPhoneVerifyCode({
  phone,
  regionCode,
  onLogin,
  gotoLoginPhonePassword,
}: {
  phone: string
  regionCode: string
  onLogin: () => void
  gotoLoginPhonePassword: () => void
}) {
  const initialized = useRef(false);
  const labels = useLabels();
  const amDispatch = useAmDispatch();
  const [ count, setCount ] = useState(CountLimit);
  const [ code, setCode ] = useState('');
  const [requestId, setRequestId] = useState('');
  const [ sendingCode, setSendingCode] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const loginApi = codeLogin();
  const mailCodeApi = mailCode();


  const onLoginPhoneVerfiyCodeSubmit = async () => {
    if (submitting) return;
    setSubmitting(true)
    const res = await loginApi.send({
      source: 1,
      phone: phone,
      region_code: regionCode,
      type: 4,
      request_id: requestId,
      code: code
    });
    if (res && res && res.code === 0) {
      setCookie(NUWAUID, res.data.uid);
      setCookie(NUWASESSION, res.data.session);
      onLogin && onLogin();
    }

    setSubmitting(false)
  }


  const sendCodeToPhoneHandler = async () => {
    if (sendingCode) return
    setSendingCode(true)
    const res = await mailCodeApi.send({
      phone: phone,
      region_code: regionCode,
      type: 1,
      source: 1
    });
    if (res && res.code === 0) {
      setRequestId(res.data.request_id)
      setCount(CountLimit - 1)
    }
    setSendingCode(false)
  }


  useEffect(() => {
    if (count === CountLimit) {
      return;
    }
    if (count === 0) {
      setCount(CountLimit)
    } else {
      setTimeout(() => {
        setCount(count - 1)
      }, 1000)
    }
  }, [count])

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    sendCodeToPhoneHandler();
  }, [])

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
            setCode(e.target.value);
          }}
        />
      </div>
      <div className="h-5">
        {count === CountLimit ? (
          <div className="text-[#37e89a] text-xs font-medium font-['PingFang SC'] leading-[17px] cursor-pointer" onClick={sendCodeToPhoneHandler}>{labels.UserRegister.phoneregetcode}</div> 
        ): (
          <div className="text-white/40 text-xs font-normal font-['PingFang SC'] leading-[17px]">{count} {labels.UserRegister.phoneregetcodecountdown}</div>
        )}
      </div>
      <div className="w-full mt-[22px] mb-[29px]">
        <Button
          color="default"
          size="lg"
          isDisabled={!code}
          isLoading={submitting}
          className="w-full bg-[#37e89a] text-black rounded-full"
          onPress={onLoginPhoneVerfiyCodeSubmit}
        >
          {labels.User.loginsubmitbtn}
        </Button>
      </div>
      <div onClick={gotoLoginPhonePassword} className="cursor-pointer mt-3 text-center text-[#37e89a] text-xs font-medium font-['PingFang SC'] leading-[17px]">{labels.User.loginvctip}</div>
    </div>
  );
}
