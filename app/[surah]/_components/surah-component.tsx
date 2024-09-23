"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { HeartPulseIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import AudioPlayer from "./audio-player";
import ScrollProgressBar from "./scroll-progress-bar";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import AyahNumber from "./ayah-number";
import { SurahType, TafseerListType } from "@/types";
import TafseerComponent from "./tafseer-component";

export default function SurahComponent({
  surah,
  TafseerList,
}: {
  surah: SurahType["data"];
  TafseerList: TafseerListType;
}) {
  return (
    <>
      <ScrollProgressBar />
      <div className="space-y-14">
        <header className="flex justify-between items-center gap-4">
          <div className="flex gap-4 items-center">
            <Button asChild size={"icon"}>
              <Link href={"/"}>
                <HeartPulseIcon className="" />
              </Link>
            </Button>
            <ThemeToggle />
            <Button asChild size={"icon"} variant={"secondary"}>
              <Link href={"/"}>
                <HomeIcon className="size-5" />
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl md:text-5xl font-quran text-center pb-6">
            {surah.name}
          </h1>
        </header>
        <div className="flex flex-col gap-2">
          {surah.number !== 1 && (
            <Card>
              <CardHeader className="flex-row gap-2 items-center text-3xl rtl py-10">
                <div className="-mt-4 text-2xl font-quran text-center w-full">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
              </CardHeader>
            </Card>
          )}
          {surah &&
            surah.ayahs.map((ayah) => (
              <Card key={ayah.numberInSurah}>
                <CardHeader className="flex-col gap-2 items-start text-3xl rtl cursor-default">
                  <div className="text-2xl">
                    <span className="font-quran -mt-4 leading-[4rem] tracking-wide">
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
                </CardHeader>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}
