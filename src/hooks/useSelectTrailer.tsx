import { useState } from "react";
import { useModal } from "../store/ModalContext";
import { useLockDownScreen } from "./useLockDownScreen";

import type { MediaSummary } from "../types/media";

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