import { useNavigation } from "react-router";
import { useEffect } from "react";

export function useLockDownScreen(isLocked: boolean){
    const navigation = useNavigation();
    const windowScrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

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
