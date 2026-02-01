import { Link } from "react-router";
import { cn } from "../../utils/helperClassName";

import Heading from "../common/Heading";

interface MediaSectionProps {
    className?: string;
    title: string;
    path?: string;
    children: React.ReactNode;
}

export default function MediaSection({ title, path, children, className }: MediaSectionProps) {
    return (
        <div className={cn("px-4 flex flex-col w-full", className)}>
            <Heading level={2} className="mb-4">{title}</Heading>
            {children}
            {path && (
                <Link to={path} className="text-base text-right text-primary-light hover:underline mt-4 inline-block">
                    See All
                </Link>
            )}
        </div>
    )
}
