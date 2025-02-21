import { FontNames } from "@/constants";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const isQuranPlayingAtom = atom(false);

export const currentAyahAtom = atomWithStorage<number>("currentAyah", 0);

export const currentFontAtom = atomWithStorage<string>(
  "currentFont",
  FontNames[0].value
);
