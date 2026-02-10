// --- IMPORTS ---
import { cn } from "@/utils/helper";
import { Button } from "@/components/common";

// --- TYPE DEFINATIONS ---
interface FilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isSelected?: boolean;
  onClick: () => void;
  className?: string;
}

export default function FilterChip({ label, isSelected, onClick, className, ...props }: FilterChipProps) {
  return (
    <Button
      type="button"
      variant="tertiary"
      shape="capsule"
      onClick={onClick}
      className={cn(
        "py-1 sm:py-1.5 px-2.5 sm:px-3 text-sm sm:text-base",        
        isSelected && "bg-primary-light hover:bg-primary-dark",
        className
      )}
      {...props}
    >
      {label}
    </Button>
  );
}