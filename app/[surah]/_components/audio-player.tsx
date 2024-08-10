"use client";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import VolumeSlider from "./volume-slider";

interface AudioPlayerProps {
  src: string;
  className?: string;
}

export default function AudioPlayer({ src, className }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number | undefined>(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const v = localStorage.getItem("volume");
    setVolume(Number(v) || 1);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    setDuration(audioRef.current?.duration);
  }, [audioRef.current?.duration]);

  return (
    <div className={className}>
      <audio
        ref={audioRef}
        src={src}
        onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="flex items-center gap-2 flex-row-reverse">
        <Button
          variant={"secondary"}
          className="min-w-9 min-h-9"
          size={"icon"}
          onClick={() => {
            if (audioRef.current) {
              if (isPlaying) {
                audioRef.current.pause();
              } else {
                audioRef.current.play();
              }
            }
            setIsPlaying(!isPlaying);
          }}
        >
          {isPlaying ? (
            <PauseIcon className="w-5 h-5" />
          ) : (
            <PlayIcon className="w-5 h-5" />
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
