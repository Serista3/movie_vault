// --- IMPORTS ---
import { cn } from "@/utils/helper";

// --- TYPE DEFINATIONS ---
type Variant = 'primary' | 'secondary' | 'tertiary' | 'danger';
type Shape = 'rounded' | 'circular' | 'capsule';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  shape?: Shape;
  className?: string;
  children?: React.ReactNode;
}

// --- CONSTANTS ---
const BASE_CLASS = "button py-2 font-medium shadow-xl cursor-pointer transition-all duration-300 border border-transparent relative";

const VARIANTS: { [key in Variant]: string } = {
  primary: "text-secondary-light bg-primary-light hover:bg-primary-dark",
  secondary: "text-tertiary-light bg-secondary-light hover:bg-secondary-dark border-gray-dark",
  tertiary: "text-secondary-light bg-tertiary-light hover:bg-tertiary-dark",
  danger: "text-danger-light bg-secondary-light hover:bg-secondary-dark border-danger-light",
}

const SHAPES: { [key in Shape]: string } = {
  rounded: "rounded-[10px] px-4",
  circular: "rounded-full px-2 flex items-center justify-center",
  capsule: "rounded-full px-4"
}

export default function Button({ 
  variant = 'primary',
  shape = 'rounded',
  className, 
  children, 
  ...props 
}: ButtonProps) {
  // --- COMPUTED CLASS NAMES ---
  const buttonClass = cn(
    BASE_CLASS,
    VARIANTS[variant],
    SHAPES[shape],
    className
  )

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};