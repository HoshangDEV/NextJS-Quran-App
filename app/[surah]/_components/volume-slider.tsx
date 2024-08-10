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

export default function VolumeSlider({
  volume,
  setVolume,
}: {
  volume: number;
  setVolume: (volume: number) => void;
}) {
  const onVolumeClick = () => {
    const v = localStorage.getItem("volume");
    setVolume(Number(v) || 1);
  };

  const onVolumeChange = (value: number) => {
    setVolume(value);
    localStorage.setItem("volume", value.toString());
  };

  return (
    <DropdownMenu onOpenChange={onVolumeClick}>
      <DropdownMenuTrigger asChild>
        <Button variant={"secondary"} size={"icon"} className="min-w-9 min-h-9">
          <Volume1Icon className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] pb-3">
        <DropdownMenuLabel className="flex items-center gap-2">
          <span className="mb-1">
            {volume > 0.5 ? (
              <Volume2Icon className="w-5 h-5" />
            ) : volume === 0 ? (
              <VolumeXIcon className="w-5 h-5" />
            ) : (
              <Volume1Icon className="w-5 h-5" />
            )}
          </span>
          Volume {(volume * 100).toFixed(0)}%
        </DropdownMenuLabel>
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem onClick={(e: any) => e.preventDefault()}>
          <Slider
            value={[volume * 100]}
            onValueChange={(values) => {
              setVolume(values[0] / 100);
              console.log(values[0] / 100);

              onVolumeChange(values[0] / 100);
            }}
            min={0}
            max={100}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
