// --- IMPORTS ---
import { Link } from "react-router";
import { Card, Image, Heading, Paragraph } from '@/components/common'
import { cn, getMediaSummaryData, displayMediaSubtitle } from "@/utils/helper";
import MediaRating from "./MediaRating";
import type { MediaSummary } from "@/@types"

// --- TYPE DEFINATIONS ---
interface WideMediaCardProps { 
    media: MediaSummary;
    showRating?: boolean;
    className?: string 
}

export default function WideMediaCard({ media, showRating = false, className }: WideMediaCardProps) {
    // --- EXTRACT MEDIA DATA ---
    const { mediaTitle, mediaSubtitle, mediaDetailPath, mediaImg, mediaOverview, mediaRating } = getMediaSummaryData(media);

    // --- COMPUTED CLASS NAMES ---
    const wrapperClass = cn(
        "flex gap-2 items-start h-40 w-full bg-secondary-dark hover:scale-101 shadow-xl", 
        className
    );

    return (
        <Card className={wrapperClass}>
            {/* --- LINK OVERLAY --- */}
            <Link to={mediaDetailPath} className="w-full h-full absolute top-0 left-0 z-5" />

            {/* --- MEDIA IMAGE --- */}
            <Image
                containerClassName="max-w-25 h-full flex-shrink-0 rounded-r-none"
                src={mediaImg} 
                alt={`Image of ${mediaTitle}`} 
            />

            {/* --- MEDIA INFO --- */}
            <div className="px-2 py-4 h-full flex flex-col gap-4">
                <div className="z-6 self-start pr-15">
                    <Heading level={3} className="line-clamp-1">{mediaTitle}</Heading>
                    <Paragraph className="line-clamp-2 text-tertiary-dark">
                        {displayMediaSubtitle(mediaSubtitle)}
                    </Paragraph>
                </div>
                <Paragraph className="line-clamp-2 z-6 leading-6">
                    {mediaOverview}
                </Paragraph> 
            </div>

            {/* --- MEDIA RATING --- */}
            {showRating && <MediaRating rating={mediaRating} className="absolute top-2 right-2 z-4 text-sm" size={44} />}
        </Card>
    )
}