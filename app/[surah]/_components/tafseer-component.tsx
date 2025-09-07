"use client";

import { GetKurdishTafseer } from "@/action";
import { GetTafseer } from "@/action/server";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TafseerListType, TafseerType } from "@/types";
import { BookIcon, Loader } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type TafseerComponentProps = {
  surahNumber: number;
  ayahNumber: number;
  TafseerList: TafseerListType;
};

export default function TafseerComponent({
  surahNumber,
  ayahNumber,
  TafseerList,
}: TafseerComponentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [tafseerData, setTafseerData] = useState<TafseerType | undefined>(
    undefined
  );

  const handleTafseerClick = (tafseerId: number) => {
    setIsDialogOpen(true);
    startTransition(async () => {
      if (tafseerId === 1946) {
        const { error, success, data } = await GetKurdishTafseer({
          ayahNumber,
        });
        if (error) {
          toast.error("Failed to get tafseer");
        }
        if (success) {
          setTafseerData({
            tafseer_id: 1946,
            tafseer_name: "کوردی",
            ayah_url: "",
            ayah_number: ayahNumber,
            text: data.text,
          });
        }
      } else {
        const { error, success, data } = await GetTafseer({
          surahNumber,
          ayahNumber,
          tafseerId,
        });
        if (error) {
          toast.error("Failed to get tafseer");
        }
        if (success) {
          setTafseerData(data);
        }
      }
    });
  };

  return (
    <>
      {/* Mofasir Dropdown */}
      <DropdownMenu modal={false}>
        <Button
          asChild
          variant={"outline"}
          className="gap-2 font-noto-kufi-arabic text-xs"
        >
          <DropdownMenuTrigger>
            <BookIcon className="size-4" />
            تفسیر
          </DropdownMenuTrigger>
        </Button>
        <DropdownMenuContent
          side="left"
          className="font-noto-kufi-arabic text-right"
        >
          <DropdownMenuLabel>تفسیر</DropdownMenuLabel>
          <ScrollArea className="h-[40vh] pr-2">
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="justify-end"
              onClick={() => {
                handleTafseerClick(1946);
              }}
            >
              کوردی
            </DropdownMenuItem>

            {TafseerList.map((tafseer) => (
              <DropdownMenuItem
                className="justify-end"
                key={tafseer.id}
                onClick={() => {
                  handleTafseerClick(tafseer.id);
                }}
              >
                {tafseer.name}
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Tafseer Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          {isPending ? (
            <Loading />
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-center font-noto-kufi-arabic">
                  {tafseerData?.tafseer_name}
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[80vh] p-4 text-justify rtl font-noto-naskh-arabic">
                <p>{tafseerData?.text}</p>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function Loading() {
  return (
    <div className="grid place-items-center min-h-48">
      <Loader className="size-4 animate-spin" />{" "}
    </div>
  );
}
