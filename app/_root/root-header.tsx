"use client";

import { currentFontAtom } from "@/atoms";
import ButtonGroup from "@/components/button-group";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";

export default function RootHeader() {
  const font = useAtomValue(currentFontAtom);

  return (
    <div className="flex justify-between items-center gap-4">
      <h1
        className={cn("text-3xl md:text-5xl text-center pb-6", `font-${font}`)}>
        القرآن الكریم
      </h1>

      <ButtonGroup />
    </div>
  );
}
