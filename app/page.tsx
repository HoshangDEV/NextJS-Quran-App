import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Surahs } from "@/schemas";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { HeartPulseIcon, HomeIcon } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const surahs: Surahs = await fetch("https://api.alquran.cloud/v1/surah")
    .then((res) => res.json())
    .then((data) => {
      return data?.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div className="space-y-14 py-8">
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-2 items-center">
          <Button asChild size={"icon"}>
            <Link href={"/"}>
              <HeartPulseIcon className="" />
            </Link>
          </Button>
          <Button asChild size={"icon"} variant={"secondary"}>
            <Link
              href={"https://github.com/HoshangDEV/NextJS-Quran-App"}
              target="_blank">
              <GitHubLogoIcon />
            </Link>
          </Button>
          <Button asChild size={"icon"} variant={"secondary"}>
            <Link href={"https://alquran.cloud/api"} target="_blank">
              <ApiIcon className="size-5" />
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl md:text-5xl font-quran text-center pb-6">
          القرآن الكریم
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 rtl">
        {surahs &&
          surahs.map((surah) => (
            <Link key={surah.number} href={`/${surah.number}`}>
              <Card className="hover:shadow-lg hover:scale-105 transition-all">
                <CardHeader className="flex-row gap-2 items-center text-3xl rtl">
                  <div className="flex gap-4 items-center text-2xl">
                    {/* <p className="font-roboto">{surah.number}</p> */}
                    <Button
                      asChild
                      variant={"outline"}
                      size={"icon"}
                      className="rounded-xl font-roboto">
                      <p>{surah.number}</p>
                    </Button>
                    <p className="font-quran mb-4">{surah.name}</p>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
}

function ApiIcon(props: any) {
  return (
    <svg
      {...props}
      fill="#000000"
      width="800px"
      height="800px"
      viewBox="0 0 32 32"
      id="icon"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8,9H4a2,2,0,0,0-2,2V23H4V18H8v5h2V11A2,2,0,0,0,8,9ZM4,16V11H8v5Z"
        transform="translate(0 0)"
      />
      <polygon points="22 11 25 11 25 21 22 21 22 23 30 23 30 21 27 21 27 11 30 11 30 9 22 9 22 11" />
      <path
        d="M14,23H12V9h6a2,2,0,0,1,2,2v5a2,2,0,0,1-2,2H14Zm0-7h4V11H14Z"
        transform="translate(0 0)"
      />
      <rect
        id="_Transparent_Rectangle_"
        data-name="&lt;Transparent Rectangle&gt;"
        style={{ fill: "none" }}
        width="32"
        height="32"
      />
    </svg>
  );
}
