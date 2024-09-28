"use client";

import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { InputClassNames } from "../InputStyle";
import { useAmDispatch } from "../../../../components/alter-message/AlterMessageContextProvider";
import { useLabels } from "../../context/LabelsContext";
import SelectRegionCode from "./SelectRegionCode";
import TriangleIcon from "../../icons/TriangleIcon";
import LoginPhonePassword from "./LoginPhonePassword";
import LoginPhoneVerifyCode from "./LoginPhoneVerifyCode";
import { LoginHeaderButtons } from "../LoginHeaderButtons";

export default function LoginPhone({
  onLogin,
  isCloseable = true,
  onClose,
}: {
  onLogin?: () => void
  isCloseable?: boolean
  onClose?: () => void
}) {
  
  const [ phone, setPhone ] = useState('');
  const [ regionCode, setRegionCode ] = useState('86');
  const [ password, setPassword ] = useState('');
  const [ selectRegionCodeShow, setSelectRegionCodeShow] = useState(false);
  const [ showLoginPhonePassword, setShowLoginPhonePassword] = useState(false);
  const [ showLoginPhoneVerifyCode, setShowLoginPhoneVerifyCode] = useState(false);
  const amDispatch = useAmDispatch();
  const labels = useLabels();

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-2 justify-center items-center">
          <div
            className=" cursor-pointer shrink-0 w-[80px] h-[36px] bg-[#323239] rounded-xl flex flex-row gap-2 justify-center items-center"
            onClick={() => {
              setSelectRegionCodeShow(true);
            }}
          >
            <div className="text-[#eeeeee] text-sm font-normal font-['ABeeZee'] leading-snug tracking-wider">+{regionCode}</div>
            <TriangleIcon className="w-3 h-3" />
          </div>
          <Input
            color="default"
            type="email"
            size="lg"
            radius="md"
            classNames={InputClassNames}
            isInvalid={false}
            errorMessage=""
            placeholder={labels.User.phone}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            autoComplete="on"
          />  
        </div>
      </div>
      <div className="w-full mt-[22px] mb-[29px]">
        <Button
          color="default"
          size="lg"
          isDisabled={!phone}
          className="w-full bg-[#37e89a] text-black rounded-full"
          onClick={() => setShowLoginPhoneVerifyCode(true)}
        >
          {labels.User.loginsubmitbtn}
        </Button>
      </div>
      {selectRegionCodeShow && (
        <div className=" absolute left-0 top-0 w-full h-full z-10 bg-[#191919]">
          <SelectRegionCode onValueChange={(newValue) => {
            setRegionCode(newValue);
            setSelectRegionCodeShow(false);
          }} />
        </div>
      )}
      {showLoginPhonePassword && (
        <div className=" absolute left-0 top-0 w-full h-full z-10 bg-[#191919]">
          <LoginHeaderButtons
            canGoBack={true}
            onGoBack={() => {
              setShowLoginPhonePassword(false);
            }}
            isCloseable={isCloseable}
            onClose={onClose}
          />
          <LoginPhonePassword
            phone={phone}
            regionCode={regionCode}
            onLogin={() => onLogin && onLogin()}
            gotoLoginPhoneVerifyCode={() => {
              setShowLoginPhoneVerifyCode(true)
              setShowLoginPhonePassword(false);
            }}
          />
        </div>
      )}
      {showLoginPhoneVerifyCode && (
        <div className=" absolute left-0 top-0 w-full h-full z-10 bg-[#191919]">
          <LoginHeaderButtons
            canGoBack={true}
            onGoBack={() => {
              setShowLoginPhoneVerifyCode(false);
            }}
            isCloseable={isCloseable}
            onClose={onClose}
          />
          <LoginPhoneVerifyCode  
            phone={phone}
            regionCode={regionCode}
            onLogin={() => onLogin && onLogin()}
            gotoLoginPhonePassword={() => {
              setShowLoginPhoneVerifyCode(false)
              setShowLoginPhonePassword(true);
            }}
          />
        </div>
      )}

    </>
);
}
