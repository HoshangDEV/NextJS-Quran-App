import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { SurahType } from "@/schemas";
import { HeartPulseIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { surah: string } }) {
  const surah: SurahType = await fetch(
    `https://api.alquran.cloud/v1/surah/${params.surah}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200) {
        return data.data;
      } else {
        redirect("/");
      }
    })
    .catch((error) => {
      console.log(error);

      redirect("/");
    });

  return (
    <div className="space-y-14 py-8">
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-4 items-center">
          <Button asChild size={"icon"}>
            <Link href={"/"}>
              <HeartPulseIcon className="" />
            </Link>
          </Button>
          <Button asChild size={"icon"} variant={"secondary"}>
            <Link href={"/"}>
              <HomeIcon className="size-5" />
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl md:text-5xl font-quran text-center pb-6">
          {surah.name}
        </h1>
      </div>
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
              <CardHeader className="flex-row gap-2 items-center text-3xl rtl cursor-default">
                <div className="flex gap-4 items-center text-2xl">
                  <p className="font-quran -mt-4 leading-[4rem]">
                    {ayah.numberInSurah === 1
                      ? ayah.text.replace(
                          "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ ",
                          ""
                        )
                      : ayah.text}
                  </p>
                  <Button
                    asChild
                    variant={"outline"}
                    size={"icon"}
                    className="rounded-xl">
                    <p>{ayah.numberInSurah}</p>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
      </div>
    </div>
  );
}
