"use client";
import { Button, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import CreateDigitalLifeFigure from "./CreateDigitalLifeFigure";
import CreateDigitalLifeVoice from "./CreateDigitalLifeVoice";
import CreateDigitalLifeAvatar from "./CreateDigitalLifeAvatar";
import TagsInput from "../ui/TagsInput";
import { useState } from "react";
import { useLabels } from "../../context/LabelsContext";

function CreateDigitalLifeForm({}: {}) {


  const labels = useLabels();
  const [tags, setTags] = useState<string[]>([]);
  
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
          <CreateDigitalLifeFigure />
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
          />
          <Textarea
            variant="bordered"
            color="default"
            label={labels.CreateDigitalLifeModal.summary}
            labelPlacement="outside"
            placeholder={labels.CreateDigitalLifeModal.summaryPlaceholder}
            className="w-full"
            size="sm"
            radius="md"
            minRows={5}
            maxRows={5}
          />
          <Textarea
            variant="bordered"
            color="default"
            label={labels.CreateDigitalLifeModal.scenarios}
            labelPlacement="outside"
            placeholder={labels.CreateDigitalLifeModal.scenariosPlaceholder}
            className="w-full"
            size="sm"
            radius="md"
            minRows={5}
            maxRows={5}
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
          />
        </div>
        <div className="py-[60px]">
          <CreateDigitalLifeVoice />
        </div>
        <div className="py-[60px]">
          <CreateDigitalLifeAvatar />
        </div>
        <div className="w-full flex-col justify-start items-start gap-8 inline-flex py-[60px]">
          <div className="w-full">
            <div className="mb-2 text-foreground text-tiny font-semibold font-['Inter'] leading-normal">{labels.CreateDigitalLifeModal.tag}</div>
            <TagsInput value={tags} onValueChange={setTags} placeholder={labels.CreateDigitalLifeModal.tagPlaceholder} />
          </div>
          <Textarea
              variant="bordered"
              color="default"
              label={labels.CreateDigitalLifeModal.creatorIntroduction}
              labelPlacement="outside"
              placeholder={labels.CreateDigitalLifeModal.creatorIntroductionPlaceholder}
              className="w-full"
              size="sm"
              radius="md"
              minRows={5}
              maxRows={5}
            />
        </div>
        <div className="w-full flex-col justify-start items-start gap-8 inline-flex py-[60px]">
          <RadioGroup
            label={labels.CreateDigitalLifeModal.publicationType}
            classNames={{
              label: "text-white text-base font-semibold font-['Inter'] leading-normal"
            }}
            >
            <Radio value="public">Public</Radio>
            <Radio value="privacy">Privacy</Radio>
          </RadioGroup>
          <RadioGroup
            label={labels.CreateDigitalLifeModal.downloadPermission}
            classNames={{
              label: "text-white text-base font-semibold font-['Inter'] leading-normal"
            }}
            >
            <Radio value="public">Download Allowed</Radio>
            <Radio value="privacy">Download Declined</Radio>
          </RadioGroup>
          <RadioGroup
            label={labels.CreateDigitalLifeModal.model}
            classNames={{
              label: "text-white text-base font-semibold font-['Inter'] leading-normal"
            }}
            >
            <Radio value="public">Story Model</Radio>
            <Radio value="privacy">Speak Model</Radio>
          </RadioGroup>
        </div>
      </div>
      <div className="w-2/3">
        <div className="w-full flex flex-row gap-4 justify-end mt-10">
          <Button
            color="default"
            variant="ghost"
            size="lg"
            startContent={
              <ArrowLeftIcon className="w-6 h-6 stroke-white fill-white" />
            }
          >
            Previous
          </Button>
          <Button color="primary" variant="solid" size="lg">
            Publish&Chat Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateDigitalLifeForm;
