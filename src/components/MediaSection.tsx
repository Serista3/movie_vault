import { Link } from "react-router";
import { cn } from "../utils/helperClassName";

interface MediaSectionProps {
    className?: string;
    title: string;
    path?: string;
    children: React.ReactNode;
}

export default function MediaSection({ title, path, children, className }: MediaSectionProps) {
    return (
        <div className={cn("px-4 flex flex-col w-full", className)}>
            <h2 className="font-semibold text-xl mb-4">{title}</h2>
            {children}
            {path && <Link to={path} className="text-base text-right text-primary-light hover:underline mt-4 inline-block">See All</Link>}
        </div>
    )
}
