"use client";

import { useState } from "react";
import { UploadUserInfoModal } from "../../../user-info/UploadUserInfoModal";
import RegisterEmail from "./RegisterEmail";
import RegisterPhone from "./RegisterPhone";
import RegisterSwitchType from "./RegisterSwitchType";

export type RegisterVarinats = "register" | "resetPassword" | "deleteUser"

export default function Register({
  variant,
  defaultLoginType,
  canSwitchLoginType,
  inviter,
  channel,
  gotoLogin,
  onDone,
  isCloseable = true,
  onClose,
}: {
  variant: RegisterVarinats
  defaultLoginType: 'email' | 'phone'
  canSwitchLoginType?: boolean
  inviter?: number | undefined
  channel?: string | undefined
  gotoLogin?: () => void
  onDone?: () => void
  isCloseable?: boolean
  onClose?: () => void
}) {
  const [ loginType, setLoginType ] = useState<'email' | 'phone'>(defaultLoginType);

  return (
    <div className="h-full w-full relative">
      <div className="w-full h-full flex flex-col justify-between px-8 py-10 relative">
        {loginType === 'email' ? (
          <RegisterEmail
            variant={variant}
            inviter={inviter}
            channel={channel}
            onDone={() => {
              // if (variant === 'register') {
              //   setUserInfoOpen && setUserInfoOpen(true);    
              // } else {
              //   onDone && onDone()
              // }
              onDone && onDone()
            }}
            gotoLogin={gotoLogin}
          />
        ) : (
          <RegisterPhone
            variant={variant}
            inviter={inviter}
            channel={channel}
            isCloseable={isCloseable}
            onClose={onClose}
            onDone={() => {
              // if (variant === 'register') {
              //   setUserInfoOpen && setUserInfoOpen(true);    
              // } else {
              //   onDone && onDone()
              // }
              onDone && onDone()
            }}
            gotoLogin={gotoLogin}
          />
        )}

        {canSwitchLoginType && (
          <RegisterSwitchType
            variant={variant}
            loginType={loginType}
            onChange={setLoginType}
          />
        )}
      </div>
    </div>
  );
}
