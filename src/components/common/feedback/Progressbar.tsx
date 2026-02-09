// --- IMPORTS ---
import { cn } from "@/utils/helper";

// --- TYPE DEFINATIONS ---
interface ProgressBarProps {
  progress: number;
  progressBarClass?: string;
  progressBarFillClass?: string;
}

// --- CONSTANTS ---
const BASE_CLASS = "progress-bar w-full bg-gray-dark overflow-hidden transition-all duration-300";
const FILL_CLASS = "progress-bar-fill h-full";

export default function ProgressBar({ progress, progressBarClass, progressBarFillClass }: ProgressBarProps) {
  return (
    <div className={cn(BASE_CLASS, progressBarClass)}>
      {/* --- PROGRESS BAR FILL --- */}
      <div 
        className={cn(FILL_CLASS, progressBarFillClass)} 
        style={{ width: `${progress}%` }}
      >
      </div>
    </div>
  )
}