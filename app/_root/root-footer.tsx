import { CopyrightIcon } from "lucide-react";
import Link from "next/link";

export default function RootFooter() {
  return (
    <footer className="flex gap-1 my-8 font-normal text-sm items-center justify-center h-10 text-muted-foreground">
      <CopyrightIcon className="w-4 h-4" />
      <Link
        href="https://github.com/HoshangDEV"
        className="hover:underline"
        target="_blank">
        HoshangDEV
      </Link>
      | {new Date().getFullYear()}
    </footer>
  );
}
