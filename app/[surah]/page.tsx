import SurahComponent from "./_components/surah-component";
import SomethingWentWrong from "@/components/something-went-wrong";
import { GetSurah, GetTafseerList } from "@/action";
import { redirect } from "next/navigation";
export default async function Page({
  params,
}: {
  params: Promise<{ surah: string }>;
}) {
  const { surah } = await params;

  // check if the params value is a number
  const surahNumber = Number(surah);
  if (isNaN(surahNumber)) redirect("/");

  // get tafseer list data
  const { error: tafseerError, data: TafseerList } = await GetTafseerList();
  if (tafseerError || !TafseerList) return <SomethingWentWrong />;
  // get surah data
  const { error, data } = await GetSurah({ surahNumber });
  if (error || !data) return <SomethingWentWrong />;

  return (
    <div className="py-8">
      <SurahComponent surah={data} TafseerList={TafseerList} />
    </div>
  );
}
