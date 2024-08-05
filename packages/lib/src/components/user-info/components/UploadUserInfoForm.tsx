'use client'

import {
  Button,
  Input,
  Skeleton,
} from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'
import { useLabels } from '../context/LabelsContext'
import { useLocale } from '../context/LocaleContext'
import { editUserInfo, getUserInfo } from '../api/user.api'
import { UserType } from '../../../types/definitions.user'
import UploadAvatar from '../../upload-file/UploadAvatar'


export type UploadUserInfoFormProps = {
  onSuccess?: () => void,
}

export function UploadUserInfoForm({
  onSuccess,
}: UploadUserInfoFormProps) {
  const initialized = useRef(false);
  const locale = useLocale();
  const labels = useLabels();

  const getUserInfoApi = getUserInfo();
  const editUserInfoApi = editUserInfo();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [userInfoForm, setUserInfoForm] = useState({
    name: '',
    avatar: '',
  });

  const currentFormData= useRef(userInfoForm)

  useEffect(() => {
    currentFormData.current = userInfoForm
  })


  const getUserInfoServer = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const res = await getUserInfoApi.send({});
    if (res && res.code === 0) {
      setUserInfoForm({
        name: res.data.name,
        avatar: res.data.avatar,
      });
    }

    setLoading(false);
  };
  const saveUserInfoHandler = () => {
    setSaving(true);
    editUserInfoApi.send({
      name: userInfoForm.name,
      avatar: userInfoForm.avatar,
    }).then((res) => {
      if (res && res.code === 0) {
        onSuccess && onSuccess();
      }
    }).finally(() => {
      setSaving(false);
    });
  }
  
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    getUserInfoServer();
  }, [])

  return (
    <div className="w-full h-[600px] bg-neutral-950 rounded-[14px] border border-neutral-600">
      <div className="text-center text-white text-2xl font-normal leading-normal mt-[60px] h-[72px]">{labels.User.title1}<br/>{labels.User.title2}</div>
      <div className="text-center text-white text-[22px] font-normal leading-normal mt-[25px] h-[33px]">{labels.User.avatar}</div>
      
      <div className="mt-[28px] flex flex-row justify-center items-center">
        <div className="h-[164px] w-[164px]">
          {loading ? (
            <Skeleton className="w-full h-full rounded-full">
              <div className="h-full w-full rounded-full bg-secondary"></div>
            </Skeleton>
          ): (
            <UploadAvatar
              fileName={userInfoForm.avatar}
              onDone={(file) => {
                setUserInfoForm({ ...currentFormData.current, avatar: file.url})
              }}
              locale={locale}
            />
          )}
        </div>
      </div>

      <div className="justify-center items-center flex mt-[45px] px-[100px]">
        {loading ? (
          <div className='w-full h-[74px] flex flex-col justify-between items-start'>
            <Skeleton className="w-[90px] h-5 rounded-md">
              <div className="h-full w-full rounded-lg bg-secondary"></div>
            </Skeleton>
            <Skeleton className="w-full h-[48px] rounded-lg">
              <div className="h-full w-full rounded-lg bg-secondary"></div>
            </Skeleton>
          </div>
        ): (
          <Input
            variant='faded'
            size="lg"
            value={userInfoForm.name}
            label={labels.User.userNameLabel}
            labelPlacement="outside"
            placeholder={labels.User.userNamePlaceholder}
            onChange={(e) => setUserInfoForm({ ...userInfoForm, name: e.target.value })}
          />
        )}
      </div>

      <div className='mt-5 flex flex-row justify-center items-center'>
        <Button
            color="primary"
            size="lg"
            isLoading={saving}
            isDisabled={userInfoForm.name.length === 0}
            className="bg-cyan-500 w-[200px]"
            onPress={() => {
              saveUserInfoHandler();
            }}
          >
            {labels.User.save}
          </Button>
      </div>
    </div>
  )
}
