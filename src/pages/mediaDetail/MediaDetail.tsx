// --- ROUTER && HOOKS ---
import { useSelectTrailer } from "../../hooks/useSelectTrailer";
import { useLoaderData,useLocation, useRouteLoaderData, Link } from "react-router"

// --- TYPES ---
import type { MediaDetailLoaderData } from "../../pages/mediaDetail/loader";
import type { UserDataResponse } from "../../types";

// --- HELPERS ---
import { formatDateToReadable } from "../../utils/formatters";

// --- COMPONENTS ---
import Image from "../../components/common/Image";
import Heading from "../../components/common/Heading";
import Paragraph from "../../components/common/Paragraph";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";
import MediaRating from "../../components/media/MediaRating";
import MediaGrid from "../../components/media/MediaGrid";
import TrailerModal from "../../components/TrailerModal";
import ReviewCard from "../../components/ReviewCard";
import WideMediaCard from "../../components/media/WideMediaCard";
import AsyncBoundary from "../../components/AsyncBoundary";
import MediaSection from "../../components/media/MediaSection";

// --- ICONS ---
import { FaPlay } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaList } from "react-icons/fa";

export default function MediaDetail(){
  const { 
    mediaDetail, 
    mediaVideos, 
    mediaCredits, 
    mediaReviews, 
    mediaRecommendations,
    mediaKeywords,
    mediaAccountStates,
  } = useLoaderData<MediaDetailLoaderData>();
  const location = useLocation();
  const mediaType = location.pathname.split('/')[1] === 'movie' ? 'movie' : 'tv';
  const { handleSelectTrailer } = useSelectTrailer();
  const { isAuthenticated, sessionId } = useRouteLoaderData('root') as UserDataResponse;

  return (
    <>
      {'isError' in mediaDetail && (
        <ErrorMessage error={mediaDetail} />
      )}
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
                      <AsyncBoundary resolve={mediaAccountStates} errorElement={<div>Error loading account states.</div>}>
                        {accountStatesData => {
                          if ('isError' in accountStatesData) 
                            return <ErrorMessage error={accountStatesData} />

                          return (
                            <>
                              {isAuthenticated && sessionId && (
                                <div className="flex items-center gap-1.5">
                                  {/* --- FAVORITE BUTTON --- */}
                                  <Button 
                                    variant="secondary" 
                                    shape="circular" 
                                    className={`bg-secondary-dark hover:bg-gray-dark p-3 ${accountStatesData.favorite ? 'text-primary-light' : ''}`}
                                  >
                                    <FaHeart />
                                  </Button>

                                  {/* --- LIST BUTTON --- */}
                                  <Button 
                                    variant="secondary" 
                                    shape="circular" 
                                    className={`bg-secondary-dark hover:bg-gray-dark p-3 ${accountStatesData.watchlist ? 'text-primary-light' : ''}`}
                                  >
                                    <FaList />
                                  </Button>
                                </div>
                              )} 
                            </>
                          )
                        }}
                      </AsyncBoundary>
                      
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
                  <AsyncBoundary resolve={mediaCredits} errorElement={<div>Error loading crew.</div>}>
                    {creditsData => {
                      if ('isError' in creditsData) 
                        return <ErrorMessage error={creditsData} />
                      
                      const crewToDisplay = creditsData.crew.slice(0, 5);
                      return (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {crewToDisplay.map((crewMember) => (
                            <div key={crewMember.credit_id}>
                              <Link 
                                to={`/person/${crewMember.id}`} 
                                className="underline hover:text-primary-light transition-all duration-300"
                              >
                                {crewMember.name}
                              </Link>
                              <Paragraph>{crewMember.department}</Paragraph>
                            </div>
                          ))}
                        </div>
                      )
                    }}
                  </AsyncBoundary>
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
                        <MediaSection title={mediaType === 'movie' ? 'Cast' : 'Series Cast'} className="px-0" path="/" seeAllText="All Casts">
                          <MediaGrid mediaList={displayItems} variant="horizontal" limit={10} />
                        </MediaSection>
                      )
                    }}
                </AsyncBoundary>

                {/* --- MEDIA LATEST SEASON --- */}
                {'seasons' in mediaDetail && mediaDetail.seasons.length > 0 && (
                  <MediaSection title="Latest Season" className="px-0" path="/" seeAllText="See All Seasons">
                    <WideMediaCard
                      media={mediaDetail.last_episode_to_air}
                    />
                  </MediaSection>
                )}
                
                {/* --- MEDIA REVIEW --- */}
                <AsyncBoundary resolve={mediaReviews} errorElement={<div>Error loading reviews.</div>}>
                    {reviewsData => {
                      if ('isError' in reviewsData) 
                        return <ErrorMessage error={reviewsData} />

                      return (
                        <MediaSection title={`Reviews`} className="px-0" path="/" seeAllText="Read All Reviews">
                          {reviewsData.results.length === 0 && (
                            <Paragraph>No reviews found.</Paragraph>
                          )}
                          {reviewsData.results.length > 0 && (
                            <>
                              {reviewsData.results.slice(0, 1).map(review => (
                                <ReviewCard key={review.id} review={review} />
                              ))}
                           </>
                          )}
                        </MediaSection>
                      )
                    }}
                </AsyncBoundary>

                {/* --- MEDIA RECOMMENDATIONS --- */}
                <AsyncBoundary resolve={mediaRecommendations} errorElement={<div>Error loading recommendations.</div>}>
                  {recommendationsData => {
                    if ('isError' in recommendationsData) 
                      return <ErrorMessage error={recommendationsData} />
                    
                    return (
                      <>
                        {recommendationsData.results.length !== 0 && (
                          <MediaSection title="You Might Also Like" className="px-0">
                            <MediaGrid mediaList={recommendationsData.results} variant="horizontal" limit={10} />
                          </MediaSection>
                        )}
                      </>
                    )
                  }}
                </AsyncBoundary>

                {/* --- MEDIA SUP INFO --- */}
                <div className="bg-gray-dark rounded-[10px] p-4">
                  <ul className="flex flex-col gap-4">
                    {'original_title' in mediaDetail && (
                      <li>
                        <div>
                          <Heading level={4} className="mb-1">Original Title</Heading>
                          <Paragraph>{mediaDetail.original_title}</Paragraph>
                        </div>
                      </li>
                    )}
                    {'original_name' in mediaDetail && (
                      <li>
                        <div>
                          <Heading level={4} className="mb-1">Original Name</Heading>
                          <Paragraph>{mediaDetail.original_name}</Paragraph>
                        </div>
                      </li>
                    )}
                    <li>
                      <div>
                        <Heading level={4} className="mb-1">Status</Heading>
                        <Paragraph>{mediaDetail.status}</Paragraph>
                      </div>
                    </li>
                    {'networks' in mediaDetail && (
                      <li>
                        <div>
                          <Heading level={4} className="mb-1">Networks</Heading>
                          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-2">
                            {mediaDetail.networks.map(network => (
                              <Image 
                                key={network.id} 
                                src={network.logo_path} 
                                alt={network.name} 
                                containerClassName="w-20 inline-block mr-2 mb-2"
                              />
                            ))}
                          </div>
                        </div>
                      </li>
                    )}
                    {'budget' in mediaDetail && (
                      <li>
                        <div>
                          <Heading level={4} className="mb-1">Budget</Heading>
                          <Paragraph>${mediaDetail.budget.toLocaleString()}</Paragraph>
                        </div>
                      </li>
                    )}
                    {'revenue' in mediaDetail && (
                      <li>
                        <div>
                          <Heading level={4} className="mb-1">Revenue</Heading>
                          <Paragraph>${mediaDetail.revenue.toLocaleString()}</Paragraph>
                        </div>
                      </li>
                    )}
                    {'type' in mediaDetail && (
                      <li>
                        <div>
                          <Heading level={4} className="mb-1">Type</Heading>
                          <Paragraph>{mediaDetail.type}</Paragraph>
                        </div>
                      </li>
                    )}
                    <li>
                      <div>
                        <Heading level={4} className="mb-1">Original Language</Heading>
                        <Paragraph>{mediaDetail.original_language}</Paragraph>
                      </div>
                    </li>
                    <AsyncBoundary resolve={mediaKeywords} errorElement={<div>Error loading keywords.</div>}>
                      {keywordsData => {
                        if ('isError' in keywordsData) 
                          return <ErrorMessage error={keywordsData} />

                        return (
                          <>
                            {'keywords' in keywordsData && keywordsData.keywords.length > 0 && (
                              <li>
                                <Heading level={4} className="mb-1">Keywords</Heading>
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {keywordsData.keywords.map(keyword => (
                                    <Link
                                      key={keyword.id}
                                      to={`/`}
                                      className="rounded-md bg-tertiary-light text-secondary-light px-2 py-1 text-sm hover:bg-tertiary-dark transition-all duration-300 inline-block"
                                    >
                                      {keyword.name}                               
                                    </Link>
                                  ))}
                                </div>
                              </li>
                            )}
                          </>
                        )
                      }}
                    </AsyncBoundary>
                  </ul>
                </div>
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