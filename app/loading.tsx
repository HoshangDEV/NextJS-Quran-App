import { Loader } from "lucide-react";
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen text-muted-foreground">
      <Loader className="w-4 h-4 mr-2 animate-spin" />
      <p>Loading...</p>
    </div>
  );
}
