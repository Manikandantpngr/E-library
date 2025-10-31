import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export function ELearningLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600", className)}>
      <GraduationCap className="h-7 w-7 text-pink-500" />
      <span className="font-headline text-2xl font-bold">E-Learning</span>
    </div>
  );
}
