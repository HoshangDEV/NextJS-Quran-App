import { FontNames } from "@/constants";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const isQuranPlayingAtom = atom(false);

export const currentAyahAtom = atomWithStorage<number>("currentAyah", 0);

export const currentFontAtom = atomWithStorage<string>(
  "currentFont",
  FontNames[0].value
);

export const audioSrcAtom = atom<string>("");

export const audioDurationAtom = atom(0);

export const audioCurrentTimeAtom = atom(0);

export const volumeAtom = atomWithStorage<number>("volume", 1);

// When set to a non-null value, the audio provider seeks to that time and resets to null
export const audioSeekTimeAtom = atom<number | null>(null);
