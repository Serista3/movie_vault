import { useNavigation } from "react-router";
import { useEffect, useMemo } from "react";

export function useLockDownScreen(isLocked: boolean){
    const navigation = useNavigation();
    const windowScrollBarWidth = useMemo(() => window.innerWidth - document.documentElement.clientWidth, []);

    useEffect(() => {
        if(navigation.state === 'loading') return;

        if(isLocked){
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${windowScrollBarWidth}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
    }, [isLocked, windowScrollBarWidth, navigation.state]);
}
