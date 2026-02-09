import { useState } from "react";
import { useModal } from "@/store";
import { useLockDownScreen } from "./useLockDownScreen";
import type { MediaSummary } from "@/@types";

export function useSelectTrailer() {
    const { isOpen, openModal } = useModal();
    const [selectTrailer, setSelectTrailer] = useState<MediaSummary | null>(null);

    useLockDownScreen(isOpen);

    const handleSelectTrailer = function(item: MediaSummary){
        setSelectTrailer(item);
        openModal();
    }

    return { 
        selectTrailer, 
        isOpen, 
        handleSelectTrailer 
    };
}