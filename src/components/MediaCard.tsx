import { Link } from "react-router";

import MediaRating from "./MediaRating"

import { formatDateToReadable } from "../utils/formatters"
import type { MediaSummary } from "../types"

export default function MediaCard({ media }: { media: MediaSummary }) {
  const mediaRating = Math.round((media.vote_average / 10) * 100);

  return (
    <div className="flex flex-col gap-2 items-center flex-none w-45 snap-center relative">
      <div className="overflow-hidden rounded-[10px]">
        <Link to={`/media/${media.id}`}>
          <img className="object-cover w-full h-65 hover:scale-120 transition-transform duration-300 cursor-pointer" src={`https://image.tmdb.org/t/p/original/${media.poster_path}`} alt="media-poster" />
        </Link>
      </div>
      <div className="flex flex-col gap-1 text-left w-full">
        <Link to={`/media/${media.id}`}>
          <h3 className="text-base font-semibold text-white-light hover:text-main-light transition-colors duration-300 cursor-pointer">
            {'title' in media ? media.title : media.original_name}
          </h3>
        </Link>
        <p className="text-sm font-light text-white-dark">
          {formatDateToReadable('release_date' in media ? media.release_date : media.first_air_date)}
        </p>
      </div>
      <MediaRating rating={mediaRating} className="absolute top-2 right-2" />
    </div>
  )
}