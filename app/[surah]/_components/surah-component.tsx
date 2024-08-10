"use client";
import { SurahType } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Book,
  Copy,
  CopyCheck,
  HeartPulseIcon,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";
import AudioPlayer from "./audio-player";
import ScrollProgressBar from "./scroll-progress-bar";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import AyahNumber from "./ayah-number";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function SurahComponent({ surah }: { surah: SurahType }) {
  const [tafsirs, setTafsirs] = useState([]);
  const [tafsirmode, setTafsirMode] = useState<string>("hidden");
  const [mainTafsir, setMainTafsir] = useState([]);

  useEffect(() => {
    axios("http://api.quran-tafseer.com/tafseer/")
      .then(function (response) {
        setTafsirs(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const getTafsir = async (
    mainAyah: number,
    mainSurah: number,
    mofasirId: number,
  ) => {
    let config = `http://api.quran-tafseer.com/tafseer/${mofasirId}/${mainSurah}/${mainAyah}`;
    axios
      .get(config)
      .then((res) => {
        setMainTafsir(res.data.text);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            surah.ayahs.map((ayah) => {
              const [copyState, setCopyState] = useState(<Copy />);
              return (
                <Card key={ayah.numberInSurah}>
                  <CardHeader className="flex-col gap-2 items-start text-3xl rtl cursor-default">
                    <div className="text-2xl">
                      <span className="font-quran mt-4 leading-[4rem] tracking-wide">
                        {ayah.numberInSurah === 1
                          ? ayah.text.replace(
                              "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ",
                              "",
                            )
                          : ayah.text}
                      </span>
                      <div className="inline-block mr-2 -mb-3">
                        <AyahNumber number={ayah.numberInSurah} />
                      </div>
                    </div>
                    <AudioPlayer src={ayah.audio} className="w-full self-end" />
                    <div className=" w-full flex justify-start items-start flex-row gap-10">
                      <Button
                        onClick={() => {
                          if (tafsirmode == "hidden") {
                            setTafsirMode("grid");
                          } else if (tafsirmode == "grid") {
                            setTafsirMode("hidden");
                          }
                        }}
                      >
                        <Book />
                      </Button>
                      <Button
                        variant={"outline"}
                        onClick={() => {
                          setCopyState(<CopyCheck />);
                          navigator.clipboard.writeText(ayah.text);
                          setTimeout(() => {
                            setCopyState(<Copy />);
                          }, 1000);
                        }}
                      >
                        {copyState}
                      </Button>
                    </div>

                    <div>
                      {" "}
                      <div
                        className={`${tafsirmode} grid-cols-2 md:grid-cols-6 gap-3 simple-text`}
                      >
                        {tafsirs.map((item: any) => (
                          <Dialog>
                            <DialogTrigger>
                              <Card
                                onClick={() => {
                                  getTafsir(
                                    ayah.numberInSurah,
                                    surah.number,
                                    item.id,
                                  );
                                }}
                                className=" p-3 simple-text transition hover:scale-105 cursor-pointer"
                              >
                                <p>{item.name}</p>
                              </Card>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogDescription className=" mt-5 simple-text">
                                  <ScrollArea className=" h-[100vh] w-[450px] p-10 simple-text">
                                    <p className=" text-white">{mainTafsir}</p>
                                  </ScrollArea>
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>
                        ))}{" "}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
        </div>
      </div>
    </>
  );
}


/**
 edited by https://github.com/Mohmed-Ayoub-Js


 
*/