import { useEffect, useState } from "react";
import { useNavigation } from "react-router";

export function usePageLoader() {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let intervalId: number;
    let timeOutId: number;

    if(navigation.state === 'loading') {
      intervalId = setInterval(() => {
        setProgress(prev => {
          switch(true){
            case (prev >= 90):
              return prev;
            case (prev === 0):
              return 5;
            default:
              return prev + 5;
          }
        });
      }, 300);
    } else {
        if(progress > 0){
          setProgress(100);

          timeOutId = setTimeout(() => {
            setProgress(0);
          }, 600);
        }
    }

    return () => {
      clearTimeout(timeOutId)
      clearInterval(intervalId);
    } 
  }, [navigation.state, progress]);

  return { progress };
}