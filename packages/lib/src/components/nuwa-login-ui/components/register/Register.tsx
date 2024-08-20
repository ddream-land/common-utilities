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
  gotoLogin,
  onDone,
  isCloseable = true,
  onClose,
}: {
  variant: RegisterVarinats
  defaultLoginType: 'email' | 'phone'
  canSwitchLoginType?: boolean
  inviter?: number | undefined
  gotoLogin?: () => void
  onDone?: () => void
  isCloseable?: boolean
  onClose?: () => void
}) {
  const [ loginType, setLoginType ] = useState<'email' | 'phone'>(defaultLoginType);
  const [ userInfoOpen, setUserInfoOpen ] = useState(false)

  return (
    <div className="h-full w-full relative">
      <div className="w-full h-full flex flex-col justify-between px-8 py-10 relative">
        {loginType === 'email' ? (
          <RegisterEmail
            variant={variant}
            inviter={inviter}
            onDone={() => {
              if (variant === 'register') {
                setUserInfoOpen(true);    
              }
            }}
            gotoLogin={gotoLogin}
          />
        ) : (
          <RegisterPhone
            variant={variant}
            inviter={inviter}
            isCloseable={isCloseable}
            onClose={onClose}
            onDone={() => {
              if (variant === 'register') {
                setUserInfoOpen(true);    
              }
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

      <UploadUserInfoModal
        isOpen={userInfoOpen}
        onClose={() => {
          setUserInfoOpen(false)
        }}
        onSuccess={() => {
          onDone && onDone();
        }}
        locale='en'
      />
    </div>
  );
}
