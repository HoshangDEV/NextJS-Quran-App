import { ApiIcon } from "@/components/my-icons";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { HeartPulseIcon } from "lucide-react";
import Link from "next/link";

export default function RootHeader() {
  return (
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
            <ApiIcon className="size-5 fill-secondary-foreground" />
          </Link>
        </Button>
        <ThemeToggle />
      </div>
      <h1 className="text-3xl md:text-5xl font-quran text-center pb-6">
        القرآن الكریم
      </h1>
    </div>
  );
}
