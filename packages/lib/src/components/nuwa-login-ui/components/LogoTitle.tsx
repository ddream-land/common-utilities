"use client";

import { Image } from "@nextui-org/image";
import nuwaLogoBase64 from "../image/NuwaLogo";
import LogoIcon from "../icons/LogoIcon";


const CountLimit = 60;

export default function LogoTitle({
}: {
}) {
  return (
    <div className="w-full flex flex-row justify-center items-center gap-2">
      <LogoIcon className="h-10" />
      <Image disableSkeleton={true} radius="none" width={149} height={35} src={nuwaLogoBase64} alt="logo" />
    </div>
  );
}
