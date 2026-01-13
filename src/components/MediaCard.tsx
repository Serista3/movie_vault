import { Link } from "react-router";

import Card from './common/Card'
import Image from "./common/Image"
import MediaRating from "./MediaRating"

import { cn } from "../utils/helperClassName";
import { formatDateToReadable } from "../utils/formatters"
import type { MediaSummary } from "../types"

export default function MediaCard({ media, className }: { media: MediaSummary, className?: string }) {
  const mediaCategory = 'title' in media  ? 'movie' : 'original_name' in media ? 'tv' : 'person';
  const mediaImg = `${'poster_path' in media ? media.poster_path : media.profile_path}`;
  const mediaTitle = 'title' in media ? media.title : 'original_name' in media ? media.original_name : media.name
  const mediaSubtitle = 'release_date' in media ? formatDateToReadable(media.release_date) : 'first_air_date' in media ? formatDateToReadable(media.first_air_date) : media.known_for_department;
  const mediaRating = 'vote_average' in media ? Math.round(media.vote_average * 10) : 'N/A';

  return (
    <Card className={cn("flex flex-col justify-center gap-2 items-start w-40", className)}>
      <Link to={`/${mediaCategory}/${media.id}`}>
        <Image 
          className="hover:scale-120 h-60 w-full" 
          src={mediaImg} 
          alt={`Image of ${mediaTitle}`} />
      </Link>
      <div className="flex flex-col gap-1">
        <Link to={`/${mediaCategory}/${media.id}`} className="text-base font-semibold line-clamp-1 hover:text-primary-light transition-colors duration-300">
          {mediaTitle}
        </Link>
        <p className="text-sm font-light text-tertiary-dark">
          {mediaSubtitle}
        </p>
      </div>
      {mediaCategory !== 'person' && <MediaRating rating={mediaRating} className="absolute top-2 right-2 z-4" />}
    </Card>
  )
}
