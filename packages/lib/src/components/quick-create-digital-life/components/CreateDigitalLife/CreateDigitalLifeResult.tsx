"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import TwoCircleLoading from '../../lottiefiles/TwoCircleLoading.json';
import InfinityLoaderanimated from '../../lottiefiles/InfinityLoaderanimated.json';
import { Skeleton } from "@nextui-org/react";
import { useLabels } from "../../context/LabelsContext";

function CreateDigitalLifeResult({}: {}) {

  const labels = useLabels();
  
  return (

    <div className="flex flex-col items-center justify-center py-[64px]">
      
      <div className="w-2/3">
        <div className="flex-col justify-start items-start gap-5 inline-flex">
          <div className="self-stretch justify-start items-center gap-2 inline-flex">
            <div className="text-white text-5xl font-semibold font-['Inter'] leading-[48px]">
            {labels.CreateDigitalLifeModal.title}
            </div>
          </div>
        </div>
      </div>

      <div className="w-2/3  flex flex-col justify-center items-center">
        <div className="w-[320px] h-[360px] bg-[#1C1E21] rounded-md my-[60px] flex flex-col justify-center items-center">
          <div className="w-[120px] h-[90px]">
            <DotLottieReact
              data={InfinityLoaderanimated}
              loop
              autoplay
              height={90}
              width={120}
            />
          </div>
          <div className="opacity-60 text-center text-white text-base font-medium font-['Roboto'] leading-none">Drawing</div>
        </div>

        <div className="w-full h-44 bg-[#1C1E21] rounded-lg relative">
          <div className="w-full flex flex-col gap-4 p-5">
            <Skeleton className="h-6 w-1/5 rounded-lg bg-[#222429]" disableAnimation={true} />
            <Skeleton className="h-5 w-3/5 rounded-lg bg-[#222429]" disableAnimation={true} />
            <Skeleton className="h-5 w-4/5 rounded-lg bg-[#222429]" disableAnimation={true} />
            <Skeleton className="h-5 w-2/5 rounded-lg bg-[#222429]" disableAnimation={true} />
          </div>
          <div className="absolute w-full h-full left-0 top-0 flex flex-col justify-center items-center ">
            <div className="w-[120px] h-[90px]">
              <DotLottieReact
                data={TwoCircleLoading}
                loop
                autoplay
                height={90}
                width={120}
              />
            </div>
            <div className="opacity-60 text-center text-white text-base font-medium font-['Roboto'] leading-none">Generating...</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateDigitalLifeResult;
