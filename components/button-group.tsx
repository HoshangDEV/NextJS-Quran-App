import Link from "next/link";
import { Button } from "./ui/button";
import { ApiIcon } from "./my-icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ThemeToggle } from "./theme/theme-toggle";
import Settings from "./settings";
import { HeartPulseIcon } from "lucide-react";

export default function ButtonGroup() {
  return (
    <div className="flex gap-2 items-center">
      <Button asChild size={"icon"} variant={"secondary"}>
        <Link href={"https://alquran.cloud/api"} target="_blank">
          <ApiIcon className="size-5 fill-secondary-foreground" />
        </Link>
      </Button>

      <Button asChild size={"icon"} variant={"secondary"}>
        <Link
          href={"https://github.com/HoshangDEV/NextJS-Quran-App"}
          target="_blank">
          <GitHubLogoIcon />
        </Link>
      </Button>

      <ThemeToggle />

      <Settings />

      <Button asChild size={"icon"}>
        <Link href={"/"}>
          <HeartPulseIcon className="" />
        </Link>
      </Button>
    </div>
  );
}
