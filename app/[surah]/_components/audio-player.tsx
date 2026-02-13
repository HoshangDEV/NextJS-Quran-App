"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useCallback } from "react";
import VolumeSlider from "./volume-slider";
import {
  audioCurrentTimeAtom,
  audioDurationAtom,
  audioSeekTimeAtom,
  audioSrcAtom,
  currentAyahAtom,
  isQuranPlayingAtom,
} from "@/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

interface AudioPlayerProps {
  src: string;
  className?: string;
  numberInSurah: number;
}

export default function AudioPlayer({
  src,
  className,
  numberInSurah,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useAtom(isQuranPlayingAtom);
  const [currentAyah, setCurrentAyah] = useAtom(currentAyahAtom);
  const setAudioSrc = useSetAtom(audioSrcAtom);
  const setSeekTime = useSetAtom(audioSeekTimeAtom);
  const currentTime = useAtomValue(audioCurrentTimeAtom);
  const duration = useAtomValue(audioDurationAtom);

  const isCurrentAyah = currentAyah === numberInSurah;
  const isThisPlayerPlaying = isPlaying && isCurrentAyah;

  const handlePlayPause = useCallback(() => {
    if (isThisPlayerPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentAyah(numberInSurah);
      setAudioSrc(src);
      setIsPlaying(true);
    }
  }, [isThisPlayerPlaying, setIsPlaying, setCurrentAyah, numberInSurah, setAudioSrc, src]);

  const handleProgressChange = useCallback(
    (value: number[]) => {
      if (duration > 0) {
        const newTime = (value[0] / 100) * duration;
        setSeekTime(newTime);
      }
    },
    [duration, setSeekTime]
  );

  const displayCurrentTime = isCurrentAyah ? currentTime : 0;
  const displayDuration = isCurrentAyah ? duration : 0;

  return (
    <div className={className}>
      <div className="flex items-center gap-2 flex-row-reverse">
        <Button
          variant="secondary"
          className="min-w-8 w-8 h-8"
          size="icon"
          onClick={handlePlayPause}
          aria-label={isThisPlayerPlaying ? "إيقاف مؤقت" : "تشغيل"}
        >
          {isThisPlayerPlaying ? (
            <PauseIcon className="w-3.5 h-3.5" />
          ) : (
            <PlayIcon className="w-3.5 h-3.5" />
          )}
        </Button>
        <Slider
          value={displayDuration > 0 ? [(displayCurrentTime / displayDuration) * 100] : [0]}
          onValueChange={handleProgressChange}
          disabled={displayDuration === 0}
          aria-label="شريط التقدم"
        />
        <VolumeSlider />
      </div>
    </div>
  );
}
