import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { Volume1Icon, Volume2Icon, VolumeXIcon } from "lucide-react";
import { AUDIO_CONFIG } from "@/constants";
import { MouseEvent } from "react";

interface VolumeSliderProps {
  volume: number;
  setVolume: (volume: number) => void;
}

export default function VolumeSlider({
  volume,
  setVolume,
}: VolumeSliderProps) {
  const volumePercentage = Math.round(volume * 100);

  const handleVolumeChange = (values: number[]) => {
    const newVolume = values[0] / 100;
    setVolume(newVolume);
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
            min={AUDIO_CONFIG.MIN_VOLUME}
            max={AUDIO_CONFIG.MAX_VOLUME}
            aria-label="شريط التحكم بالصوت"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
