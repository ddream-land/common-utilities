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


export default function LoginEmail({
  onLogin,
}: {
  onLogin?: () => void;
}) {
  
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const amDispatch = useAmDispatch();
  const labels = useLabels();

  const loginApi = login();

  const onEmailLoginSubmit = async () => {
    const FormSchema = z.object({
      email: z.string().email({ message: labels.UserFormSchema.email })
    });
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
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <Input
          color="default"
          type="email"
          size="sm"
          radius="md"
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
          size="sm"
          radius="md"
          classNames={InputClassNames}
          label={labels.User.password}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          autoComplete="on"
        />
      </div>
      <div className="w-full mt-[22px] mb-[29px]">
        <Button
          color="default"
          size="lg"
          isDisabled={(!email || !password)}
          isLoading={loginApi.loading}
          className="w-full bg-[#37e89a] text-black rounded-full"
          onClick={onEmailLoginSubmit}
        >
          {labels.User.loginsubmitbtn}
        </Button>
      </div>
    </>
  );
}
