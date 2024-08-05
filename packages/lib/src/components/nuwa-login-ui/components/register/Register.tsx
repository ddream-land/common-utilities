"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { z } from "zod";
import md5 from "md5"
import { mailCode, register } from "../../utils/login.api";
import { InputClassNames } from "../InputStyle";
import { useAmDispatch } from "../../../../components/alter-message/AlterMessageContextProvider";
import { useLabels } from "../../context/LabelsContext";
import { setCookie } from "typescript-cookie";
import { NUWASESSION, NUWAUID } from "../../../../utils/base.api";
import { UploadUserInfoModal } from "../../../user-info/UploadUserInfoModal";
import LogoTitle from "../LogoTitle";


const CountLimit = 60;

export default function Register({
  gotoLogin,
  onRegister,
}: {
  gotoLogin?: () => void,
  onRegister?: () => void;
}) {
  const [ email, setEmail ] = useState('');
  const [ code, setCode ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ requestId, setRequestId] = useState('');
  const [ count, setCount ] = useState(CountLimit);
  const amDispatch = useAmDispatch();
  const labels = useLabels();
  const [ userInfoOpen, setUserInfoOpen ] = useState(false)
  const [sendingCode, setSendingCode] = useState(false)

  const mailCodeApi = mailCode();
  const registerApi = register();
  
  const FormSchema = z.object({
    email: z.string().email({ message: labels.UserFormSchema.email }),
    code: z.string().length(5, { message: labels.UserFormSchema.code }),
    password: z.string().min(6, { message: labels.UserFormSchema.password })
  });

  const onRegisterHandler = async () => {
    const validatedFields = FormSchema.safeParse({
      email: email,
      code: code,
      password: password
    });

    if (validatedFields.success) {
      const res = await registerApi.send({
        email: email,
        code: code,
        passwd: md5(password),
        request_id: requestId,
      });
      if (res && res.code === 0) {
        setCookie(NUWAUID, res.data.uid);
        setCookie(NUWASESSION, res.data.session);
        setUserInfoOpen(true);
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
    const res = await mailCodeApi.send({email: email, type: 1});
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
    <div className="flex flex-row justify-center items-center h-full w-full">
      <div className="w-full h-full flex flex-col justify-between">
        <form className="w-full flex flex-col gap-5">
          <LogoTitle />
          <div className="w-full text-center text-white text-2xl font-bold mb-8 mt-5">{labels.User.registertitle}</div>
          <div className="w-full text-center text-white text-sm font-normal]">{labels.User.logintitle2}</div>
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
              isLoading={sendingCode}
              isDisabled={count !== CountLimit}
              onClick={sendCodeToMailHandler}
            >
              {(count !== CountLimit) ? `${count}s` : labels.User.registersend}
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
          <div>
            <div className="w-full">
              <span className="text-white text-xs font-normal mr-2">{labels.User.registerlogintitle}</span>
              <span
                className="text-blue-400 text-xs font-normal cursor-pointer"
                onClick={() => {
                  gotoLogin && gotoLogin();
                }}
              >{labels.User.registerloginlink}</span>
            </div>
          </div>
        </form>
        <Button
          color="default"
          size="lg"
          isDisabled={(!code || !email || !password)}
          isLoading={registerApi.loading}
          className="w-full bg-zinc-800 rounded-2xl text-white"
          onClick={onRegisterHandler}
        >
          {labels.User.registersubmit}
        </Button>
      </div>

      <UploadUserInfoModal
        isOpen={userInfoOpen}
        onClose={() => {
          setUserInfoOpen(false)
        }}
        onSuccess={() => {
          onRegister && onRegister();
        }}
        locale='en'
      />
    </div>
    
  );
}
