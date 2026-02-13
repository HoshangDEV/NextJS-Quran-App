"use client";

import { currentFontAtom } from "@/atoms";
import ButtonGroup from "@/components/button-group";
import { Card, CardHeader } from "@/components/ui/card";
import { SurahType } from "@/types";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useAtomValue } from "jotai";
import { useRef } from "react";
import AudioPlayer from "./audio-player";
import AudioProvider from "./audio-provider";
import AyahNumber from "./ayah-number";
import ScrollProgressBar from "./scroll-progress-bar";
import TafseerComponent from "./tafseer-component";
import { Separator } from "@/components/ui/separator";

export default function SurahComponent({
  surah,
}: {
  surah: SurahType["data"];
}) {
  const font = useAtomValue(currentFontAtom);
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: surah.ayahs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    overscan: 5,
  });

  return (
    <>
      <ScrollProgressBar scrollRef={parentRef} />
      <AudioProvider ayahs={surah.ayahs} numberOfAyahs={surah.numberOfAyahs}>
        <div
          ref={parentRef}
          className="h-[calc(100vh-2rem)] overflow-auto space-y-4"
        >
          <header className="flex justify-between items-center gap-4 sticky top-0 bg-background z-50 pb-2 pt-5">
            <h1
              className="text-3xl md:text-5xl text-center pb-6"
              style={{ fontFamily: `var(--font-${font})` }}
            >
              {surah.name}
            </h1>

            <ButtonGroup />
          </header>

          {surah.number !== 1 && (
            <Card>
              <CardHeader className="flex-row gap-2 items-center text-3xl rtl py-10">
                <div
                  className="text-2xl text-center w-full"
                  style={{ fontFamily: `var(--font-${font})` }}
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
              </CardHeader>
            </Card>
          )}

          <div
            style={{
              height: virtualizer.getTotalSize(),
              position: "relative",
            }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const ayah = surah.ayahs[virtualRow.index];
              return (
                <div
                  key={ayah.numberInSurah}
                  data-index={virtualRow.index}
                  ref={virtualizer.measureElement}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <div className="flex flex-col gap-2 items-start text-3xl rtl cursor-default p-4">
                    <div className="text-2xl">
                      <span
                        className="-mt-4 leading-[4rem] tracking-wide"
                        style={{ fontFamily: `var(--font-${font})` }}
                      >
                        {ayah.numberInSurah === 1
                          ? ayah.text.replace(
                              "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ",
                              ""
                            )
                          : ayah.text}
                      </span>
                      <div className="inline-block mr-2 -mb-3">
                        <AyahNumber number={ayah.numberInSurah} />
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 w-full items-center">
                      <TafseerComponent ayahNumber={ayah.number} />
                      <Separator orientation="vertical" className="h-4" />
                      <AudioPlayer
                        src={ayah.audio}
                        className="w-full"
                        numberInSurah={ayah.numberInSurah}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AudioProvider>
    </>
  );
}
