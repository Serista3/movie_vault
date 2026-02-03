import { cn } from "../../utils/helperClassName";

import { FaChevronDown } from "react-icons/fa6";
import Heading from "./Heading";

const BASE_CLASS = "accordion w-full text-tertiary-light bg-secondary-light rounded-[10px]";

interface AccordionProps {
  isOpen: boolean;
  title: string;
  onToggle: (title: string) => void;
  children: React.ReactNode;
  className?: string;
}

export default function Accordion({ isOpen, title, onToggle, children, className }: AccordionProps){
  return (
    <div className={cn(BASE_CLASS, className)}>
      <div 
        className={
          cn(
            `accordion__header flex p-3 items-center justify-between border-gray-dark border 
            rounded-[10px] hover:bg-secondary-dark cursor-pointer transition-all`,
            isOpen ? "bg-secondary-dark rounded-b-none" : "bg-secondary-light"
          )}  
        onClick={() => onToggle(title)}
      >
        <Heading level={3}>{title}</Heading>
        <FaChevronDown className={
          cn(
            "inline-block ml-2 size-4 transition-all",
            isOpen ? "rotate-180" : ""
          )} 
        />
      </div>
      <div className={
        cn(
          'accordion__content p-4 border rounded-[10px] border-gray-dark transition-all',
          isOpen ? "h-full rounded-t-none" : "h-0 hidden overflow-hidden"
        )
      }>
        {children}
      </div>
    </div>
  );
}