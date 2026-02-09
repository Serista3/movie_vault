// --- IMPORTS ---
import { cn } from "@/utils/helper";
import { Button } from "@/components/common";
import { createPortal } from "react-dom"
import { useModal } from "@/store";
import { useLockDownScreen } from "@/hooks";

// --- TYPE DEFINATIONS ---
interface ModalProps {
  className?: string;
  children: React.ReactNode;
}

// --- CONSTANTS ---
const OVERLAY_CLASS = "w-full h-screen bg-[rgba(0,0,0,0.75)] fixed top-0 left-0 flex justify-center items-center z-50";
const BASE_CLASS = "rounded-[10px] overflow-hidden relative mx-8 shadow-xl";
const CLOSE_BUTTON_CLASS = "bg-transparent hover:bg-transparent px-0 py-0 absolute top-2 right-3";

export default function Modal({ children, className }: ModalProps) {
  // --- MODAL STATE ---
  const { isOpen, closeModal } = useModal();
  useLockDownScreen(isOpen);

  // --- RENDER NOTHING IF MODAL IS CLOSED ---
  if(!isOpen) return null;

  // --- HANDLE OVERLAY CLICK TO CLOSE MODAL ---
  const handleOverlayClick = function(e: React.MouseEvent<HTMLDivElement>) {
    if(e.target !== e.currentTarget) return;
    
    closeModal();
  }

  return createPortal(
    <div onClick={handleOverlayClick} className={OVERLAY_CLASS}>
      {/* --- MODAL CONTENT --- */}
      <div className={cn(BASE_CLASS, className)}>
        {children}

        {/* --- CLOSE BUTTON --- */}
        <Button className={CLOSE_BUTTON_CLASS} onClick={closeModal}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-4 h-4 fill-gray-light" 
            viewBox="0 0 256 256"
          >
            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
          </svg>
        </Button>
      </div>
    </div>
  , document.body);
}