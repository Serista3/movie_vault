// --- IMPORTS ---
import { cn } from "@/utils/helper";

// --- TYPE DEFINATIONS ---
interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

// --- CONSTANTS ---
const BASE_CLASS = "card overflow-hidden rounded-[10px] snap-center relative transition-all duration-300";

export default function Card({ className, children }: CardProps) {
  return (
    <div className={cn(BASE_CLASS, className)}>
      {children}
    </div>
  );
}