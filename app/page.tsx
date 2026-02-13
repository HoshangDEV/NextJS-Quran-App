import SurahsComponent from "./_root/surahs-component";
import RootHeader from "./_root/root-header";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="space-y-14 py-8">
      <RootHeader />
      <Separator />
      <SurahsComponent />
    </div>
  );
}
