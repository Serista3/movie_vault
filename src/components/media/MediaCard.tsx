// --- ROUTER ---
import { Link } from "react-router";

// --- COMPONENTS ---
import Card from '../common/Card'
import Image from "../common/Image"
import Paragraph from "../common/Paragraph"
import MediaRating from "./MediaRating"

// --- HELPERS ---
import { cn } from "../../utils/helperClassName";
import { getMediaSummaryData, displayMediaSubtitle } from "../../utils/helperMedia";

// --- TYPES ---
import type { MediaSummary } from "../../types"

export default function MediaCard({ media, className }: { media: MediaSummary, className?: string }) {
  // --- EXTRACT MEDIA DATA ---
  const { mediaTitle, mediaSubtitle, mediaImg, mediaCategory, mediaRating } = getMediaSummaryData(media);

  // --- COMPUTED CLASS NAME ---
  const wrapperClass = cn("flex flex-col justify-center gap-2 items-start w-40", className);

  return (
    <Card className={wrapperClass}>
      {/* --- MEDIA IMAGE --- */}
      <Link to={`/${mediaCategory}/${media.id}`} className="w-full">
        <Image 
          className="hover:scale-120"
          containerClassName="h-60"
          src={mediaImg} 
          alt={`Image of ${mediaTitle}`} />
      </Link>

      {/* --- MEDIA INFO --- */}
      <div className="flex flex-col gap-1">
        <Link 
          to={`/${mediaCategory}/${media.id}`} 
          className="text-base font-semibold line-clamp-1 hover:text-primary-light transition-colors duration-300"
        >
          {mediaTitle}
        </Link>
        <Paragraph className="text-tertiary-dark line-clamp-2 leading-5">
          {displayMediaSubtitle(mediaSubtitle)}
        </Paragraph>
      </div>

      {/* --- MEDIA RATING --- */}
      {mediaCategory !== 'person' && (
        <MediaRating rating={mediaRating} className="absolute top-2 right-2 z-4" />
      )}
    </Card>
  )
}