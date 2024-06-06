import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Surah } from "@/schemas";
import { HeartPulseIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { surah: string } }) {
  const surah: Surah = await fetch(
    `https://api.alquran.cloud/v1/surah/${params.surah}/ar.asad`
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
        <Link href={"/"}>
          <HeartPulseIcon className="w-10 h-10 text-muted-foreground" />
        </Link>
        <h1 className="text-3xl md:text-5xl font-quran text-center">
          {surah.name}
        </h1>
        <Button asChild size={"icon"} variant={"secondary"}>
          <Link href={"/"}>
            <HomeIcon className="size-5" />
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="flex-row gap-2 items-center text-3xl rtl">
            <div className="-mt-4 text-2xl font-quran text-center w-full">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
          </CardHeader>
        </Card>
        {surah &&
          surah.ayahs.map((ayah) => (
            <Card key={ayah.numberInSurah}>
              <CardHeader className="flex-row gap-2 items-center text-3xl rtl">
                <div className="flex gap-4 text-2xl items-start">
                  <p className="font-roboto border min-w-10 size-10 grid place-content-center rounded-2xl font-bold text-base">
                    {ayah.numberInSurah}
                  </p>
                  <p className="font-quran -mt-4 leading-[4rem]">
                    {ayah.numberInSurah === 1
                      ? ayah.text.replace(
                          "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ",
                          ""
                        )
                      : ayah.text}
                  </p>
                </div>
              </CardHeader>
            </Card>
          ))}
      </div>
    </div>
  );
}
