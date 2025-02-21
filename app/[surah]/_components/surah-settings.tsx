"use client";

import { currentFontAtom } from "@/atoms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FontNames } from "@/constants";
import { useAtom } from "jotai";

export default function SurahSettings() {
  const [font, setFont] = useAtom(currentFontAtom);

  return (
    <Select onValueChange={(value) => setFont(value)} value={font}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="فۆنت" />
      </SelectTrigger>
      <SelectContent>
        {FontNames.map((font) => (
          <SelectItem key={font.value} value={font.value}>
            {font.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
