// --- IMPORTS ---
import { cn } from "@/utils/helper";
import { Link, type LinkProps } from "react-router";

// --- TYPE DEFINATIONS ---
interface AnchorProps extends LinkProps {
  className?: string;
}

export default function Anchor({ className, children, ...props }: AnchorProps) {
  return (
    <Link
      className={cn(
        'inline-block w-full text-primary-light hover:text-primary-dark transition-all duration-300',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}