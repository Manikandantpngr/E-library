import { BookHeart } from "lucide-react";
import { cn } from "@/lib/utils";

export function SecureLibLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-primary", className)}>
      <BookHeart className="h-6 w-6" />
      <span className="font-headline text-2xl font-bold">SecureLib</span>
    </div>
  );
}
