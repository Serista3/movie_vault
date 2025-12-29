import { useContext } from "react";
import { createPortal } from "react-dom"

import { ModalContext } from "../../store/ModalContext";
import Button from "./Button";

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const { isOpen, closeModal } = useContext(ModalContext)

  return createPortal(
    <div className={`modal__overlay w-full h-screen bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 flex justify-center items-start z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className={`modal__content relative flex justify-center items-center max-w-96 w-full mx-8 mt-20 bg-back-light border-2 border-main-light shadow-lg ${isOpen ? 'animate-fade-in' : 'animate-fade-out'}`}>
        {children}
        <Button className="absolute text-xl -top-6 -right-6 text-back-light bg-main-light hover:bg-main-dark rounded-full px-3.5" onClick={closeModal}>X</Button>
      </div>
    </div>
  , document.body);
}