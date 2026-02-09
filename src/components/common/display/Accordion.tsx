// --- IMPORTS ---
import { cn } from "@/utils/helper";
import { FaChevronDown } from "react-icons/fa6";
import { Heading } from "@/components/common";

// --- CONSTANTS ---
const BASE_CLASS = "w-full text-tertiary-light bg-secondary-light rounded-[10px]";

// --- TYPE DEFINATIONS ---
interface AccordionProps {
  isOpen: boolean;
  title: string;
  onToggle: (title: string) => void;
  children: React.ReactNode;
  className?: string;
}

export default function Accordion({ isOpen, title, onToggle, children, className }: AccordionProps){
  // --- COMPUTED CLASS NAMES ---
  const headerClass = cn(
    `flex p-3 items-center justify-between border-gray-dark border 
    rounded-[10px] hover:bg-secondary-dark cursor-pointer transition-all`,
    isOpen ? "bg-secondary-dark rounded-b-none" : "bg-secondary-light"
  )

  const arrowIconClass = cn(
    "inline-block ml-2 size-4 transition-all",
    isOpen ? "rotate-180" : ""
  )

  const contentWrapperClass = cn(
    "grid transition-[grid-template-rows] duration-300 ease-out",
    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
  )

  return (
    <div className={cn(BASE_CLASS, className)}>
      {/* --- Accordion Header --- */}
      <div className={headerClass} onClick={() => onToggle(title)}>
        <Heading level={3}>{title}</Heading>
        <FaChevronDown className={arrowIconClass} />
      </div>

      {/* --- Accordion Content --- */}
      <div className={contentWrapperClass}>
        <div className="overflow-hidden">
          <div className="p-4 border rounded-[10px] border-t-0 border-gray-dark rounded-t-none"> 
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}