// --- IMPORTS ---
import { cn } from "@/utils/helper";

// --- TYPE DEFINATIONS ---
interface HeadingProps {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
    children?: React.ReactNode;
}

// --- CONSTANTS ---
const BASE_CLASS = "font-semibold";

const LEVEL_CLASSES = {
    1: "text-3xl sm:text-4xl",
    2: "text-2xl sm:text-3xl",
    3: "text-xl",
    4: "text-lg",
    5: "text-base",
    6: "text-sm",
}

export default function Heading({ level = 1, className, children }: HeadingProps) {
    // --- COMPUTED CLASS NAMES ---
    const headingClass = cn(BASE_CLASS, LEVEL_CLASSES[level], className);

    // --- DYNAMIC TAG RENDERING ---
    const Tag = `h${level}` as React.ElementType;

    return (
        <Tag className={headingClass}>
            {children}
        </Tag>
    )
}