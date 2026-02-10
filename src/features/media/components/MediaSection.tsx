// --- IMPORTS ---
import { cn } from "@/utils/helper";
import { Heading, Anchor } from "@/components/common";

// --- TYPE DEFINATIONS ---
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
                <Anchor to={path} className="mt-4 sm:mt-6 self-end w-fit">
                    {seeAllText}
                </Anchor> 
            )}
        </div>
    )
}