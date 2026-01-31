import { Link } from "react-router";

import Card from '../common/Card'
import Image from "../common/Image"

import { cn } from "../../utils/helperClassName";
import { getMediaSummaryData, displayMediaSubtitle } from "../../utils/helperMedia";
import type { MediaSummary } from "../../types"

export default function WideMediaCard({ media, className }: { media: MediaSummary, className?: string }) {
  const { mediaTitle, mediaSubtitle, mediaImg, mediaCategory, mediaOverview } = getMediaSummaryData(media);

  return (
    <Link to={`/${mediaCategory}/${media.id}`} className="h-35 w-full">
        <Card className={cn("flex gap-2 items-start h-full w-full bg-secondary-dark hover:scale-101", className)}>
            <Image
                containerClassName="max-w-25 h-full w-full flex-shrink-0 rounded-r-none"
                src={mediaImg} 
                alt={`Image of ${mediaTitle}`} 
            />
            <div className="flex flex-col gap-1 p-2.5">
                <div className="mb-4">
                    <h3 className="text-base line-clamp-1">{mediaTitle}</h3>
                    <p className="text-sm font-light text-tertiary-dark line-clamp-2">
                        {displayMediaSubtitle(mediaSubtitle)}
                    </p>
                </div>
                
                <p className="text-sm font-light line-clamp-2">
                    {mediaOverview}
                </p>
            </div>
        </Card>
    </Link>
  )
}
