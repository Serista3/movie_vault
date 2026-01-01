import ProgressBar from "./progressbar";

interface SliderProps {
  progress: number;
  className?: string;
  children: React.ReactNode;
}

export default function Slider({ progress, className = 'min-h-50', children }: SliderProps) {
  return (
    <div className={`slider ${className} w-full overflow-hidden relative`}>
      {children}
      <ProgressBar 
        progress={progress} 
        progressBarClass="w-full h-1 bg-gray-dark absolute bottom-0 left-0 z-15" 
        progressBarFillClass="bg-main-light" />
    </div>
  );
}
