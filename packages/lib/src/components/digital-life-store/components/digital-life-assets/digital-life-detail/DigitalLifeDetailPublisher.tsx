"use client";
import { Avatar } from "@nextui-org/react";

import { StarIcon } from "@heroicons/react/24/solid";
import { BeakerIcon } from "@heroicons/react/24/outline";
import { DigitalLifeAuthorType } from "../../../utils/definitions.digitallife";
import { formatTimestamp, getStarNumStr } from "../../../utils/common";
import DownloadIcon from "../../../icons/DownloadIcon";

import "moment/locale/zh-cn";
import { useLabels } from "../../../context/LabelsContext";
import { useLocale } from "../../../context/LocaleContext";

function DigitalLifeDetailPublisher({ publisher }: { publisher: DigitalLifeAuthorType }) {
  const locale = useLocale() as "en" | "zh-CN";
  const labels = useLabels();

  return (
    <div className="w-full px-4 py-3 bg-zinc-800 rounded-xl border border-zinc-700 justify-start items-start gap-4 inline-flex">
      <div className="justify-start items-start flex">
        {/* <Avatar name={publisher.name} size="md" src={publisher.avatar} /> */}
        <Avatar
          name={(publisher ?? {}).name ?? labels.DigitalLifeStore.unknownAuthor2}
          size="md"
          src={(publisher ?? {}).avatar ?? ""}
        />
      </div>
      <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex divide-y">
        <div className="flex-col justify-start items-start gap-0.5 flex pb-2 w-full">
          <div className="text-white text-base font-medium leading-normal">
            {(publisher ?? {}).name ?? labels.DigitalLifeStore.unknownAuthor}
          </div>
          <div className="text-zinc-400 text-xs font-normal leading-none">
            {!publisher || ((publisher ?? {}).ts !== 0 && <span>{labels.DigitalLifeStore.joined}</span>)}
            {formatTimestamp((publisher ?? {}).ts ?? 0, locale)}
          </div>
        </div>
        <div className="justify-start items-center gap-3 inline-flex pt-2 w-full">
          <div className="h-4 justify-start items-center gap-1 flex">
            <StarIcon className="w-4 h-4 fill-zinc-400" />
            <div className="text-white text-xs font-normal leading-none">{getStarNumStr(publisher?.stars ?? 0)}</div>
          </div>
          <div className="h-4 justify-start items-center gap-1 flex ">
            <div className="w-4 h-4 justify-center items-center flex">
              <DownloadIcon className="w-4 h-4 relative" />
            </div>
            <div className="text-white text-xs font-normal leading-none">
              {getStarNumStr(publisher?.down_load ?? 0)}
            </div>
          </div>
          <div className="h-4 justify-start items-center gap-1 flex ">
            <BeakerIcon className="w-4 h-4 relative" />
            <div className="text-white text-xs font-normal leading-none">{getStarNumStr(publisher?.run ?? 0)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DigitalLifeDetailPublisher;
