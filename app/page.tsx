import { SurahsType } from "@/schemas";
import SurahsComponent from "./_root/surahs-component";
import RootHeader from "./_root/root-header";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  const surahs: SurahsType = await fetch("https://api.alquran.cloud/v1/surah")
    .then((res) => res.json())
    .then((data) => {
      return data?.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div className="space-y-14 py-8">
      <RootHeader />
      <Separator />
      <SurahsComponent surahs={surahs} />
    </div>
  );
}
