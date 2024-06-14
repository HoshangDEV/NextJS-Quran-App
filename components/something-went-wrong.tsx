import Link from "next/link";
import { Button } from "./ui/button";

export default function SomethingWentWrong() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md space-y-6 text-center">
        <h1 className="text-6xl font-bold tracking-tighter">Oops!</h1>
        <p className="text-xl font-medium text-secondary-foreground">
          Something went wrong.
        </p>
        <Button asChild>
          <Link href={"https://hoshang.dev"}>Contact</Link>
        </Button>
      </div>
    </main>
  );
}
