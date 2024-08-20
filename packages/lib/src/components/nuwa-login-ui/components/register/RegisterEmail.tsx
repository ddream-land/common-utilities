"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { z } from "zod";
import md5 from "md5"
import { deleteUser, mailCode, register, resetPassword } from "../../utils/login.api";
import { InputClassNames } from "../InputStyle";
import { useAmDispatch } from "../../../../components/alter-message/AlterMessageContextProvider";
import { useLabels } from "../../context/LabelsContext";
import { setCookie } from "typescript-cookie";
import { deleteLoginCookie, NUWASESSION, NUWAUID } from "../../../../utils/base.api";
import RegisterTitle from "./RegisterTitle";
import { RegisterVarinats } from "./Register";


const CountLimit = 60;

export default function RegisterEmail({
  variant,
  inviter,
  gotoLogin,
  onDone,
}: {
  variant: RegisterVarinats
  inviter?:  number | undefined
  gotoLogin?: () => void;
  onDone?: () => void
}) {
  const [ email, setEmail ] = useState('');
  const [ code, setCode ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ requestId, setRequestId] = useState('');
  const [ count, setCount ] = useState(CountLimit);
  const amDispatch = useAmDispatch();
  const labels = useLabels()
  const [sendingCode, setSendingCode] = useState(false)


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

  const mailCodeApi = mailCode();
  const registerApi = register();
  const resetPasswordApi = resetPassword();
  const deleteUserApi = deleteUser();
  
  const FormSchema = z.object({
    email: z.string().email({ message: labels.UserFormSchema.email }),
    code: z.string().length(5, { message: labels.UserFormSchema.code }),
    password: z.string().min(6, { message: labels.UserFormSchema.password })
  });

  const onDoneHandler = async () => {
    const validatedFields = FormSchema.safeParse({
      email: email,
      code: code,
      password: password
    });

    if (validatedFields.success) {
      let params = {
        email: email,
        code: code,
        passwd: md5(password),
        request_id: requestId,
        source: 2,
        inviter: inviter
      }
      if (!inviter || variant === "resetPassword" || variant === "deleteUser") {
        delete params.inviter
      }
      let res;
      switch(variant) {
        case "register":
          res = await registerApi.send(params);
          break;
        case "resetPassword":
          res = await resetPasswordApi.send(params);
          break;
        case "deleteUser":
          res = await deleteUserApi.send(params);
          break;
      }
            
      if (res && res.code === 0) {
        if (variant === 'register') {
          setCookie(NUWAUID, res.data.uid);
          setCookie(NUWASESSION, res.data.session);
        }
        if (variant === 'deleteUser') {
          deleteLoginCookie();
        }
        onDone && onDone();
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

  const sendCodeToMailHandler = async () => {
    if (sendingCode) return
    setSendingCode(true)
    const res = await mailCodeApi.send({
      email: email,
      type: 1,
      source: 2
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

  return (
    <div>
      <RegisterTitle variant={variant} />

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
          endContent={
            <div className="h-full w-[120px] flex flex-row justify-center items-center py-[1px]">
              <Button
                variant="solid"
                className="text-white bg-transparent"
                size="sm"
                color="default"
                isLoading={sendingCode}
                isDisabled={count !== CountLimit}
                onClick={sendCodeToMailHandler}
              >
                {(count !== CountLimit) ? `${count}s` : labelsUser.send}
              </Button>
            </div>
          }
        />
        <Input
          color="default"
          type="text"
          size="sm"
          radius="md"
          classNames={InputClassNames}
          label={labels.User.code}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
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
        />
      </div>
      <div className="w-full mt-[22px] mb-[29px]">
        <Button
          color="default"
          size="lg"
          isDisabled={(!code || !email || !password)}
          isLoading={registerApi.loading}
          className="w-full bg-[#37e89a] text-black rounded-full"
          onClick={onDoneHandler}
        >
          {labelsUser.submit}
        </Button>
      </div>

      {variant === "register" && (
        <div className="w-full">
          <span className="text-white text-xs font-normal mr-2">{labels.UserRegister.logintitle}</span>
          <span
            className="text-blue-400 text-xs font-normal cursor-pointer"
            onClick={() => {
              gotoLogin && gotoLogin();
            }}
          >{labels.UserRegister.loginlink}</span>
        </div> 
      )}
    </div>
  );
}
