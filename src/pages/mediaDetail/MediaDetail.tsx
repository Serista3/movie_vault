// --- IMPORTS ---
import { useSelectTrailer } from "@/hooks";
import { useLoaderData,useLocation, useRouteLoaderData } from "react-router"
import type { MediaDetailLoaderData } from "@/pages/mediaDetail/loader";
import type { UserDataResponse } from "@/@types";
import { formatDateToReadable } from "@/utils/formatters";
import { Image, Heading, Paragraph, Button, ErrorMessage, AsyncBoundary } from "@/components/common";
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
      {'isError' in mediaDetail && <ErrorMessage error={mediaDetail} />}
      {'id' in mediaDetail && (
        <>
          {/* --- MEDIA BANNER --- */}
          <Image 
            src={mediaDetail.backdrop_path} 
            alt={'title' in mediaDetail ? mediaDetail.title : mediaDetail.name}
            containerClassName="rounded-none brightness-50 h-60"
          />

          {/* --- MEDIA DETAIL --- */}
          <div className="mt-17 mb-20 px-4 py-6 max-w-300 mx-auto relative">
            {/* --- MEDIA POSTER --- */}
            <Image 
              src={mediaDetail.poster_path} 
              alt={'title' in mediaDetail ? mediaDetail.title : mediaDetail.name}
              containerClassName="w-40 shadow-2xl absolute bottom-full left-1/2 -translate-x-1/2"
            />

            {/* --- MEDIA INFO --- */}
              <div className="flex flex-col gap-15">
                <div className="flex flex-col gap-6">
                  <div>
                    {/* --- MEDIA TITLE --- */}
                    <div className="flex items-start justify-between gap-2">
                      <Heading>
                        {'title' in mediaDetail ? mediaDetail.title : mediaDetail.name}
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
                      {'release_date' in mediaDetail && mediaDetail.release_date && (
                        <Paragraph>
                          {formatDateToReadable(mediaDetail.release_date)}
                        </Paragraph>
                      )}
                      {'first_air_date' in mediaDetail && mediaDetail.first_air_date && (
                        <Paragraph>
                          {formatDateToReadable(mediaDetail.first_air_date)}
                        </Paragraph>
                      )}
                      <div className="size-1.25 bg-tertiary-dark rounded-full"></div>
                      {mediaDetail.genres && mediaDetail.genres.length > 0 && (
                        <Paragraph>
                          {mediaDetail.genres.map(genre => genre.name).join(', ')}
                        </Paragraph>
                      )}
                      {'runtime' in mediaDetail && mediaDetail.runtime && (
                        <>
                          <div className="size-1.5 bg-tertiary-dark rounded-full"></div>
                          <Paragraph>
                            {(mediaDetail.runtime / 60).toFixed(0)}h {mediaDetail.runtime % 60}m
                          </Paragraph>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    {/* --- MEDIA RATING --- */}
                    <div className="relative flex items-center gap-4">
                      <MediaRating rating={Math.round(mediaDetail.vote_average * 10)} className="text-sm" />
                      <Paragraph className="text-base">User Score</Paragraph>
                    </div>
                    
                    {/* --- MEDIA TRAILER --- */}
                    <AsyncBoundary resolve={mediaVideos}  errorElement={<div>Error loading trailer.</div>}>
                      {videosData => {
                          if ('isError' in videosData) 
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
                    <Paragraph>{mediaDetail.overview}</Paragraph>
                  </MediaSection>

                  {/* --- MEDIA CREW --- */}
                  <MediaCrew mediaCredits={mediaCredits} />
                </div>
                
                {/* --- MEDIA CASTS OR CREWS --- */}
                <AsyncBoundary resolve={mediaCredits} errorElement={<div>Error loading casts.</div>}>
                    {creditsData => {
                      if ('isError' in creditsData) 
                        return <ErrorMessage error={creditsData} />
                      
                      const displayItems = creditsData.cast.length !== 0
                        ? creditsData.cast.slice(0, 10) : creditsData.crew.length !== 0 
                        ? creditsData.crew.slice(0, 10) : [];

                      return (
                        <MediaSection title={mediaType === 'movie' ? 'Cast' : 'Series Cast'} className="px-0" path={`${location.pathname}/cast`} seeAllText="All Casts">
                          <MediaGrid mediaList={displayItems} variant="horizontal" limit={10} />
                        </MediaSection>
                      )
                    }}
                </AsyncBoundary>

                {/* --- MEDIA LATEST SEASON --- */}
                {'seasons' in mediaDetail && mediaDetail.seasons.length > 0 && (
                  <MediaSection title="Latest Season" className="px-0" path={`${location.pathname}/seasons`} seeAllText="See All Seasons">
                    <WideMediaCard media={mediaDetail.last_episode_to_air} />
                  </MediaSection>
                )}
                
                {/* --- MEDIA REVIEW --- */}
                <MediaReview mediaReviews={mediaReviews} path={location.pathname} />

                {/* --- MEDIA RECOMMENDATIONS --- */}
                <MediaRecommendation mediaRecommendations={mediaRecommendations} />

                {/* --- MEDIA SUP INFO --- */}
                <MediaStats mediaDetail={mediaDetail}/>
              </div>
            </div>

            {/* --- TRAILER MODAL --- */}
            <AsyncBoundary resolve={mediaVideos} errorElement={<div>Error loading trailer.</div>}>
              {videosData => {
                if ('isError' in videosData) 
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