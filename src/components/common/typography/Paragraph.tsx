// --- IMPORTS ---
import { cn } from "@/utils/helper";

// --- TYPE DEFINATIONS ---
interface ParagraphProps {
    className?: string;
    children?: React.ReactNode;
}

// --- CONSTANTS ---
const BASE_CLASS = "text-sm sm:text-base leading-7 sm:leading-7 font-light break-all";

export default function Paragraph({ className, children }: ParagraphProps) {
    return (
        <p className={cn(BASE_CLASS, className)}>
            {children}
        </p>
    );
}