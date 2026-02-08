import type { MovieSummary, TvShowSummary, MediaResponse, AppError } from "../../types"

import AsyncBoundary from "../../components/AsyncBoundary"
import ErrorMessage from "../../components/common/ErrorMessage"
import MediaSection from "../../components/media/MediaSection"
import MediaGrid from "../../components/media/MediaGrid"

interface MediaRecommendationProps {
  mediaRecommendations: Promise<MediaResponse<MovieSummary | TvShowSummary> | AppError>;
}

export default function MediaRecommendation({ mediaRecommendations }: MediaRecommendationProps) {
  return (
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
  )
}