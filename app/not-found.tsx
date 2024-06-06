import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 px-4 md:px-6">
      <div className="grid gap-2 text-center">
        <div className="text-8xl font-bold text-gray-900 dark:text-gray-50">
          404
        </div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Oops! Page not found.
        </h1>
        <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
      </div>
      <Button asChild className="flex items-center gap-2">
        <Link href={"/"}>
          <HomeIcon className="size-4" /> Home
        </Link>
      </Button>
    </div>
  );
}
