import { SurahType } from "@/schemas";
import SurahComponent from "./_components/surah-component";
import SomethingWentWrong from "@/components/something-went-wrong";

export default async function Page({ params }: { params: { surah: string } }) {
  let surah: SurahType | null = null;

  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/surah/${params.surah}/ar.alafasy`,
    );
    const data = await response.json();
    if (data.code === 200) {
      surah = data.data;
    } else {
      return <SomethingWentWrong />;
    }
  } catch (error) {
    console.error(error);
    return <SomethingWentWrong />;
  }

  return (
    <div className="py-8">{surah && <SurahComponent surah={surah} />}</div>
  );
}
