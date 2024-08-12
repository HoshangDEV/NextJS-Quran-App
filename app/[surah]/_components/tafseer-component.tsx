"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TafseerListType, TafseerType } from "@/types";
import { BookIcon, Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { GetTafseer } from "@/action/server";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    startTransition(() => {
      GetTafseer({
        surahNumber,
        ayahNumber,
        tafseerId,
      })
        .then((res) => {
          if (res.status === 200) {
            setTafseerData(res.data);
          } else {
            toast.error("Failed to get tafseer");
          }
        })
        .catch((err) => {
          toast.error("Failed to get tafseer");
        });
    });
  };

  return (
    <>
      {/* Mofasir Dropdown */}
      <DropdownMenu>
        <Button asChild variant={"outline"} className="size-9 p-0.5">
          <DropdownMenuTrigger>
            <BookIcon className="size-4" />
          </DropdownMenuTrigger>
        </Button>
        <DropdownMenuContent className="font-kurdish text-right">
          <DropdownMenuLabel>تفسیر</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {TafseerList.map((tafseer) => (
            <DropdownMenuItem
              className="justify-end"
              key={tafseer.id}
              onClick={() => {
                handleTafseerClick(tafseer.id);
              }}>
              {tafseer.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Tafseer Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="font-kurdish">
          {isPending ? (
            <Loading />
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-center">
                  {tafseerData?.tafseer_name}
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[80vh] p-4 text-justify rtl">
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
