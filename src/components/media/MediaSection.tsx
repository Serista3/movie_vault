// --- ROUTER ---
import { Link } from "react-router";

// --- HELPERS ---
import { cn } from "../../utils/helperClassName";

// --- COMPONENTS ---
import Heading from "../common/Heading";

// --- TYPES FOR MEDIA SECTION PROPS ---
interface MediaSectionProps {
    className?: string;
    title: string;
    path?: string;
    seeAllText?: string;
    children: React.ReactNode;
}

export default function MediaSection({ title, path, seeAllText = "See All", children, className }: MediaSectionProps) {
    return (
        <div className={cn("px-4 flex flex-col w-full", className)}>
            <Heading level={2} className="mb-4">{title}</Heading>
            {/* --- MEDIA CONTENT --- */}
            {children}

            {/* --- SEE ALL LINK --- */}
            {path && (
                <Link 
                    to={path} 
                    className="text-base text-right text-primary-light hover:text-primary-dark ml-auto mt-4 inline-block transition-all duration-300"
                >
                    {seeAllText}
                </Link>
            )}
        </div>
    )
}