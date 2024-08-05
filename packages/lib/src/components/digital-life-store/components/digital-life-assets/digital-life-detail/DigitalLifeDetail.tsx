"use client";
import React, { useEffect, useState } from "react";

import DigitalLifeDetailLeft from "./DigitalLifeDetailLeft";
import DigitalLifeDetailRight from "./DigitalLifeDetailRight";
import {
  DEFAULT_DIGITAL_LIFE_DETAIL_INFO,
  DigitalLifeAuthorType,
  DigitalLifeCardType,
  DigitalLifeDetailType,
} from "../../../utils/definitions.digitallife";
import { getDigitalLifeInfoPublic } from "../../../utils/digitallife.api";

function DigitalLifeDetail({
  publishId,
  selectedDigitalLife,
  onRunSuccess,
}: {
  publishId: string;
  selectedDigitalLife: DigitalLifeCardType | null;
  onRunSuccess: (id: string, success: boolean) => void;
}) {
  const getDigitalLifePublicInfoApi = getDigitalLifeInfoPublic();
  const [digitalLifePublicInfo, setDigitalLifePublicInfo] = useState<DigitalLifeDetailType>();
  const [digitalLifeAuthorInfo, setDigitalLifeAuthorInfo] = useState<DigitalLifeAuthorType>();
  const [loading, setLoading] = useState(false);

  const getDigitalLifePublicInfoToServer = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const res = await getDigitalLifePublicInfoApi.send({
      p_id: publishId,
    });
    if (res && res.code === 0) {
      // setDigitalLifePublicInfo(res.data.data);
      setDigitalLifePublicInfo({
        ...res.data.data,
        ts: res.data.ts,
        p_id: res.data.p_id,
        start_num: res.data.start_num,
        download_num: res.data.download_num,
        run_num: res.data.run_num,
        is_collect: res.data.is_collect,
      });

      setDigitalLifeAuthorInfo(res.data.author);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (publishId) {
      getDigitalLifePublicInfoToServer();
      // setDigitalLifePublicInfo(DEFAULT_DIGITAL_LIFE_DETAIL_INFO);
    }
  }, []);

  return (
    <div className="w-full bg-black/opacity-30 rounded-2xl flex-col justify-start items-end gap-2.5 inline-flex max-w-[1400px]">
      <div className="self-stretch pb-16 bg-zinc-900 rounded-tl-2xl rounded-tr-2xl rounded-bl-xl rounded-br-xl flex-col justify-start items-center gap-2.5 flex">
        <div className="w-full pt-16 pb-6">
          <div className="w-full justify-between items-start gap-12 flex">
            <div className="grow overflow-hidden">
              {digitalLifePublicInfo && <DigitalLifeDetailLeft digitalLifePublicInfo={digitalLifePublicInfo} />}
            </div>
            <div className="shrink">
              {digitalLifePublicInfo && (
                <DigitalLifeDetailRight
                  digitalLifeAuthorInfo={digitalLifeAuthorInfo!}
                  digitalLifePublicInfo={digitalLifePublicInfo}
                  selectedDigitalLife={selectedDigitalLife}
                  onRunSuccess={onRunSuccess}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DigitalLifeDetail;
