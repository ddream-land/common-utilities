"use client";

import { useState } from "react";
import { useLabels } from "../../context/LabelsContext";
import LogoTitle from "../LogoTitle";
import LoginEmail from "./LoginEmail";
import LoginPhone from "./LoginPhone";
import LoginSwitchType from "./LoginSwitchType";

export default function Login({
  loginModel,
  gotoRegister,
  gotoResetPassword,
  onLogin,
  isCloseable = true,
  onClose,
}: {
  loginModel: 'email' | 'phone'
  gotoRegister?: () => void
  gotoResetPassword?: () => void
  onLogin?: () => void
  isCloseable?: boolean
  onClose?: () => void
}) {
  const [ loginType, setLoginType ] = useState<'email' | 'phone'>(loginModel);
  const labels = useLabels();

  return (
    <div className="flex flex-row justify-center items-center h-full w-full relative">
      <div className="w-full h-full flex flex-col justify-between px-8 py-10">
        <form className="w-full flex flex-col">
          <LogoTitle />
          <div className="w-full text-center text-white text-lg font-bold font-['Roboto'] leading-normal mb-3 mt-5">{labels.User.logintitle}</div>
          <div className="w-full text-center text-white text-[9px] font-normal font-['Inter'] leading-normal mb-9">
            <span>{labels.User.logintitletip1}</span>
            <span className="text-blue-400 cursor-pointer">{labels.User.logintitletip2}</span>
            <span>{labels.User.logintitletip3}</span>
            <span className="text-blue-400 cursor-pointer">{labels.User.logintitletip4}</span>
            <span>{labels.User.logintitletip5}</span>
          </div>

          {loginType === 'email' ? (
            <LoginEmail onLogin={onLogin} />
          ) : (
            <LoginPhone
              onLogin={onLogin}
              isCloseable={isCloseable}
              onClose={onClose}
            />
          )}
          <div>
            <div
              className="w-full text-blue-400 text-xs font-normal cursor-pointer"
              onClick={() => {
                gotoResetPassword && gotoResetPassword();
              }}
            >{labels.User.loginforgotpassword}</div>
            <div className="w-full mt-3">
              <span className="text-white text-xs font-normal mr-2">{labels.User.loginsignuptitle}</span>
              <span
                className="text-blue-400 text-xs font-normal cursor-pointer"
                onClick={() => {
                  gotoRegister && gotoRegister();
                }}
              >{labels.User.loginsignuplink}</span>
            </div>
          </div>
        </form>
        <LoginSwitchType loginType={loginType} onChange={setLoginType} />
      </div>
    </div>
  );
}
