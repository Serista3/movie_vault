// --- IMPORTS ---
import { cn } from "@/utils/helper";

// --- TYPE DEFINATIONS ---
interface ParagraphProps {
    className?: string;
    children?: React.ReactNode;
}

// --- CONSTANTS ---
const BASE_CLASS = "text-sm leading-7 font-light";

export default function Paragraph({ className, children }: ParagraphProps) {
    return (
        <p className={cn(BASE_CLASS, className)}>
            {children}
        </p>
    );
}