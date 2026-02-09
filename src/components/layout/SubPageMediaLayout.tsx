// --- IMPORTS ---
import { cn, formatDateToReadable } from "@/utils";
import type { MovieDetail, TvShowDetail, TvShowSeasonDetail } from "@/@types";
import { isMovieDetail, isTvShowDetail, isTvShowSeasonDetail } from "@/guards";
import { Image, Heading, Paragraph, Anchor } from "@/components/common";

// --- TYPE DEFINATIONS ---
interface SubPageMediaLayoutProps {
  mediaDetail: MovieDetail | TvShowDetail | TvShowSeasonDetail ;
  className?: string;
  children?: React.ReactNode;
}

// --- CONSTANTS ---
const BASE_CLASS = "max-w-300 mx-auto w-full flex flex-col gap-5 pt-10 px-4 pb-14";

export default function SubPageMediaLayout({ className, mediaDetail, children }: SubPageMediaLayoutProps) {
  return (
    <>
      {/* --- SUBPAGE HEADER --- */}
      <div className="bg-gray-dark w-full">
        <div className="max-w-300 mx-auto flex items-center gap-4 px-4 py-6">
          <Image 
            src={mediaDetail.poster_path} 
            alt={isMovieDetail(mediaDetail) ? mediaDetail.title : mediaDetail.name} 
            containerClassName="h-27 w-18 rounded-md flex-none"
          />
          <div className="flex flex-col gap-2">
            <Heading className="flex flex-col gap-0.5">
              {isMovieDetail(mediaDetail) && mediaDetail.title}
              {isTvShowDetail(mediaDetail) && mediaDetail.name}
              {isTvShowSeasonDetail(mediaDetail) && mediaDetail.name}
              <Paragraph className="text-tertiary-dark text-base">
                {isMovieDetail(mediaDetail) && formatDateToReadable(mediaDetail.release_date)}
                {isTvShowDetail(mediaDetail) && formatDateToReadable(mediaDetail.first_air_date)}
                {isTvShowSeasonDetail(mediaDetail) && formatDateToReadable(mediaDetail.air_date)}
              </Paragraph>
            </Heading>
            <Anchor to={location.pathname.substring(0, location.pathname.lastIndexOf('/'))}>
              {isTvShowSeasonDetail(mediaDetail) ? 'Back to seasons' : 'Back to Details'}
            </Anchor>
          </div>
        </div>
      </div>
      <div className={cn(BASE_CLASS, className)}>
        {/* --- SUBPAGE CONTENT --- */}
        {children}
      </div>
    </>
  )
}