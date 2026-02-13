"use client";

import {
  audioCurrentTimeAtom,
  audioDurationAtom,
  audioSeekTimeAtom,
  audioSrcAtom,
  currentAyahAtom,
  isQuranPlayingAtom,
  volumeAtom,
} from "@/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { toast } from "sonner";

interface AudioProviderProps {
  ayahs: { numberInSurah: number; audio: string }[];
  numberOfAyahs: number;
  children: React.ReactNode;
}

export default function AudioProvider({
  ayahs,
  numberOfAyahs,
  children,
}: AudioProviderProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [audioSrc, setAudioSrc] = useAtom(audioSrcAtom);
  const [isPlaying, setIsPlaying] = useAtom(isQuranPlayingAtom);
  const [currentAyah, setCurrentAyah] = useAtom(currentAyahAtom);
  const volume = useAtomValue(volumeAtom);
  const setDuration = useSetAtom(audioDurationAtom);
  const setCurrentTime = useSetAtom(audioCurrentTimeAtom);
  const [seekTime, setSeekTime] = useAtom(audioSeekTimeAtom);

  const audioMap = useMemo(() => {
    const map = new Map<number, string>();
    for (const ayah of ayahs) {
      map.set(ayah.numberInSurah, ayah.audio);
    }
    return map;
  }, [ayahs]);

  // Sync volume to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle play/pause state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioSrc) return;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Failed to play audio:", error);
        toast.error("فشل تشغيل الصوت");
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, audioSrc, setIsPlaying]);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      audioRef.current.volume = volume;
    }
  }, [setDuration, volume]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, [setCurrentTime]);

  const handleEnded = useCallback(() => {
    if (currentAyah < numberOfAyahs) {
      const nextAyah = currentAyah + 1;
      const nextSrc = audioMap.get(nextAyah);
      setCurrentAyah(nextAyah);
      if (nextSrc) {
        setAudioSrc(nextSrc);
        // isPlaying stays true — the play effect will trigger on src change
      }
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    }
  }, [currentAyah, numberOfAyahs, audioMap, setIsPlaying, setCurrentAyah, setAudioSrc, setCurrentTime, setDuration]);

  const handleError = useCallback(() => {
    console.error(`Audio failed to load for ayah ${currentAyah}`);
    toast.error(`فشل تحميل الصوت للآية ${currentAyah}`);
    setIsPlaying(false);
  }, [currentAyah, setIsPlaying]);

  // Handle seek requests from audio-player
  useEffect(() => {
    if (seekTime !== null && audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
      setSeekTime(null);
    }
  }, [seekTime, setSeekTime, setCurrentTime]);

  // Reset time atoms when src changes
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
  }, [audioSrc, setCurrentTime, setDuration]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setIsPlaying(false);
      setAudioSrc("");
      setCurrentTime(0);
      setDuration(0);
    };
  }, [setIsPlaying, setAudioSrc, setCurrentTime, setDuration]);

  return (
    <>
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onError={handleError}
        />
      )}
      {children}
    </>
  );
}
