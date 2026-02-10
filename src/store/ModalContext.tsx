// --- IMPORTS ---
import { createContext, useState, useContext } from "react";

// --- TYPE DEFINATIONS ---
interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

// --- CONTEXT ---
export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {}
});

export default function ModalProvider({ children }: {children: React.ReactNode}) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = function(): void {
    setIsOpen(true);
  }

  const closeModal = function(): void {
    setIsOpen(false);
  }

  const contextValue = {
    isOpen,
    openModal,
    closeModal
  }

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  )
}

// --- CUSTOM HOOK MODAL ---
export const useModal = () => useContext(ModalContext);