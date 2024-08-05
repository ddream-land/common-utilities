"use client";
import { StarIcon } from "@heroicons/react/24/solid";
import { cn } from "@nextui-org/react";
import React, { useState } from "react";
import { collectCancelDigitalLife } from "../../../utils/digitallife.api";

function DigitalLifeCollectButton({ like, publishId }: { like: boolean; publishId: string }) {
  const [collecting, setCollecting] = useState(false);
  const [isCollected, setIsCollected] = useState(like);

  const digitalLifeCancelCollectApi = collectCancelDigitalLife();
  const digitalLifeCollectServer = async () => {
    if (collecting) {
      return;
    }
    setCollecting(true);

    const res = await digitalLifeCancelCollectApi.send({
      type: "collect",
      p_id: publishId,
    });
    if (res && res.code === 0) {
      setIsCollected(true);
    }

    setCollecting(false);
  };

  const digitalLifeCancelServer = async () => {
    if (collecting) {
      return;
    }
    setCollecting(true);

    const res = await digitalLifeCancelCollectApi.send({
      type: "cancel",
      p_id: publishId,
    });
    if (res && res.code === 0) {
      setIsCollected(false);
    }

    setCollecting(false);
  };

  return (
    <div
      className="w-8 h-8 bg-black/50 rounded-full justify-center items-center gap-2 inline-flex"
      onClick={isCollected ? digitalLifeCancelServer : digitalLifeCollectServer}
    >
      <StarIcon className={cn("w-4 h-4", isCollected ? "fill-amber-500" : "fill-zinc-400")} />
    </div>
  );
}

export default DigitalLifeCollectButton;
