"use client";
import { Button, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { z } from "zod";
import CreateDigitalLifeFigure from "./CreateDigitalLifeFigure";
import CreateDigitalLifeVoice from "./CreateDigitalLifeVoice";
import CreateDigitalLifeAvatar from "./CreateDigitalLifeAvatar";
import TagsInput from "../ui/TagsInput";
import { useEffect, useRef, useState } from "react";
import { useLabels } from "../../context/LabelsContext";
import { useAmDispatch } from "../../../../components/alter-message/AlterMessageContextProvider";
import { charaCreateFormDefault, charaCreateFormType, charaGenerateDataType } from "../../definitions";
import { charaCreate } from "../../utils/characters.api";

function CreateDigitalLifeForm({
  variant,
  avatarMax,
  voiceMax,
  charaGenerateData,
  onPrevious,
  onSuccess
}: {
  variant: 'custom' | 'default'
  avatarMax: number,
  voiceMax: number,
  charaGenerateData: charaGenerateDataType | undefined
  onPrevious: () => void
  onSuccess: (response: any) => void
}) {
  const labels = useLabels();
  const amDispatch = useAmDispatch();

  const initFormData:charaCreateFormType = {
    ...charaCreateFormDefault
  }
  if (charaGenerateData) {
    initFormData.ch_name = charaGenerateData.name;
    initFormData.description = charaGenerateData.description;
    initFormData.first_mes = charaGenerateData.greeting_message;
    initFormData.mes_example = charaGenerateData.speech_style;
    initFormData.tags = charaGenerateData.tag.split(',');
  }
  const [formData, setFormData] = useState(initFormData);

  const currentFormData= useRef(formData)
  
  const [creating, setCreating] = useState(false);
  const charaCreateApi = charaCreate();


  const FormSchema = z.object({
    avatar: z.string({
      required_error: labels.FormSchema.avatar,
    }).min(1, { message: labels.FormSchema.avatar}),
    ch_name: z.string({
      required_error: labels.FormSchema.ch_name,
    }).min(1, { message: labels.FormSchema.ch_name}),
    description: z.string({
      required_error: labels.FormSchema.description,
    }).min(1, { message: labels.FormSchema.description}),
    first_mes: z.string({
      required_error: labels.FormSchema.first_mes,
    }).min(1, { message: labels.FormSchema.first_mes}),
  });

  const charaCreateServer = async () => {
    if (creating) return;
    setCreating(true);


    const validatedFields = FormSchema.safeParse({
      avatar: formData.avatar,
      ch_name: formData.ch_name,
      description: formData.description,
      first_mes: formData.first_mes
    });

    if (validatedFields.success) {
      const res = await charaCreateApi.send({
        ...formData
      });
      if (res && res.code === 0) {
        onSuccess && onSuccess(res);
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
    
    setCreating(false);
  }

  useEffect(() => {
    currentFormData.current = formData
  })

  return (
    <div className="flex flex-col items-center justify-center py-[64px]">
      
      <div className="w-2/3">
        <div className="flex-col justify-start items-start gap-5 inline-flex">
          <div className="self-stretch justify-start items-center gap-2 inline-flex">
            <div className="text-white text-5xl font-semibold font-['Inter'] leading-[48px]">
              {labels.CreateDigitalLifeModal.title}
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 divide-y divide-white/10">

        <div className="flex justify-center w-full py-[60px]">
          <CreateDigitalLifeFigure value={formData.avatar} onChange={(value) => setFormData({ ...currentFormData.current, avatar: value })} />
        </div>
        
        <div className="w-full flex-col justify-start items-start gap-8 inline-flex py-[60px]">
          <Textarea
            variant="bordered"
            color="default"
            label={labels.CreateDigitalLifeModal.name}
            labelPlacement="outside"
            placeholder={labels.CreateDigitalLifeModal.namePlaceholder}
            className="w-full"
            size="sm"
            radius="md"
            minRows={5}
            maxRows={5}
            value={formData.ch_name}
            onChange={(e) => setFormData({ ...currentFormData.current, ch_name: e.target.value })}
          />
          <Textarea
            variant="bordered"
            color="default"
            label={labels.CreateDigitalLifeModal.description}
            labelPlacement="outside"
            placeholder={labels.CreateDigitalLifeModal.descriptionPlaceholder}
            className="w-full"
            size="sm"
            radius="md"
            minRows={5}
            maxRows={5}
            value={formData.description}
            onChange={(e) => setFormData({ ...currentFormData.current, description: e.target.value })}
          />
          <Textarea
            variant="bordered"
            color="default"
            label={labels.CreateDigitalLifeModal.speechStyle}
            labelPlacement="outside"
            placeholder={labels.CreateDigitalLifeModal.speechStylePlaceholder}
            className="w-full"
            size="sm"
            radius="md"
            minRows={5}
            maxRows={5}
            value={formData.mes_example}
            onChange={(e) => setFormData({ ...currentFormData.current, mes_example: e.target.value })}
          />
          <Textarea
            variant="bordered"
            color="default"
            label={labels.CreateDigitalLifeModal.greetingMessage}
            labelPlacement="outside"
            placeholder={labels.CreateDigitalLifeModal.greetingMessagePlaceholder}
            className="w-full"
            size="sm"
            radius="md"
            minRows={5}
            maxRows={5}
            value={formData.first_mes}
            onChange={(e) => setFormData({ ...currentFormData.current, first_mes: e.target.value })}
          />
        </div>
        <div className="py-[60px]">
          <CreateDigitalLifeVoice
            max={voiceMax}
            value={formData.extensions.nuwa_voices}
            onChange={(value) => {
              setFormData({
                ...currentFormData.current,
                extensions: {
                  ...currentFormData.current.extensions,
                  nuwa_voices: value
                }
              })
            }}
          />
        </div>
        <div className="py-[60px]">
          <CreateDigitalLifeAvatar
            max={avatarMax}
            value={formData.extensions.nuwa_avatars}
            onChange={(value) => {
              setFormData({
                ...currentFormData.current,
                extensions: {
                  ...currentFormData.current.extensions,
                  nuwa_avatars: value
                }
              })
            }}
          />
        </div>
        <div className="w-full flex-col justify-start items-start gap-8 inline-flex py-[60px]">
          <div className="w-full">
            <div className="mb-2 text-foreground text-tiny font-semibold font-['Inter'] leading-normal">{labels.CreateDigitalLifeModal.tag}</div>
            <TagsInput
              value={formData.tags}
              onValueChange={(newTags) => {
                setFormData({ ...currentFormData.current, tags: newTags })
              }}
              placeholder={labels.CreateDigitalLifeModal.tagPlaceholder}
            />
          </div>
          <Textarea
              variant="bordered"
              color="default"
              label={labels.CreateDigitalLifeModal.creatorNotes}
              labelPlacement="outside"
              placeholder={labels.CreateDigitalLifeModal.creatorNotesPlaceholder}
              className="w-full"
              size="sm"
              radius="md"
              minRows={5}
              maxRows={5}
              value={formData.creator_notes}
              onChange={(e) => setFormData({ ...currentFormData.current, creator_notes: e.target.value })}
            />
        </div>
        <div className="w-full flex-col justify-start items-start gap-8 inline-flex py-[60px]">
          <RadioGroup
            label={labels.CreateDigitalLifeModal.publicationType}
            classNames={{
              label: "text-white text-base font-semibold font-['Inter'] leading-normal"
            }}
            value={formData.type}
            onChange={(e) => setFormData({ ...currentFormData.current, type: e.target.value })}
          >
            <Radio classNames={{ control: "bg-cyan-500", wrapper: "group-data-[selected=true]:border-cyan-500" }} value="public">{labels.CreateDigitalLifeModal.publicationPublic}</Radio>
            <Radio classNames={{ control: "bg-cyan-500", wrapper: "group-data-[selected=true]:border-cyan-500" }} value="privacy">{labels.CreateDigitalLifeModal.publicationPrivacy}</Radio>
          </RadioGroup>
          <RadioGroup
            label={labels.CreateDigitalLifeModal.downloadPermission}
            classNames={{
              label: "text-white text-base font-semibold font-['Inter'] leading-normal"
            }}
            value={formData.download_permission ? 'allowed' : 'declined'}
            onChange={(e) => setFormData({ ...currentFormData.current, download_permission: e.target.value === 'allowed' })}
          >
            <Radio classNames={{ control: "bg-cyan-500", wrapper: "group-data-[selected=true]:border-cyan-500" }} value="allowed">{labels.CreateDigitalLifeModal.downloadPermissionAllowed}</Radio>
            <Radio classNames={{ control: "bg-cyan-500", wrapper: "group-data-[selected=true]:border-cyan-500" }} value="declined">{labels.CreateDigitalLifeModal.downloadPermissionDeclined}</Radio>
          </RadioGroup>
        </div>
      </div>
      <div className="w-2/3">
        <div className="w-full flex flex-row gap-4 justify-end mt-10">
          {variant === 'default' && (
            <Button
              color="default"
              variant="ghost"
              size="lg"
              startContent={
                <ArrowLeftIcon className="w-6 h-6 stroke-white fill-white" />
              }
              onPress={onPrevious}
            >
              {labels.Button.previous}
            </Button>
          )}
          <Button
            color="primary"
            variant="solid"
            size="lg"
            isLoading={creating}
            className="bg-cyan-500"
            onPress={() => {
              charaCreateServer();
            }}>
            {formData.type === 'public' ? `${labels.Button.publish}&${labels.Button.chatNow}` : labels.Button.chatNow}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateDigitalLifeForm;
