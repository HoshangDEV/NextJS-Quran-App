"use client";

import { GetTafseer } from "@/action";
import { TAFSEER_EDITIONS } from "@/constants";
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
import { BookIcon, Loader } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { AyahEditionResponse } from "@/types";
import { cn } from "@/lib/utils";

type TafseerComponentProps = {
  ayahNumber: number;
};

export default function TafseerComponent({
  ayahNumber,
}: TafseerComponentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [tafseerData, setTafseerData] = useState<
    AyahEditionResponse["data"] | undefined
  >(undefined);

  const handleTafseerClick = (edition: string) => {
    setTafseerData(undefined);

    setIsDialogOpen(true);
    startTransition(async () => {
      const { error, success, data } = await GetTafseer({
        ayahNumber,
        edition,
      });
      if (error) {
        toast.error("فشل تحميل التفسير");
        console.error("Tafseer error:", error);
        setIsDialogOpen(false);
      }
      if (success && data) {
        setTafseerData(data);
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

            <DropdownMenuLabel className="text-xs text-muted-foreground">
              کوردی
            </DropdownMenuLabel>
            {TAFSEER_EDITIONS.kurdish.map((edition) => (
              <DropdownMenuItem
                className="justify-end"
                key={edition.identifier}
                onClick={() => handleTafseerClick(edition.identifier)}
              >
                {edition.name}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              عربي
            </DropdownMenuLabel>
            {TAFSEER_EDITIONS.arabic.map((edition) => (
              <DropdownMenuItem
                className="justify-end"
                key={edition.identifier}
                onClick={() => handleTafseerClick(edition.identifier)}
              >
                {edition.name}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              English
            </DropdownMenuLabel>
            {TAFSEER_EDITIONS.english.map((edition) => (
              <DropdownMenuItem
                className="justify-end"
                key={edition.identifier}
                onClick={() => handleTafseerClick(edition.identifier)}
              >
                {edition.name}
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Tafseer Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center font-noto-kufi-arabic">
              {tafseerData?.edition.name || "تفسیر"}
            </DialogTitle>
          </DialogHeader>

          {isPending ? (
            <Loading />
          ) : (
            <ScrollArea
              className={cn(
                "max-h-[80vh] p-4 text-justify",
                tafseerData?.edition.language === "en"
                  ? "font-poppins"
                  : "font-noto-naskh-arabic"
              )}
              dir={tafseerData?.edition.language === "en" ? "ltr" : "rtl"}
            >
              <p>{tafseerData?.text}</p>
            </ScrollArea>
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
