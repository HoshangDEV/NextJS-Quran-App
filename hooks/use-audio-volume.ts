"use client";

import { AUDIO_CONFIG } from "@/constants";
import { useEffect, useState } from "react";

/**
 * Custom hook for managing audio volume with localStorage persistence
 * @returns {object} Volume state and setter function
 */
export function useAudioVolume() {
  const [volume, setVolume] = useState<number>(AUDIO_CONFIG.DEFAULT_VOLUME);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load volume from localStorage on mount
  useEffect(() => {
    const storedVolume = localStorage.getItem(AUDIO_CONFIG.VOLUME_STORAGE_KEY);
    if (storedVolume !== null) {
      const parsedVolume = Number(storedVolume);
      if (!isNaN(parsedVolume) && parsedVolume >= 0 && parsedVolume <= 1) {
        setVolume(parsedVolume);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save volume to localStorage whenever it changes
  const updateVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    localStorage.setItem(AUDIO_CONFIG.VOLUME_STORAGE_KEY, clampedVolume.toString());
  };

  return { volume, setVolume: updateVolume, isInitialized };
}
