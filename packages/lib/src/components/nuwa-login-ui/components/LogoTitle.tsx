"use client";

import { Image } from "@nextui-org/image";
import nuwaLogoBase64 from "../image/NuwaLogo";
import LogoIcon from "../icons/LogoIcon";


const CountLimit = 60;

export default function LogoTitle({
}: {
}) {
  return (
    <div className="w-full flex flex-row justify-center items-end gap-2">
      <LogoIcon className="h-8" />
      <Image disableSkeleton={true} radius="none" width={100} height={26} src={nuwaLogoBase64} alt="logo" />
    </div>
  );
}
