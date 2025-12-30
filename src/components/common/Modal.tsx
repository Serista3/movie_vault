import { createPortal } from "react-dom"

import { useModal } from "../../store/ModalContext";
import Button from "./Button";

interface ModalProps {
  className?: string;
  children: React.ReactNode;
}

export default function Modal({ children, className = '' }: ModalProps) {
  const { closeModal } = useModal()

  return createPortal(
    <div onClick={closeModal} className={`modal__overlay w-full h-screen bg-[rgba(0,0,0,0.75)] fixed top-0 left-0 flex justify-center items-center z-50`}>
      <div className={`modal__content ${className} relative mx-8 shadow-xl`}>
        {children}
        <Button 
          className="absolute text-xl -top-6 -right-6 text-back-light bg-main-light hover:bg-main-dark rounded-full px-3.5" 
          onClick={closeModal}>
            X
        </Button>
      </div>
    </div>
  , document.body);
}