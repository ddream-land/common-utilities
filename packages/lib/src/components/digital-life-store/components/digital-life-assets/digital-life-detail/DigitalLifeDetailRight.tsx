"use client";

import { ArrowDownTrayIcon, RocketLaunchIcon, ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { Button, Snippet, Avatar, Tooltip } from "@nextui-org/react";
import React, { useState } from "react";
// @ts-ignore
import moment from "moment";
import DigitalLifeCollectButton from "./DigitalLifeCollectButton";
import DigitalLifeDownloadButton from "../digital-life-download-button/DigitalLifeDownloadButton";
import DigitalLifeDetailPublisher from "./DigitalLifeDetailPublisher";
import {
  DigitalLifeAuthorType,
  DigitalLifeCardType,
  DigitalLifeDetailType,
} from "../../../utils/definitions.digitallife";
import { runDigitalLife } from "../../../utils/digitallife.api";
import ShareIcon from "../../../icons/ShareIcon";
import { formatTimestamp, getStarNumStr } from "../../../utils/common";
import { useLabels } from "../../../context/LabelsContext";
import "moment/locale/zh-cn";
import { useLocale } from "../../../context/LocaleContext";

function DigitalLifeDetailRight({
  digitalLifeAuthorInfo,
  digitalLifePublicInfo,
  selectedDigitalLife,
  onRunSuccess,
}: {
  digitalLifeAuthorInfo: DigitalLifeAuthorType;
  digitalLifePublicInfo: DigitalLifeDetailType;
  selectedDigitalLife: DigitalLifeCardType | null;
  onRunSuccess: (id: string, success: boolean) => void;
}) {
  // const router = useRouter();

  const [startCharacterCardDownload, setStartCharacterCardDownload] = useState(0);
  const [downloading, setDownlanding] = useState(false);
  const pathname = typeof window !== "undefined" && window.location.pathname ? window.location.pathname : "";
  const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";
  // const url = `${origin}${pathname}?p_id=${selectedDigitalLife?.p_id}`;
  const url = `${origin}${pathname}?p_id=${digitalLifePublicInfo?.p_id}`;

  const [isLoading, setIsLoading] = useState(false);
  const runDigitalLifeApi = runDigitalLife();
  let local_digital_life_id: string;

  const locale = useLocale() as "en" | "zh-CN";
  const labels = useLabels();

  const handleRunPress = async () => {
    // if (!selectedDigitalLife) return;
    if (!digitalLifePublicInfo) return;

    setIsLoading(true);
    try {
      const res = await runDigitalLifeApi.send({
        // p_id: selectedDigitalLife.p_id!,
        p_id: digitalLifePublicInfo.p_id!,
      });

      if (res && res.code === 0) {
        local_digital_life_id = res.data;
        onRunSuccess(local_digital_life_id, true);
      } else {
        // 处理错误
        console.error("Failed to run digital life");
        onRunSuccess(local_digital_life_id, false);
      }
    } catch (error) {
      console.error("Error running digital life:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-col justify-start items-start gap-8 inline-flex">
      <div className="self-stretch justify-between items-end inline-flex h-16">
        <div className="w-full shrink-0 self-stretch justify-end items-start gap-2 flex">
          <DigitalLifeCollectButton
            like={digitalLifePublicInfo.fav}
            publishId={digitalLifePublicInfo?.p_id ?? ""}
            starNum={digitalLifePublicInfo?.start_num ?? 0}
          />
          {/* <Button
            size="lg"
            variant="bordered"
            startContent={<EllipsisHorizontalIcon className="fill-zinc-400 w-6 h-6" />}
            isIconOnly={true}
          /> */}
        </div>
      </div>

      {/* right contents */}
      <div className="flex-col justify-start items-start gap-6 inline-flex">
        {/* run button */}
        <div className="justify-start items-start gap-2 inline-flex">
          <Button
            size="lg"
            color="primary"
            variant="ghost"
            className="w-[220px] digitalButton !border-[#18a9cc] hover:!bg-[#18a9cc] hover:!text-white group"
            style={{
              color: "#18a9cc",
            }}
            startContent={<ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 fill-[#18a9cc] group-hover:fill-white" />}
            onPress={async () => {
              // setIsOpen(true)
              await handleRunPress();
            }}
          >
            {labels.DigitalLifeStore.runOnRoleAI}
          </Button>
          {digitalLifePublicInfo.name && (
            <>
              <DigitalLifeDownloadButton
                digitalLifePublicInfo={digitalLifePublicInfo}
                publishId={digitalLifePublicInfo!.p_id}
                startDownload={startCharacterCardDownload}
                onDownloading={(newDownloading) => {
                  setDownlanding(newDownloading);
                }}
              />
              <Tooltip content={labels.DigitalLifeStore.downloadCharacterCard}>
                <Button
                  disableRipple={false}
                  size="lg"
                  variant="bordered"
                  startContent={<ArrowDownTrayIcon className="fill-zinc-400 w-6 h-6" />}
                  isIconOnly={true}
                  onPress={() => {
                    setStartCharacterCardDownload(startCharacterCardDownload + 1);
                  }}
                  isDisabled={downloading}
                />
              </Tooltip>
            </>
          )}
          <Snippet
            tooltipProps={{
              content: labels.DigitalLifeStore.copyToClipboard,
            }}
            variant="bordered"
            copyIcon={<ShareIcon className="fill-zinc-400 w-4 h-4" />}
            classNames={{
              pre: "hidden",
              base: "px-1.5",
            }}
            size="md"
            hideSymbol={true}
          >
            {url}
          </Snippet>
        </div>

        {/* listed info */}
        <div className="self-stretch flex-col justify-start items-start flex">
          <div className="self-stretch h-[68px] justify-start items-start inline-flex">
            <div className="grow shrink basis-0 py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 inline-flex">
              <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">
                {labels.DigitalLifeStore.runnings}
              </div>
              <div className="self-stretch text-white text-sm font-semibold leading-tight">
                {getStarNumStr(digitalLifePublicInfo?.run_num ?? 0)}
              </div>
            </div>
            <div className="grow shrink basis-0 py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 inline-flex">
              <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">
                {labels.DigitalLifeStore.downloads}
              </div>
              <div className="self-stretch text-white text-sm font-semibold leading-tight">
                {getStarNumStr(selectedDigitalLife?.download_num ?? 0)}
              </div>
            </div>
            <div className="grow shrink basis-0 py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 inline-flex">
              <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">
                {labels.DigitalLifeStore.sharing}
              </div>
              <div className="self-stretch text-white text-sm font-semibold leading-tight">
                {getStarNumStr(selectedDigitalLife?.start_num ?? 0)}
              </div>
            </div>
          </div>
          <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">
              {labels.DigitalLifeStore.version}
            </div>
            <div className="text-white text-sm font-semibold leading-tight">V{digitalLifePublicInfo.spec_version}</div>
          </div>
          {/* <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">Supported languages</div>
            <div className="text-white text-sm font-semibold leading-tight">中文 English</div>
          </div>
          <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">Rating</div>
            <div className="text-white text-sm font-semibold leading-tight">SFW</div>
          </div>
          <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">CC License</div>
            <div className="text-white text-sm font-semibold leading-tight">HAC KAS</div>
          </div> */}
          <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">
              {labels.DigitalLifeStore.publishDate}
            </div>
            <div className="text-white text-sm font-semibold leading-tight">
              {/* {locale === "en" ? (
                <div className="text-white text-sm font-semibold leading-tight">
                  {moment(digitalLifePublicInfo.create_date, "YYYY-M-D @HH[h] mm[m] ss[s] SSS[ms]").format(
                    "MMMM Do, YYYY"
                  )}
                </div>
              ) : (
                <div className="text-white text-sm font-semibold leading-tight">
                  {moment(digitalLifePublicInfo.create_date, "YYYY-M-D @HH[h] mm[m] ss[s] SSS[ms]").format(
                    "YYYY年MM月DD日"
                  )}
                </div>
              )} */}

              {formatTimestamp((digitalLifePublicInfo ?? {}).ts ?? 0, locale)}
            </div>
          </div>
          {/* <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">Source</div>
            <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
              <div className="text-white text-sm font-semibold leading-tight">{"Reprint"}</div>
            </div>
          </div> */}
        </div>
      </div>
      <DigitalLifeDetailPublisher publisher={digitalLifeAuthorInfo} />
    </div>
  );
}

export default DigitalLifeDetailRight;
