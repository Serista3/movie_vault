import { Link } from "react-router";

import Card from '../common/Card'
import Image from "../common/Image"
import MediaRating from "./MediaRating"

import { cn } from "../../utils/helperClassName";
import { getMediaSummaryData, displayMediaSubtitle } from "../../utils/helperMedia";
import type { MediaSummary } from "../../types"

export default function MediaCard({ media, className }: { media: MediaSummary, className?: string }) {
  const { mediaTitle, mediaSubtitle, mediaImg, mediaCategory, mediaRating } = getMediaSummaryData(media);

  return (
    <Card className={cn("flex flex-col justify-center gap-2 items-start w-40", className)}>
      <Link to={`/${mediaCategory}/${media.id}`} className="w-full">
        <Image 
          className="hover:scale-120"
          containerClassName="h-60"
          src={mediaImg} 
          alt={`Image of ${mediaTitle}`} />
      </Link>
      <div className="flex flex-col gap-1">
        <Link 
          to={`/${mediaCategory}/${media.id}`} 
          className="text-base font-semibold line-clamp-1 hover:text-primary-light transition-colors duration-300"
        >
          {mediaTitle}
        </Link>
        <p className="text-sm font-light text-tertiary-dark line-clamp-2">
          {displayMediaSubtitle(mediaSubtitle)}
        </p>
      </div>
      {mediaCategory !== 'person' && <MediaRating rating={mediaRating} className="absolute top-2 right-2 z-4" />}
    </Card>
  )
}
