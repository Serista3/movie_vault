interface ProgressBarProps {
  progress: number;
  progressBarClass?: string;
  progressBarFillClass?: string;
}

export default function ProgressBar({ progress, progressBarClass = '', progressBarFillClass = '' }: ProgressBarProps) {
  return (
    <div className={`progress-bar ${progressBarClass} w-full bg-gray-dark overflow-hidden transition-all duration-300`}>
      <div className={`progress-bar-fill h-full ${progressBarFillClass}`} style={{ width: `${progress}%` }}></div>
    </div>
  )
}
