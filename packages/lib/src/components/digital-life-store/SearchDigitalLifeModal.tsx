import React from "react";
import DigitalLifeDetailDrawerModal from "./components/digital-life-assets/digital-life-detail/DigitalLifeDetailDrawerModal";
import { useState } from "react";
import { useAmDispatch } from "../alter-message/AlterMessageContextProvider";
import { useLabels } from "./context/LabelsContext";

type SearchDigitalLifeModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  locale?: "en" | "zh-CN";
  onRunAISuccess?: (id: string, isSuccess: boolean) => void;
};

export const SearchDigitalLifeModal = ({ locale = "zh-CN", onRunAISuccess }: SearchDigitalLifeModalProps) => {
  const queryParams = new URLSearchParams(window.location.search);
  const searchPublishId = queryParams.get("p_id") || "";
  const [defaultOpened, setDefaultOpened] = useState(true);

  const labels = useLabels();
  const amDispatch = useAmDispatch();

  if (!searchPublishId) return null;

  return (
    <DigitalLifeDetailDrawerModal
      publishId={searchPublishId}
      isOpen={defaultOpened}
      onChange={(isOpen) => {
        setDefaultOpened(isOpen);
      }}
      onRunSuccess={(id, success) => {
        onRunAISuccess && onRunAISuccess(id, success);
        if (success) {
          // setSelectedDigitalLife(null);
          setDefaultOpened(false);
          amDispatch({
            type: "add",
            payload: {
              message: labels.Alter.successfullyRunedOnRoleAI,
              type: "success",
            },
          });
        }
      }}
    />
  );
};
