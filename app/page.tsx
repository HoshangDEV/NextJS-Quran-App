import { SurahsType } from "@/schemas";
import SurahsComponent from "./_root/surahs-component";
import RootHeader from "./_root/root-header";
import { Separator } from "@/components/ui/separator";
import SomethingWentWrong from "@/components/something-went-wrong";

export default async function Page() {
  let surahs: SurahsType | null = null;

  try {
    const response = await fetch("https://api.alquran.cloud/v1/surah");
    if (response.status === 200) {
      const data = await response.json();
      surahs = data?.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error(error);
    return <SomethingWentWrong />;
  }

  return (
    <div className="space-y-14 py-8">
      <RootHeader />
      <Separator />
      {surahs && <SurahsComponent surahs={surahs} />}
    </div>
  );
}
