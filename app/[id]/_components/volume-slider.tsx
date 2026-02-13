"use client";

import { volumeAtom } from "@/atoms";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { useAtom } from "jotai";
import { Volume1Icon, Volume2Icon, VolumeXIcon } from "lucide-react";
import { MouseEvent } from "react";

export default function VolumeSlider() {
  const [volume, setVolume] = useAtom(volumeAtom);
  const volumePercentage = Math.round(volume * 100);

  const handleVolumeChange = (values: number[]) => {
    setVolume(values[0] / 100);
  };

  const handleMenuItemClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const getVolumeIcon = () => {
    if (volume === 0) {
      return <VolumeXIcon className="w-5 h-5" />;
    } else if (volume > 0.5) {
      return <Volume2Icon className="w-5 h-5" />;
    } else {
      return <Volume1Icon className="w-5 h-5" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="min-w-8 w-8 h-8"
          aria-label={`مستوى الصوت: ${volumePercentage}%`}
        >
          <Volume1Icon className="w-3.5 h-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] pb-3" side="left">
        <DropdownMenuLabel className="flex items-center gap-2 justify-between">
          <span className="mb-1">{getVolumeIcon()}</span>
          {volumePercentage}%
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={handleMenuItemClick}>
          <Slider
            value={[volumePercentage]}
            onValueChange={handleVolumeChange}
            min={0}
            max={100}
            aria-label="شريط التحكم بالصوت"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
