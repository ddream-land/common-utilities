"use client";

import numbro from "numbro";
import { useState } from "react";
import moment from "moment";
import "moment/locale/zh-cn";

export const useCoverHandler = () => {
  const [isReplacingTheCoverLoding, setIsReplacingTheCoverLoding] = useState(false);
  const handleReplacingTheCover = async (e: any, setCover: (data: string) => void) => {
    setIsReplacingTheCoverLoding(true);
    if (typeof window !== "undefined") {
      const file = e.target.files[0];
      const res = await fetch("/api/upcover", {
        method: "POST",
        body: file,
      });
      if (res.ok) {
        const data = await res.text();
        // localStorage.setItem("cover", data);
        setCover(data);
        setIsReplacingTheCoverLoding(false);
      } else {
        setIsReplacingTheCoverLoding(false);
        alert("Failed to upload: please make sure you are uploading an image");
      }
    } else {
      setIsReplacingTheCoverLoding(false);
      alert("Please change your browser");
    }
  };

  return { isReplacingTheCoverLoding, handleReplacingTheCover };
};

export const getStarNumStr = (num: number) => {
  return numbro(num).format({
    average: true,
    mantissa: 2,
    optionalMantissa: true,
    spaceSeparated: true,
  });
};

export function formatTimestamp(timestamp: number, locale: "en" | "zh-CN"): string {
  if (timestamp === 0) {
    return "";
  }

  moment.locale(locale);

  const formats = {
    "zh-CN": "YYYY年MM月DD日",
    en: "MMMM Do, YYYY",
  };

  const format = formats[locale] || formats["zh-CN"];

  return moment.unix(timestamp).format(format);
}

// export const handleConfetti = () => {
//   confetti({
//     particleCount: 100,
//     spread: 70,
//     origin: { y: 0.6 },
//   });
// };

export const downloadFiles = (urls: string[]) => {
  const download = (urls: string[]) => {
    const url = urls.pop();

    var a = document.createElement("a");
    a.setAttribute("href", url as string);
    a.setAttribute("download", "");
    // a.setAttribute('target', '_blank');
    a.click();

    // 如果是 Blob URL，在下载启动后释放
    if (url?.startsWith("blob:")) {
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
    }

    if (urls.length == 0) {
      clearInterval(interval);
    }
  };
  const interval = setInterval(download, 300, urls);
};

export const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));
