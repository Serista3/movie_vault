import { createPortal } from "react-dom"

import { useModal } from "../../store/ModalContext";
import { useLockDownScreen } from "../../hooks/useLockDownScreen";
import { cn } from "../../utils/helperClassName";

import Button from "./Button";

interface ModalProps {
  className?: string;
  children: React.ReactNode;
}

const BASE_CLASS = "modal__content rounded-[10px] overflow-hidden relative mx-8 shadow-xl";

export default function Modal({ children, className }: ModalProps) {
  const { isOpen, closeModal } = useModal();

  useLockDownScreen(isOpen);

  if(!isOpen) return null;

  const handleOverlayClick = function(e: React.MouseEvent<HTMLDivElement>) {
    if(e.target !== e.currentTarget) return;
    
    closeModal();
  }

  return createPortal(
    <div onClick={handleOverlayClick} className={`modal__overlay w-full h-screen bg-[rgba(0,0,0,0.75)] fixed top-0 left-0 flex justify-center items-center z-50`}>
      <div className={cn(BASE_CLASS, className)}>
        {children}
        <Button
          className={"bg-transparent hover:bg-transparent p-none absolute top-2 right-3"}
          onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-gray-light" viewBox="0 0 256 256">
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
            </svg>
        </Button>
      </div>
    </div>
  , document.body);
}