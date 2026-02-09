// --- IMPORTS ---
import { Link } from "react-router";
import { Card, Image, Heading, Paragraph } from '@/components/common'
import { cn, getMediaSummaryData, displayMediaSubtitle } from "@/utils/helper";
import type { MediaSummary } from "@/@types"

export default function WideMediaCard({ media, className }: { media: MediaSummary, className?: string }) {
    // --- EXTRACT MEDIA DATA ---
    const { mediaTitle, mediaSubtitle, mediaDetailPath, mediaImg, mediaOverview } = getMediaSummaryData(media);

    // --- COMPUTED CLASS NAMES ---
    const wrapperClass = cn(
        "flex gap-2 items-start h-35 w-full bg-secondary-dark hover:scale-101", 
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
            <div className="flex flex-col gap-2 p-2.5">
                <div className="z-6 self-start">
                    <Heading level={3} className="line-clamp-1">{mediaTitle}</Heading>
                    <Paragraph className="line-clamp-2 text-tertiary-dark">
                        {displayMediaSubtitle(mediaSubtitle)}
                    </Paragraph>
                </div>
                <Paragraph className="line-clamp-2 z-6 leading-6">
                    {mediaOverview}
                </Paragraph>
            </div>
        </Card>
    )
}