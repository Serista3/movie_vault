import { useEffect, useState } from "react";
import { useNavigation } from "react-router";

export function usePageLoader() {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let intervalId: number;
    let timeOutId: number;

    if(navigation.state === 'loading') {
      setProgress(5);

      intervalId = setInterval(() => {
        setProgress(prev => prev < 90 ? prev + 5 : prev);
      }, 100);
    } else {
      if(progress > 0) {
        setProgress(100);

        timeOutId = setTimeout(() => {
          setProgress(0);
        }, 500)
      }
    }

    return () => {
      clearTimeout(timeOutId)
      clearInterval(intervalId);
    } 
  }, [navigation.state]);

  return { progress };
}