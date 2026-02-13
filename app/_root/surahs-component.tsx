"use client";

import shape_1 from "@/assets/shape-1.png";
import { currentFontAtom } from "@/atoms";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SURAHS } from "@/data/quran";
import { useAtomValue } from "jotai";
import { SearchIcon, XCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";

export default function SurahsComponent() {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const font = useAtomValue(currentFontAtom);

  const filteredSurahs = useMemo(() => {
    if (!deferredSearch) return SURAHS;
    return SURAHS.filter((surah) =>
      surah.name
        .replaceAll(/[\u064B-\u0652\u064E-\u0650\u0651\u0652\u06E1]/g, "")
        .replaceAll("ي", "ی")
        .replaceAll(/إ|أ|آ|ٱ/g, "ا")
        .includes(deferredSearch)
    );
  }, [deferredSearch]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full md:max-w-lg">
        <Input
          type="text"
          placeholder="گەڕان..."
          className="pr-9 pl-4 py-2 rtl font-noto-kufi-arabic"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <Button
          className="absolute left-0 top-1/2 -translate-y-1/2 size-9 p-0"
          variant={"ghost"}
          onClick={() => setSearch("")}
        >
          <XCircleIcon
            className={` w-5 h-5 text-muted-foreground transition-opacity ${
              search ? "opacity-100" : "opacity-0"
            }`}
          />
        </Button>
        <SearchIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 rtl">
        {filteredSurahs.map((surah) => (
          <Link key={surah.number} href={`/${surah.number}`}>
            <Card className="hover:shadow-lg hover:scale-105 transition-all relative h-[100px] overflow-hidden">
              <Image
                quality={50}
                src={shape_1}
                alt=""
                width={120}
                height={120}
                className="absolute left-0 top-0 hover:border-none hover:outline-none hover:ring-0 w-[120px] h-[120px]"
                loading="lazy"
              />
              <CardHeader className="flex-row gap-2 items-center text-3xl rtl z-50">
                <div className="flex gap-4 items-center text-2xl">
                  <Button
                    asChild
                    variant={"outline"}
                    size={"icon"}
                    className="rounded-xl"
                  >
                    <p>{surah.number}</p>
                  </Button>
                  <p
                    className="mb-4"
                    style={{ fontFamily: `var(--font-${font})` }}
                  >
                    {surah.name}
                  </p>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
