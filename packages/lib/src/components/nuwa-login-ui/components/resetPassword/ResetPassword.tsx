"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { z } from "zod";
import md5 from "md5"
import { mailCode, resetPassword } from "../../utils/login.api";
import { InputClassNames } from "../InputStyle";
import { useAmDispatch } from "../../../../components/alter-message/AlterMessageContextProvider";
import { useLabels } from "../../context/LabelsContext";
import LogoTitle from "../LogoTitle";


const CountLimit = 60;

export default function ResetPassword({
  onResetPassword
}: {
  onResetPassword?: () => void;
}) {
  const [ email, setEmail ] = useState('');
  const [ code, setCode ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ requestId, setRequestId] = useState('');
  const [ count, setCount ] = useState(CountLimit);
  const amDispatch = useAmDispatch();
  const labels = useLabels();

  const mailCodeApi = mailCode();
  const resetPasswordApi = resetPassword();

  const FormSchema = z.object({
    email: z.string().email({ message: labels.UserFormSchema.email }),
    code: z.string().length(5, { message: labels.UserFormSchema.code }),
    password: z.string().min(6, { message: labels.UserFormSchema.password }),
    requestId: z.string()
  });

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

  return (
    <div className="flex flex-row justify-center items-center h-full w-full">
      <div className="w-full h-full flex flex-col justify-between">
        <form className="w-full flex flex-col gap-5">
          <LogoTitle />
          <div className="w-full text-center text-white text-2xl font-bold mb-8 mt-5">{labels.UserResetPassword.title}</div>
          <Input
            autoComplete="off"
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
            endContent={
            <Button
              variant="solid"
              className="text-white bg-transparent"
              color="default"
              isLoading={mailCodeApi.loading}
              isDisabled={count !== CountLimit}
              onClick={async () => {
                const res = await mailCodeApi.send({email: email, type: 2});
                if (res && res.code === 0) {
                  setRequestId(res.data.request_id)
                  setCount(CountLimit - 1)
                }
              }}
            >
              {(count !== CountLimit) ? `${count}s` : labels.UserResetPassword.send}
            </Button>
            }
          />
          <Input
            autoComplete="off"
            color="default"
            type="text"
            size="md"
            classNames={InputClassNames}
            label={labels.User.code}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <Input
            autoComplete="off"
            color="default"
            type="password"
            size="md"
            classNames={InputClassNames}
            label={labels.User.password}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </form>
        <Button
          color="default"
          size="lg"
          isDisabled={(!code || !email || !password)}
          isLoading={resetPasswordApi.loading}
          className="w-full bg-zinc-800 rounded-2xl text-white"
          onClick={async () => {
            const validatedFields = FormSchema.safeParse({
              email: email,
              code: code,
              password: password,
              requestId: requestId,
            });

            if (validatedFields.success) {
              const res = await resetPasswordApi.send({
                email: email,
                code: code,
                passwd: md5(password),
                request_id: requestId,
              });
              if (res && res.code === 0) {
                onResetPassword && onResetPassword();
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
          {labels.UserResetPassword.submit}
        </Button>
      </div>
      
    </div>
    
  );
}
