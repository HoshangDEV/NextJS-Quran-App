"use client";

import { currentFontAtom } from "@/atoms";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FontNames } from "@/constants";
import { useAtom } from "jotai";
import { SettingsIcon } from "lucide-react";
import { Label } from "./ui/label";

export default function Settings() {
  const [font, setFont] = useAtom(currentFontAtom);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size={"icon"}>
          <SettingsIcon className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm py-10">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-left" style={{ fontFamily: "var(--font-noto-kufi-arabic)" }}>فۆنت</Label>
            <Select
              onValueChange={(value) => setFont(value)}
              value={font}
              dir="rtl">
              <SelectTrigger className="w-[180px] h-13 col-span-2">
                <SelectValue placeholder="فۆنت" />
              </SelectTrigger>
              <SelectContent>
                {FontNames.map((font) => (
                  <SelectItem
                    key={font.value}
                    value={font.value}
                    className="py-2.5">
                    <div className="flex flex-col text-start">
                      <span 
                        className="text-base"
                        style={{ fontFamily: `var(--font-${font.value})` }}>
                        لا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {font.label}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
