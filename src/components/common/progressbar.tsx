interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="progress-bar w-full h-1 bg-gray-dark overflow-hidden absolute bottom-0 left-0 z-15">
      <div className="`progress-bar-fill h-full bg-main-light" style={{ width: `${progress}%` }}></div>
    </div>
  )
}