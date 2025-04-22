"use client";

import { currentFontAtom } from "@/atoms";
import ButtonGroup from "@/components/button-group";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SurahType, TafseerListType } from "@/types";
import { useAtomValue } from "jotai";
import AudioPlayer from "./audio-player";
import AyahNumber from "./ayah-number";
import ScrollProgressBar from "./scroll-progress-bar";
import TafseerComponent from "./tafseer-component";

export default function SurahComponent({
  surah,
  TafseerList,
}: {
  surah: SurahType["data"];
  TafseerList: TafseerListType;
}) {
  const font = useAtomValue(currentFontAtom);

  return (
    <>
      <ScrollProgressBar />
      <div className="space-y-14">
        <header className="flex justify-between items-center gap-4 sticky top-1 bg-background z-50 pb-2 pt-5">
          <h1
            className={cn(
              "text-3xl md:text-5xl text-center pb-6",
              `font-${font}`
            )}
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
                  className={cn("text-2xl text-center w-full", `font-${font}`)}
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
              </CardHeader>
            </Card>
          )}
          {surah &&
            surah.ayahs.map((ayah) => (
              <Card key={ayah.numberInSurah}>
                <div className="flex flex-col gap-2 items-start text-3xl rtl cursor-default p-6">
                  <div className="text-2xl">
                    <span
                      className={cn(
                        "-mt-4 leading-[4rem] tracking-wide",
                        `font-${font}`
                      )}
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
                  <AudioPlayer
                    src={ayah.audio}
                    className="w-full self-end"
                    numberInSurah={ayah.numberInSurah}
                    numberOfAyahs={surah.numberOfAyahs}
                  />
                  <TafseerComponent
                    surahNumber={surah.number}
                    ayahNumber={ayah.numberInSurah}
                    TafseerList={TafseerList}
                  />
                </div>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}
