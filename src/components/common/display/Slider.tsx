// --- IMPORTS ---
import { cn } from "@/utils/helper";
import { Progressbar } from "@/components/common";

// --- TYPE DEFINATIONS ---
interface SliderProps {
  progress: number;
  className?: string;
  children: React.ReactNode;
}

// --- CONSTANTS ---
const BASE_CLASS = "slider w-full min-h-50 sm:min-h-75 lg:min-h-100 xl:min-h-125 overflow-hidden relative z-3 shadow-xl";

export default function Slider({ progress, className, children }: SliderProps) {
  return (
    <div className={cn(BASE_CLASS, className)}>
      {/* --- SLIDER CONTENT --- */}
      {children}

      {/* --- PROGRESS BAR --- */}
      <Progressbar 
        progress={progress} 
        progressBarClass="h-1 absolute bottom-0 left-0 z-15" 
        progressBarFillClass="bg-primary-light" />
    </div>
  );
}