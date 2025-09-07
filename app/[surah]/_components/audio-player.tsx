"use client";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import VolumeSlider from "./volume-slider";
import { currentAyahAtom, isQuranPlayingAtom } from "@/atoms";
import { useAtom } from "jotai";

interface AudioPlayerProps {
  src: string;
  className?: string;
  numberInSurah: number;
  numberOfAyahs: number;
}

export default function AudioPlayer({
  src,
  className,
  numberInSurah,
  numberOfAyahs,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number | undefined>(0);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useAtom(isQuranPlayingAtom);
  const [currentAyah, setCurrentAyah] = useAtom(currentAyahAtom);

  useEffect(() => {
    const storedVolume = localStorage.getItem("volume");
    setVolume(Number(storedVolume) || 1);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    setDuration(audioRef.current?.duration);
  }, [audioRef.current?.duration]);

  const playAudio = () => {
    const storedVolume = localStorage.getItem("volume");
    const volumeToSet = Number(storedVolume) || 1;
    setVolume(volumeToSet);
    if (audioRef.current) {
      audioRef.current.volume = volumeToSet;
      audioRef.current.play();
    }
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPlaying && currentAyah === numberInSurah) {
      pauseAudio();
    } else {
      if (isPlaying && currentAyah !== numberInSurah) {
        pauseAudio();
      }
      setCurrentAyah(numberInSurah);
      playAudio();
    }
  };

  useEffect(() => {
    if (currentAyah === numberInSurah) {
      playAudio();
    } else {
      pauseAudio();
    }
  }, [currentAyah]);

  const handleAudioError = () => {
    console.error("Audio failed to load.");
  };

  return (
    <div className={className}>
      <audio
        ref={audioRef}
        src={src}
        onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          if (numberInSurah < numberOfAyahs) {
            setCurrentAyah(numberInSurah + 1);
          }
        }}
        onError={handleAudioError}
      />

      <div className="flex items-center gap-2 flex-row-reverse">
        <Button
          variant={"secondary"}
          className="w-8 h-8"
          size={"icon"}
          onClick={handlePlayPause}>
          {isPlaying && currentAyah === numberInSurah ? (
            <PauseIcon className="w-3.5 h-3.5" />
          ) : (
            <PlayIcon className="w-3.5 h-3.5" />
          )}
        </Button>
        <Slider
          defaultValue={[0]}
          value={duration ? [(currentTime / duration) * 100] : [0]}
          onValueChange={(value) => {
            if (audioRef.current) {
              const newTime = (value[0] / 100) * (duration || 0);
              audioRef.current.currentTime = newTime;
              setCurrentTime(newTime);
            }
          }}
        />
        <VolumeSlider volume={volume} setVolume={setVolume} />
      </div>
    </div>
  );
}
