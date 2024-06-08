import { SurahType } from "@/schemas";
import { redirect } from "next/navigation";
import SurahComponent from "./_components/surah-component";

export default async function Page({ params }: { params: { surah: string } }) {
  const surah: SurahType = await fetch(
    `https://api.alquran.cloud/v1/surah/${params.surah}/ar.alafasy`
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
      <SurahComponent surah={surah} />
    </div>
  );
}
