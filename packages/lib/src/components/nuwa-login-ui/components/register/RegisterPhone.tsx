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
import SelectRegionCode from "../login/SelectRegionCode";
import TriangleIcon from "../../icons/TriangleIcon";
import { LoginHeaderButtons } from "../LoginHeaderButtons";
import RegisterPhoneVerifyCode from "./RegisterPhoneVerifyCode";
import RegisterTitle from "./RegisterTitle";
import RegisterPhonePassword from "./RegisterPhonePassword";
import { RegisterVarinats } from "./Register";


const CountLimit = 60;

export default function RegisterPhone({
  variant,
  inviter,
  channel,
  isCloseable = true,
  onClose,
  gotoLogin,
  onDone,
}: {
  variant: RegisterVarinats
  inviter?:  number | undefined
  channel?: string | undefined
  isCloseable?: boolean
  onClose?: () => void
  gotoLogin?: () => void
  onDone?: () => void
}) {
  const [ phone, setPhone ] = useState('');
  const [ code, setCode ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ requestId, setRequestId] = useState('');
  const [ count, setCount ] = useState(CountLimit);
  const [ regionCode, setRegionCode ] = useState('86');
  const amDispatch = useAmDispatch();
  const labels = useLabels();
  const [ selectRegionCodeShow, setSelectRegionCodeShow] = useState(false);
  const [ showRegisterPhoneVerifyCode, setShowRegisterPhoneVerifyCode] = useState(false);
  const [ showRegisterPhonePassword, setShowRegisterPhonePassword] = useState(false);
  const [ sendingCode, setSendingCode] = useState(false)
  const [ doneing, setDoneing] = useState(false)

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
    code: z.string().length(5, { message: labels.UserFormSchema.code }),
    password: z.string().min(6, { message: labels.UserFormSchema.password })
  });

  const onDoneHandler = async () => {
    if (doneing) return;
    setDoneing(true)
    const validatedFields = FormSchema.safeParse({
      code: code,
      password: password
    });

    if (validatedFields.success) {
      let params = {
        phone: phone,
        region_code: regionCode,
        code: code,
        passwd: md5(password),
        request_id: requestId,
        source: 1,
        inviter: inviter,
        channel: channel
      }
      if (!inviter || variant === "resetPassword" || variant === "deleteUser") {
        delete params.inviter
      }

      if (!channel || variant === "resetPassword" || variant === "deleteUser") {
        delete params.channel
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
        setShowRegisterPhoneVerifyCode(false);
        setShowRegisterPhonePassword(false);
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

    setDoneing(false)
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
      setShowRegisterPhoneVerifyCode(true);
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
    <>
      <div>
        <RegisterTitle variant={variant} />

        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-2 justify-center items-center">
            <div
              className=" cursor-pointer shrink-0 w-[80px] h-[50px] bg-[#323239] rounded-xl flex flex-row gap-2 justify-center items-center"
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
            onClick={sendCodeToPhoneHandler}
          >
            {labelsUser.send}
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
      
      {selectRegionCodeShow && (
        <div className=" absolute left-0 top-0 w-full h-full z-10">
          <SelectRegionCode onValueChange={(newValue) => {
            setRegionCode(newValue);
            setSelectRegionCodeShow(false);
          }} />
        </div>
      )}

      {showRegisterPhoneVerifyCode && (
        <div className="absolute left-0 top-0 w-full h-full z-10 bg-[#191919]">
          <LoginHeaderButtons
            canGoBack={true}
            onGoBack={() => {
              setShowRegisterPhoneVerifyCode(false);
            }}
            isCloseable={isCloseable}
            onClose={onClose}
          />
          <RegisterPhoneVerifyCode
            variant={variant}
            phone={phone}
            regionCode={regionCode}
            requestId={requestId}
            count={count}
            code={code}
            onCodeChange={setCode}
            sendCode={sendCodeToPhoneHandler}
            verifySuccess={() => {
              setShowRegisterPhoneVerifyCode(false);
              setShowRegisterPhonePassword(true);
            }}
          />
        </div>
      )}

      {showRegisterPhonePassword && (
        <div className="absolute left-0 top-0 w-full h-full z-10 bg-[#191919]">
          <LoginHeaderButtons
            canGoBack={true}
            onGoBack={() => {
              setShowRegisterPhoneVerifyCode(true);
              setShowRegisterPhonePassword(false);
            }}
            isCloseable={isCloseable}
            onClose={onClose}
          />
          <RegisterPhonePassword
            doneing={doneing}
            variant={variant}
            password={password}
            onPasswordChange={setPassword}
            onDone={onDoneHandler}
          />
        </div>
      )}
    </>
  );
}
