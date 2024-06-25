"use client";
import React, { useCallback, useRef, useState } from "react";
import { useWavesurfer } from '@wavesurfer/react'
import PlayButton from "./PlayButton";


const formatTime = (seconds: any) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')

function VoicePreview({
	voiceSrc,
}: {
  voiceSrc: string
}) {

  const [isPlay, setIsPlay] = useState(false);


	const containerRef = useRef(null)

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 40,
		barWidth: 3,
		barRadius: 3,
		waveColor: "#9F9FAA",
		progressColor: "#9353D3",
		cursorColor: "OrangeRed",
		dragToSeek: true,
    url: 'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3',
  })
	
	const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause()
  }, [wavesurfer])

	const duration = wavesurfer && wavesurfer.getDuration();

	const onChangePlay = (play:boolean) => {
		onPlayPause();
		setIsPlay(play);
	}

  return (
		<div className="w-full h-14 p-3 bg-neutral-900 rounded-xl justify-start items-center gap-6 inline-flex overflow-hidden">
			<div className={['h-10 w-full rounded-xl justify-start items-center gap-3 inline-flex scrollbar-hide overflow-scroll'].join(' ')}>
					<div className='shrink-0'>
						<PlayButton isPlay={isPlaying} onChange={onChangePlay} />
					</div>
					<div className="w-full">
						<div ref={containerRef}  className="w-full" />
					</div>
					<div className="pl-3 bg-neutral-900 items-center shrink-0 grow">{formatTime(currentTime)} / {formatTime(duration)}</div>
			</div>
		</div>
  );
}

export default VoicePreview;
