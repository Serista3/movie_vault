import { useState, useEffect, useCallback } from "react";

interface WindowResize {
    width: number;
    height: number;
}

export function useWindowResizer(){
    const [windowSize, setWindowSize] = useState<WindowResize>({ 
        width: window.innerWidth, 
        height: window.innerHeight 
    });

    const handleResize = useCallback(function(){
        setWindowSize({width: window.innerWidth, height: window.innerHeight});
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize])

    return windowSize;
}