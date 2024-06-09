"use client";
import { SyncLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex items-center gap-4 justify-center h-screen text-muted-foreground">
      <SyncLoader color="#64748B" size={15} />
    </div>
  );
}
