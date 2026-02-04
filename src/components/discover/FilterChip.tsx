// --- HELPERS ---
import { cn } from "../../utils/helperClassName";

// --- COMPONENTS ---
import Button from "../common/Button";

// --- TYPES FOR FILTER CHIP PROPS ---
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
        "py-1 px-2.5 text-sm",        
        isSelected && "bg-primary-light hover:bg-primary-dark",
        className
      )}
      {...props}
    >
      {label}
    </Button>
  );
}