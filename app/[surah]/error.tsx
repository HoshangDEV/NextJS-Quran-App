"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid place-items-center min-h-[60vh] text-center gap-4">
      <div>
        <h2 className="text-2xl font-bold font-noto-kufi-arabic">هەڵەیەک ڕوویدا</h2>
        <p className="text-muted-foreground mt-2 font-noto-kufi-arabic">
          تکایە دووبارە هەوڵبدەرەوە
        </p>
      </div>
      <Button onClick={reset} variant="outline">
        دووبارە هەوڵبدەرەوە
      </Button>
    </div>
  );
}
