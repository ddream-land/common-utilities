"use client";
import React, { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@heroicons/react/20/solid";
import { usePlayBtnDispatch } from "./PlayButtonContextProvider";

function PlayButton2({
	isPlay = false,
  onChange,
  voiceSrc,
  classNames= {
    base: 'w-8 h-8',
  }
}: {
	isPlay?: boolean,
  onChange?: (isPlay: boolean) => void,
  voiceSrc?: string,
  classNames?: {
    base?: string
  }
}) {
  const [playing, setPlaying] = useState(isPlay);
  const audioRef = useRef<HTMLAudioElement>();

  const playBtnDispatch = usePlayBtnDispatch();

  useEffect(() => {
    if (!voiceSrc || voiceSrc === '') return;
    if (playing) {
      playBtnDispatch({
        type: "pause",
        payload: {
          audio: audioRef.current
        },
      })
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [playing]);

  return (
    <div>
      {isPlay && (
        <div
          className={`w-6 h-6 ursor-pointer bg-[#2E6EE6] rounded-[8px] flex items-center justify-center`}
          onClick={() => {
            onChange && onChange(false);
            setPlaying(false);
          }} 
        >
          <PauseIcon className="h-2.5 w-2.5 fill-white stroke-white stroke-1" />
        </div>
      )}
      {!isPlay && (
        <div
          className={`w-6 h-6 cursor-pointer bg-[#2E6EE6] rounded-[8px] flex items-center justify-center`}
          onClick={() => {
            onChange && onChange(true);
            setPlaying(true);
          }}
        >
          <PlayIcon className="h-2.5 w-2.5 fill-white stroke-white ml-0.5" />
        </div>
      )}
      {voiceSrc && (
        <audio
          src={voiceSrc}
          ref={audioRef as any}
          onProgress={(e) => {
            // console.log("onProgress", e)
          }}
          onPause={(e) => {
            onChange && onChange(false);
            setPlaying(false);
          }}
        />
      )}
    </div>
  );
}

export default PlayButton2;
