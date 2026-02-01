import { cn } from "../../utils/helperClassName";

interface HeadingProps {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
    children?: React.ReactNode;
}

const BASE_CLASS = "font-semibold";
const LEVEL_CLASSES = {
    1: "text-3xl",
    2: "text-2xl",
    3: "text-xl",
    4: "text-lg",
    5: "text-base",
    6: "text-sm",
}

export default function Heading({ level = 1, className, children }: HeadingProps) {
    const Tag = `h${level}` as React.ElementType;
    return (
        <Tag className={cn(BASE_CLASS, LEVEL_CLASSES[level], className)}>
            {children}
        </Tag>
    )
}