// --- IMPORTS ---
import { Link } from "react-router";
import { Card, Image, Paragraph } from '@/components/common'
import { MediaRating } from "@/features/media"
import { cn, getMediaSummaryData, displayMediaSubtitle } from "@/utils/helper";
import type { MediaSummary } from "@/@types"

export default function MediaCard({ media, className }: { media: MediaSummary, className?: string }) {
  // --- EXTRACT MEDIA DATA ---
  const { mediaTitle, mediaSubtitle, mediaDetailPath, mediaImg, mediaCategory, mediaRating } = getMediaSummaryData(media);

  // --- COMPUTED CLASS NAME ---
  const wrapperClass = cn("flex flex-col justify-center gap-2 items-start w-40", className);

  return (
    <Card className={wrapperClass}>
      {/* --- MEDIA IMAGE --- */}
      {mediaDetailPath && <Link to={mediaDetailPath} className="w-full">
        <Image 
          className="hover:scale-120"
          containerClassName="h-60"
          src={mediaImg} 
          alt={`Image of ${mediaTitle}`} />
      </Link>}

      {/* --- MEDIA INFO --- */}
      <div className="flex flex-col gap-1">
        {mediaDetailPath && <Link 
          to={mediaDetailPath}
          className="text-base font-semibold line-clamp-1 hover:text-primary-light transition-colors duration-300"
        >
          {mediaTitle}
        </Link>}
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