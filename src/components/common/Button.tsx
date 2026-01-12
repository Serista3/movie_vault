import { cn } from "../../utils/helperClassName";

type Variant = 'primary' | 'secondary' | 'tertiary' | 'danger';
type Shape = 'rounded' | 'circular' | 'capsule';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  shape?: Shape;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const BASE = "button py-2 font-medium shadow-xl cursor-pointer transition-all duration-300";

const VARIANTS: { [key in Variant]: string } = {
  primary: "text-secondary-light bg-primary-light hover:bg-primary-dark",
  secondary: "text-tertiary-light bg-secondary-light hover:bg-secondary-dark",
  tertiary: "text-secondary-light bg-tertiary-light hover:bg-tertiary-dark",
  danger: "text-tertiary-light bg-danger-light hover:bg-danger-dark",
}

const SHAPES: { [key in Shape]: string } = {
  rounded: "rounded-[10px] px-4",
  circular: "rounded-full px-2 flex items-center justify-center",
  capsule: "rounded-full px-4"
}

export default function Button({ children, className, variant = 'primary', shape = 'rounded', ...props }: ButtonProps) {
  return (
    <button 
      className={cn(BASE, VARIANTS[variant], SHAPES[shape], className)} 
      {...props}
    >
      {children}
    </button>
  );
};
