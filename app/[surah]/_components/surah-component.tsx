"use client";

import { currentFontAtom } from "@/atoms";
import ButtonGroup from "@/components/button-group";
import { Card, CardHeader } from "@/components/ui/card";
import { SurahType } from "@/types";
import { useAtomValue } from "jotai";
import AudioPlayer from "./audio-player";
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

  return (
    <>
      <ScrollProgressBar />
      <div className="space-y-14">
        <header className="flex justify-between items-center gap-4 sticky top-1 bg-background z-50 pb-2 pt-5">
          <h1
            className="text-3xl md:text-5xl text-center pb-6"
            style={{ fontFamily: `var(--font-${font})` }}
          >
            {surah.name}
          </h1>

          <ButtonGroup />
        </header>
        <div className="flex flex-col gap-2">
          {surah.number !== 1 && (
            <Card>
              <CardHeader className="flex-row gap-2 items-center text-3xl rtl py-10">
                <div
                  className="text-2xl text-center w-full"
                  style={{ fontFamily: `var(--font-${font})` }}
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
              </CardHeader>
            </Card>
          )}
          {surah &&
            surah.ayahs.map((ayah) => (
              <div
                className="flex flex-col gap-2 items-start text-3xl rtl cursor-default p-4"
                key={ayah.numberInSurah}
              >
                <div className="text-2xl">
                  <span
                    className="-mt-4 leading-[4rem] tracking-wide"
                    style={{ fontFamily: `var(--font-${font})` }}
                  >
                    {ayah.numberInSurah === 1
                      ? ayah.text.replace(
                          "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ",
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
                    numberOfAyahs={surah.numberOfAyahs}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
