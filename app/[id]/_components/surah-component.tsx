"use client";

import { currentFontAtom } from "@/atoms";
import ButtonGroup from "@/components/button-group";
import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SurahType } from "@/types";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useAtomValue } from "jotai";
import AudioPlayer from "./audio-player";
import AudioProvider from "./audio-provider";
import AyahNumber from "./ayah-number";
import ScrollProgressBar from "./scroll-progress-bar";
import TafseerComponent from "./tafseer-component";

export default function SurahComponent({ surah }: { surah: SurahType }) {
  const font = useAtomValue(currentFontAtom);

  const virtualizer = useWindowVirtualizer({
    count: surah.ayahs.length,
    estimateSize: () => 200,
    overscan: 5,
  });

  return (
    <>
      <ScrollProgressBar />
      <AudioProvider ayahs={surah.ayahs} numberOfAyahs={surah.numberOfAyahs}>
        <div className="space-y-4">
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
                          ? ayah.text
                              .normalize("NFC")
                              .replace(
                                /^[\u064B-\u0652]*ب[\u064B-\u0652]*س[\u064B-\u0652]*م[\u064B-\u0652]*\s*[\u064B-\u0652]*[اٱإأآ][\u064B-\u0652]*ل[\u064B-\u0652]*ل[\u064B-\u0652]*[\u0651]?[\u064B-\u0652]*ه[\u064B-\u0652]*\s*[\u064B-\u0652]*[اٱإأآ][\u064B-\u0652]*ل[\u064B-\u0652]*ر[\u064B-\u0652]*ح[\u064B-\u0652]*م[\u064B-\u0652]*[\u0670]?[\u064B-\u0652]*ن[\u064B-\u0652]*\s*[\u064B-\u0652]*[اٱإأآ][\u064B-\u0652]*ل[\u064B-\u0652]*ر[\u064B-\u0652]*ح[\u064B-\u0652]*ی[\u064B-\u0652]*م[\u064B-\u0652]*\s*/,
                                ""
                              )
                              .trim()
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
