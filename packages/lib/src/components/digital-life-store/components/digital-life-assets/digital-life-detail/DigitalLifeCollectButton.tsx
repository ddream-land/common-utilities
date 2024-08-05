"use client";
import { getStarNumStr } from "../../../utils/common";
import { collectCancelDigitalLife } from "../../../utils/digitallife.api";
import { StarIcon } from "@heroicons/react/24/solid";
import { Button, cn } from "@nextui-org/react";
import React, { useState } from "react";
import { useLabels } from "../../../context/LabelsContext";

function DigitalLifeCollectButton({ like, publishId, starNum }: { like: boolean; publishId: string; starNum: number }) {
  const [collecting, setCollecting] = useState(false);
  const [isCollected, setIsCollected] = useState(like);
  const labels = useLabels();

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

  const computerStarNumStr = () => {
    let realStarNum = starNum;
    if (like && !isCollected) {
      realStarNum--;
    }
    if (!like && isCollected) {
      realStarNum++;
    }
    return getStarNumStr(realStarNum);
  };

  return (
    <Button
      isDisabled={collecting}
      size="lg"
      variant="flat"
      startContent={<StarIcon className={cn("w-6 h-6", isCollected ? "fill-amber-500" : "fill-zinc-400")} />}
      onPress={isCollected ? digitalLifeCancelServer : digitalLifeCollectServer}
      className="w-36"
    >
      {labels.DigitalLifeStore.star} {computerStarNumStr()}{" "}
    </Button>
  );
}

export default DigitalLifeCollectButton;
