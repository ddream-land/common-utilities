"use client";
import React, { useState } from "react";
// import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { Avatar, Button, cn, Tooltip, Image } from "@nextui-org/react";
import DownloadIcon from "../../../icons/DownloadIcon";
import { BeakerIcon } from "@heroicons/react/24/outline";
import { getStarNumStr } from "../../../utils/common";
import DigitalLifeCollectButton from "./DigitalLifeCollectButton";
import { DigitalLifeCardType } from "../../../utils/definitions.digitallife";
import DefaultAvatarBase64 from "../../../images/default-avatar";
import { useLabels } from "../../../context/LabelsContext";

function DigitalLifeItem({
  digitalLife,
  isSelected = false,
  type,
  onItemClick,
}: {
  digitalLife: DigitalLifeCardType;
  isSelected: boolean;
  type: "my" | "all";
  onItemClick?: (digitalLife: DigitalLifeCardType) => void;
}) {
  const DEFAULT_AVATAR = "/default_avatar.png";
  const labels = useLabels();

  return (
    <div className="group/item" key={digitalLife.p_id}>
      <div
        className={cn(
          isSelected ? "border-primary" : "group-hover/item:border-primary border-transparent",
          " cursor-pointer basis-0 group shrink bg-neutral-900 rounded-xl shadow-inner border-2 flex-col justify-start items-start inline-flext"
        )}
      >
        <div className="relative">
          <div className="w-full h-0 pb-[66%] relative rounded-xl overflow-hidden">
            <img
              src={digitalLife.cover_url || DefaultAvatarBase64}
              alt={digitalLife.name ?? ""}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
              onClick={() => {
                onItemClick && onItemClick(digitalLife);
              }}
            />
          </div>

          <div className="justify-start items-center gap-1 inline-flex absolute top-4 right-3">
            <DigitalLifeCollectButton like={digitalLife.is_collect ?? false} publishId={digitalLife.p_id ?? ""} />
          </div>

          <div className="absolute left-3 bottom-2 justify-start items-center gap-2 flex">
            <div className="justify-end items-center gap-0.5 flex">
              <StarIcon className={`w-4 h-4 ${digitalLife.start_num ? "fill-amber-500" : "fill-zinc-400"}`} />
              <div className="text-white text-xs font-normal leading-none">{getStarNumStr(digitalLife.start_num)}</div>
            </div>
            <div className="justify-end items-center gap-0.5 flex">
              <DownloadIcon className="w-4 h-4" />
              <div className="text-white text-xs font-normal leading-none">
                {getStarNumStr(digitalLife.download_num)}
              </div>
            </div>

            <div className="justify-start items-center gap-0.5 flex">
              <BeakerIcon className="w-4 h-4 relative" />
              <div className="text-white text-xs font-normal leading-none">{getStarNumStr(digitalLife.run_num)}</div>
            </div>
          </div>
        </div>

        <div
          className="w-full px-4 py-3 flex-col justify-start items-start gap-2 inline-flex"
          onClick={() => {
            onItemClick && onItemClick(digitalLife);
          }}
        >
          <div className="h-7 w-full overflow-hidden justify-start items-center inline-flex pr-10">
            <div className="text-white text-lg font-semibold leading-7 truncate">{digitalLife.name}</div>
          </div>
          <>
            <div id="tags" className="flex flex-wrap items-start justify-start gap-1 max-h-[3.75rem] overflow-hidden">
              {digitalLife.tags &&
                digitalLife.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center justify-center px-2 py-1 mb-1 rounded-[4px] bg-[#25252a]"
                  >
                    <span className="font-semibold text-xs whitespace-nowrap">{tag}</span>
                  </div>
                ))}
            </div>
          </>
          <div className="self-stretch justify-between items-center inline-flex gap-2">
            <div className="justify-center items-center gap-1.5 flex overflow-hidden">
              <Avatar
                className="shrink-0 w-4 h-4"
                alt={(digitalLife.author ?? {}).name ?? labels.DigitalLifeStore.unknownAuthor2}
                name={(digitalLife.author ?? {}).name ?? labels.DigitalLifeStore.unknownAuthor2}
                src={(digitalLife.author ?? {}).avatar ?? ""}
                size="sm"
              />
              <div className="text-zinc-400 text-xs font-normal leading-none truncate">
                {(digitalLife.author ?? {}).name ?? labels.DigitalLifeStore.unknownAuthor}
              </div>
              {/* <Avatar
                className="shrink-0 w-4 h-4"
                alt={digitalLife?.author?.name}
                name={digitalLife?.author?.name}
                src={digitalLife?.author?.avatar}
                size="sm"
              /> */}
              {/* <div className="text-zinc-400 text-xs font-normal leading-none truncate">{digitalLife.author.name}</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DigitalLifeItem;
