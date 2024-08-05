"use client";
import React, { useState } from "react";
import { Card, Skeleton } from "@nextui-org/react";

function VoiceModelItemSkeleton() {
  return (
    <div className="w-full cursor-pointer basis-0 group shrink bg-neutral-900 rounded-xl shadow-inner border-transparent border-2 flex-col justify-start items-start inline-flex">
      <div className="h-[62px] w-full flex flex-row items-center justify-start bg-zinc-900 rounded-lg border border-neutral-800 px-[18px] gap-[13px]">
        <Skeleton className="w-[30px] h-[30px] rounded-lg">
          <div className="w-[30px] h-[30px] rounded-lg bg-secondary-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-sm">
          <div className="h-4 w-full rounded-sm bg-secondary-200"></div>
        </Skeleton>
      </div>
    </div>
  );
}

export default VoiceModelItemSkeleton;
