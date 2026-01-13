import { cn } from "../../utils/helperClassName";

import ProgressBar from "./progressbar";

interface SliderProps {
  progress: number;
  className?: string;
  children: React.ReactNode;
}

const BASE_CLASS = "slider w-full min-h-50 overflow-hidden relative shadow-xl";

export default function Slider({ progress, className, children }: SliderProps) {
  return (
    <div className={cn(BASE_CLASS, className)}>
      {children}
      <ProgressBar 
        progress={progress} 
        progressBarClass="h-1 absolute bottom-0 left-0 z-15" 
        progressBarFillClass="bg-primary-light" />
    </div>
  );
}
