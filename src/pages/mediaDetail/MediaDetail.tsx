// --- IMPORTS ---
import { useSelectTrailer } from "@/hooks";
import { useLoaderData,useLocation, useRouteLoaderData } from "react-router"
import type { MediaDetailLoaderData } from "@/pages/mediaDetail/loader";
import type { UserDataResponse } from "@/@types";
import { isAppError, isMovieDetail, isTvShowDetail } from "@/guards";
import { formatDateToReadable } from "@/utils/formatters";
import { Image, Heading, Paragraph, Button, ErrorMessage, AsyncBoundary, Anchor } from "@/components/common";
import { MediaRating, MediaGrid, TrailerModal, WideMediaCard, MediaSection, MediaUserAction, MediaCrew, MediaReview, MediaRecommendation, MediaStats } from "@/features/media";
import { FaPlay } from "react-icons/fa";

export default function MediaDetail(){
  const { 
    mediaDetail, 
    mediaVideos, 
    mediaCredits, 
    mediaReviews, 
    mediaRecommendations,
    mediaAccountStates,
  } = useLoaderData<MediaDetailLoaderData>();
  const location = useLocation();
  const mediaType = location.pathname.split('/')[1] === 'movie' ? 'movie' : 'tv';
  const { handleSelectTrailer } = useSelectTrailer();
  const { isAuthenticated, sessionId, userData } = useRouteLoaderData('root') as UserDataResponse;

  return (
    <>
      {isAppError(mediaDetail) && <ErrorMessage error={mediaDetail} />}
      {!isAppError(mediaDetail) && (
        <>
          {/* --- MEDIA BANNER --- */}
          <div className={`relative border-b border-primary-light`}>
            <Image 
              imageSize='w1280'
              src={mediaDetail.backdrop_path} 
              alt={isMovieDetail(mediaDetail) ? mediaDetail.title : mediaDetail.name}
              containerClassName="rounded-none brightness-50 blur-[2px] absolute top-0 left-0 w-full h-full -z-3"
            />
            <div className="flex flex-col lg:flex-row gap-8 max-w-300 mx-auto h-full px-4 py-15 relative z-1">
              {/* --- MEDIA POSTER --- */}
              <Image 
                src={mediaDetail.poster_path} 
                alt={isMovieDetail(mediaDetail) ? mediaDetail.title : mediaDetail.name}
                containerClassName="w-40 sm:w-45 md:w-50 lg:h-80 flex-none shadow-2xl mx-auto lg:mx-0"
              />
              <div className="flex flex-col gap-6 w-full">
                <div>
                  {/* --- MEDIA TITLE --- */}
                  <div className="flex items-start justify-between gap-2">
                    <Heading>
                      {isMovieDetail(mediaDetail) ? mediaDetail.title : mediaDetail.name}
                    </Heading>

                    {/* --- MEDIA ACTION BUTTONS --- */}
                    <MediaUserAction 
                      isAuthenticated={isAuthenticated}
                      user={userData}
                      sessionId={sessionId} 
                      mediaAccountStates={mediaAccountStates}
                      path={location.pathname}
                    />
                  </div>

                  {/* --- MEDIA SUBTITLE --- */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {isMovieDetail(mediaDetail) && mediaDetail.release_date && (
                      <Paragraph>
                        {formatDateToReadable(mediaDetail.release_date)}
                      </Paragraph>
                    )}
                    {isTvShowDetail(mediaDetail) && mediaDetail.first_air_date && (
                      <Paragraph>
                        {formatDateToReadable(mediaDetail.first_air_date)}
                      </Paragraph>
                    )}
                    {mediaDetail.genres && mediaDetail.genres.length > 0 && (
                      <>
                        <div className="size-1.25 bg-tertiary-dark rounded-full"></div>
                        <Paragraph>
                          {mediaDetail.genres.map(genre => genre.name).join(', ')}
                        </Paragraph>
                      </>
                    )}
                    {isMovieDetail(mediaDetail) && mediaDetail.runtime !== null && mediaDetail.runtime !== 0 && (
                      <>
                        <div className="size-1.5 bg-tertiary-dark rounded-full"></div>
                        <Paragraph>
                          {Math.round(mediaDetail.runtime / 60) ? `${(mediaDetail.runtime / 60).toFixed(0)}h ` : ''}
                          {mediaDetail.runtime % 60 ? `${mediaDetail.runtime % 60}m` : ''}
                        </Paragraph>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {/* --- MEDIA RATING --- */}
                  <div className="relative flex items-center gap-4">
                    <MediaRating rating={Math.round(mediaDetail.vote_average * 10) !== 0 ? mediaDetail.vote_average * 10 : 'N/A'} />
                    <Paragraph className="text-base">User Score</Paragraph>
                  </div>
                  
                  {/* --- MEDIA TRAILER --- */}
                  <AsyncBoundary resolve={mediaVideos}  errorElement={<div>Error loading trailer.</div>}>
                    {videosData => {
                        if (isAppError(videosData)) 
                          return <ErrorMessage error={videosData} />
                        
                        const trailer = videosData.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                        return (
                          <>
                            {trailer && (
                              <Button 
                                variant="tertiary" 
                                className="flex justify-start items-center gap-3 mr-auto" 
                                onClick={() => handleSelectTrailer(mediaDetail)}
                              >
                                <FaPlay />
                                <span>Watch Trailer</span>
                              </Button>
                            )}
                          </>
                        )
                      }}
                  </AsyncBoundary>
                </div>

                {/* --- MEDIA OVERVIEW --- */}
                <MediaSection title="Overview" className="px-0">
                  <Paragraph>{mediaDetail.overview || 'No overview information.'}</Paragraph>
                </MediaSection>

                {/* --- MEDIA CREW --- */}
                <MediaCrew mediaCredits={mediaCredits} />
              </div>
            </div>
          </div>

          {/* --- MEDIA DETAIL --- */}
          <div className="mt-6 sm:mt-8 lg:mt-12 mb-13 px-4 py-6 max-w-300 w-full mx-auto relative grid grid-cols-1 items-start lg:grid-cols-3 gap-15 lg:gap-10">
            {/* --- MEDIA INFO --- */}
            <div className="flex flex-col gap-15 lg:col-span-2">
              {/* --- MEDIA CASTS OR CREWS --- */}
              <AsyncBoundary resolve={mediaCredits} errorElement={<div>Error loading casts.</div>}>
                {creditsData => {
                  if (isAppError(creditsData)) 
                    return <ErrorMessage error={creditsData} />
                  
                  const displayItems = creditsData.cast.length !== 0
                    ? creditsData.cast.slice(0, 10) : creditsData.crew.length !== 0 
                    ? creditsData.crew.slice(0, 10) : [];

                  return (
                    <MediaSection title={mediaType === 'movie' ? 'Cast' : 'Series Cast'} className="px-0">
                      {displayItems.length > 0 && (
                        <>
                          <MediaGrid mediaList={displayItems} variant="horizontal" limit={10} />
                          <Anchor to="cast" className="mt-4 sm:mt-6 w-fit self-end">All Cast & Crew</Anchor>
                        </>
                      )}
                      {displayItems.length === 0 && <Paragraph>No cast information.</Paragraph>}
                    </MediaSection>
                  )
                }}
              </AsyncBoundary>

              {/* --- MEDIA LATEST SEASON --- */}
              {isTvShowDetail(mediaDetail) && mediaDetail.seasons.length > 0 && (
                <MediaSection title="Latest Season" className="px-0" path="seasons" seeAllText="See All Seasons">
                  <WideMediaCard showRating={true} media={mediaDetail.seasons.at(-1)!} />
                </MediaSection>
              )}
              
              {/* --- MEDIA REVIEW --- */}
              <MediaReview mediaReviews={mediaReviews} path="reviews" />

              {/* --- MEDIA RECOMMENDATIONS --- */}
              <MediaRecommendation mediaRecommendations={mediaRecommendations} />
            </div>

            {/* --- MEDIA SUP INFO --- */}
            <MediaStats mediaDetail={mediaDetail}/>
          </div>

          {/* --- TRAILER MODAL --- */}
          <AsyncBoundary resolve={mediaVideos} errorElement={<div>Error loading trailer.</div>}>
            {videosData => {
              if (isAppError(videosData)) 
                return <ErrorMessage error={videosData} />
              
              const trailer = videosData.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
              return (
                <>
                  {trailer && (
                    <TrailerModal selectTrailer={trailer} />
                  )}
                </>
              )
            }}
          </AsyncBoundary>
        </>
      )}
    </>
  )
}