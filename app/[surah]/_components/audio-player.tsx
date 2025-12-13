"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "sonner";
import VolumeSlider from "./volume-slider";
import { currentAyahAtom, isQuranPlayingAtom } from "@/atoms";
import { useAtom } from "jotai";
import { useAudioVolume } from "@/hooks/use-audio-volume";

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
  const [duration, setDuration] = useState(0);
  const { volume, setVolume, isInitialized } = useAudioVolume();
  const [isPlaying, setIsPlaying] = useAtom(isQuranPlayingAtom);
  const [currentAyah, setCurrentAyah] = useAtom(currentAyahAtom);

  const isCurrentAyah = currentAyah === numberInSurah;
  const isThisPlayerPlaying = isPlaying && isCurrentAyah;

  // Sync audio element volume with hook state
  useEffect(() => {
    if (audioRef.current && isInitialized) {
      audioRef.current.volume = volume;
    }
  }, [volume, isInitialized]);

  // Play audio function with error handling
  const playAudio = useCallback(async () => {
    if (!audioRef.current) return;

    try {
      audioRef.current.volume = volume;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Failed to play audio:", error);
      toast.error("فشل تشغيل الصوت");
      setIsPlaying(false);
    }
  }, [volume, setIsPlaying]);

  // Pause audio function
  const pauseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  }, [setIsPlaying]);

  // Handle play/pause button click
  const handlePlayPause = useCallback(() => {
    if (isThisPlayerPlaying) {
      pauseAudio();
    } else {
      // Stop any currently playing ayah and play this one
      if (currentAyah !== numberInSurah) {
        setCurrentAyah(numberInSurah);
      }
      playAudio();
    }
  }, [isThisPlayerPlaying, pauseAudio, currentAyah, numberInSurah, setCurrentAyah, playAudio]);

  // Sync playback when current ayah changes externally (e.g., auto-play next)
  useEffect(() => {
    if (!isInitialized) return;

    // If this ayah becomes current and should be playing, start it
    if (isCurrentAyah && isPlaying && audioRef.current?.paused) {
      playAudio();
    }
    // If this ayah is no longer current but is still playing, pause it
    else if (!isCurrentAyah && audioRef.current && !audioRef.current.paused) {
      pauseAudio();
    }
  }, [currentAyah, isCurrentAyah, isPlaying, isInitialized, playAudio, pauseAudio]);

  // Handle audio metadata loaded
  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  // Handle audio ended - auto-play next ayah
  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    if (numberInSurah < numberOfAyahs) {
      setCurrentAyah(numberInSurah + 1);
    }
  }, [numberInSurah, numberOfAyahs, setIsPlaying, setCurrentAyah]);

  // Handle audio errors
  const handleAudioError = useCallback(() => {
    console.error(`Audio failed to load for ayah ${numberInSurah}`);
    toast.error(`فشل تحميل الصوت للآية ${numberInSurah}`);
    setIsPlaying(false);
  }, [numberInSurah, setIsPlaying]);

  // Handle progress slider change
  const handleProgressChange = useCallback(
    (value: number[]) => {
      if (audioRef.current && duration > 0) {
        const newTime = (value[0] / 100) * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
      }
    },
    [duration]
  );

  return (
    <div className={className}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleAudioError}
      />

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
          value={duration > 0 ? [(currentTime / duration) * 100] : [0]}
          onValueChange={handleProgressChange}
          disabled={duration === 0}
          aria-label="شريط التقدم"
        />
        <VolumeSlider volume={volume} setVolume={setVolume} />
      </div>
    </div>
  );
}
