"use client";

import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { z } from "zod";
import md5 from "md5"
import { setCookie } from 'typescript-cookie'
import { NUWASESSION, NUWAUID } from "../../../../utils/base.api";
import { login } from "../../utils/login.api";
import { InputClassNames } from "../InputStyle";
import { useAmDispatch } from "../../../../components/alter-message/AlterMessageContextProvider";
import { useLabels } from "../../context/LabelsContext";
import LogoTitle from "../LogoTitle";


export default function Login({
  gotoRegister,
  gotoResetPassword,
  onLogin,
}: {
  gotoRegister?: () => void,
  gotoResetPassword?: () => void,
  onLogin?: () => void;
}) {
  
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const amDispatch = useAmDispatch();
  const labels = useLabels();

  const FormSchema = z.object({
    email: z.string().email({ message: labels.UserFormSchema.email })
  });

  const loginApi = login();


  return (
    <div className="flex flex-row justify-center items-center h-full w-full">
      <div className="w-full h-full flex flex-col justify-between">
        <form className="w-full flex flex-col gap-5">
          <LogoTitle />
          <div className="w-full text-center text-white text-2xl font-bold mb-8 mt-5">{labels.User.logintitle}</div>
          <div className="w-full text-center text-white text-sm font-normal]">{labels.User.logintitle2}</div>
          <Input
            color="default"
            type="email"
            size="md"
            classNames={InputClassNames}
            isInvalid={false}
            errorMessage=""
            label={labels.User.email}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoComplete="on"
          />
          <Input
            color="default"
            type="password"
            size="md"
            classNames={InputClassNames}
            label={labels.User.password}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            autoComplete="on"
          />
          <div>
            <div
              className="w-full text-blue-400 text-xs font-normal cursor-pointer"
              onClick={() => {
                gotoResetPassword && gotoResetPassword();
              }}
            >{labels.User.loginforgotpassword}</div>
            <div className="w-full mt-4">
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
        <Button
          color="default"
          size="lg"
          isDisabled={(!email || !password)}
          isLoading={loginApi.loading}
          className="w-full bg-zinc-800 rounded-2xl text-white"
          onClick={async () => {
            const validatedFields = FormSchema.safeParse({
              email: email,
              password: password
            });
            if (validatedFields.success) {
              const res = await loginApi.send({
                email: email,
                passwd: md5(password)
              });
              if (res && res && res.code === 0) {
                setCookie(NUWAUID, res.data.uid);
                setCookie(NUWASESSION, res.data.session);
                onLogin && onLogin();
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
          }}
        >
          {labels.User.loginsubmit}
        </Button>
      </div>
    </div>
  );
}
