// --- IMPORTS ---
import { cn } from "@/utils/helper";
import { FaCaretDown } from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import { useCloseOnNavigate } from "@/hooks";

// --- TYPE DEFINATIONS ---
interface DropdownMenuProps {
  menuTrigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

// --- CONSTANTS ---
const BASE_MENU_TITLE_CLASS = `flex items-center gap-2 cursor-pointer text-secondary-light hover:text-secondary-dark
  transition-all duration-300`;
const BASE_MENU_ITEMS_CLASS = `flex flex-col items-start gap-4 absolute top-full left-0 mt-2 
  bg-secondary-dark p-4 w-50 rounded-[10px] shadow-lg transition-all duration-300 z-20`;

export default function DropdownMenu({ menuTrigger, children, className }: DropdownMenuProps) {
  // --- DROPDOWN STATE ---
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useCloseOnNavigate(useCallback(() => setIsOpen(false), []));

  useEffect(() => {
    if(!isOpen) return;

    // --- HANDLE CLICK OUTSIDE TO CLOSE MENU ---
    const handleClickOutside = function(event: MouseEvent): void {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${className}`)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // --- TOGGLE MENU FUNCTION ---
  const toggleMenu = function(): void {
    setIsOpen(prev => !prev);
  }

  // --- COMPUTED CLASS NAMES ---
  const dropdownWrapperClass = cn(
    "w-full relative",
    className
  )

  const iconClass = cn(
    "inline-block ml-2 size-5 transition-all",
    isOpen ? "rotate-180" : ""
  )

  const menuItemsClass = cn(
    BASE_MENU_ITEMS_CLASS, isOpen 
    ? "visible opacity-100 translate-y-1" 
    : "invisible opacity-0 -translate-y-2"
  )

  return (
    <div className={dropdownWrapperClass}>
      {/* --- Menu Title --- */}
      <div className={BASE_MENU_TITLE_CLASS} onClick={toggleMenu}>
        {menuTrigger}
        <FaCaretDown className={iconClass} />
      </div>

      {/* --- Menu Items --- */}
      <ul className={menuItemsClass}>
        {children}
      </ul>
    </div>
  )
}