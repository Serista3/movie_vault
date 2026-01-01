import { useEffect, useState } from "react";

interface UseSliderParams<T> {
  items: T[];
  isPaused?: boolean;
  timeoutDuration?: number;
  updateInterval?: number;
}

export function useSlider<T>({ items, isPaused = false, timeoutDuration = 15000, updateInterval = 10 }: UseSliderParams<T>) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if(isPaused) return;
    
    const intervalId = setInterval(() => {
      setProgress(prev => {
        if(prev >= 100){
          setCurrentSlide(prevCurSlide => (prevCurSlide + 1) % items.length);
          return 0;
        }

        return prev + (updateInterval / timeoutDuration) * 100;
      })
    }, updateInterval)

    return () => clearInterval(intervalId);
  }, [items.length, currentSlide, isPaused, timeoutDuration, updateInterval]);

  return { currentSlide, progress };
}