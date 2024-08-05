"use client";
import React, { useEffect, useState } from "react";
// import { useAmDispatch } from "../../Alter/AlterMessageContextProvider";
import { useAmDispatch } from "../../../../alter-message/AlterMessageContextProvider";
import { exportDigitalLifeCard } from "../../../utils/digitallife.api";
import { downloadFiles } from "../../../utils/common";
import { useLabels } from "../../../context/LabelsContext";
import { DigitalLifeDetailType } from "../../../utils/definitions.digitallife";

function DigitalLifeDownloadButton({
  digitalLifePublicInfo,
  publishId,
  modelId,
  startDownload = 0,
  onDownloading,
}: {
  digitalLifePublicInfo: DigitalLifeDetailType;
  publishId?: string;
  modelId?: string;
  startDownload: number;
  onDownloading: (downlading: boolean) => void;
}) {
  const [downlanding, setDownlanding] = useState(false);
  const amDispatch = useAmDispatch();
  const labels = useLabels();

  const exportDigitalLifeCardApi = exportDigitalLifeCard();
  const downloadDigitalLifeCardServer = async () => {
    if (downlanding) {
      return;
    }
    setDownlanding(true);
    onDownloading(true);

    try {
      const res = await exportDigitalLifeCardApi.send({
        p_id: publishId || "",
        format: "png",
      });

      if (res) {
        const blob = new Blob([res], { type: "image/*" });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${digitalLifePublicInfo.name}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
      } else {
        amDispatch({
          type: "add",
          payload: {
            message: labels.Alter.characterCardNotExist,
            type: "error",
          },
        });

        // throw new Error(labels.Alter.apiReturnError);
      }
    } catch (error) {
      // console.error(labels.Alter.failToDownloadDigitalLifeCard, error);
      amDispatch({
        type: "add",
        payload: {
          message: labels.Alter.failToDownloadDigitalLifeCard,
          type: "error",
        },
      });
    } finally {
      setDownlanding(false);
      onDownloading(false);
    }

    setDownlanding(false);
  };

  useEffect(() => {
    if (startDownload > 0) {
      downloadDigitalLifeCardServer();
    }
  }, [startDownload]);
  return <div className="hidden">{""}</div>;
}

export default DigitalLifeDownloadButton;
