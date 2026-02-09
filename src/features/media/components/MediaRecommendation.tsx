import type { MovieSummary, TvShowSummary, MediaResponse, AppError } from "../../../@types"

import AsyncBoundary from "../../../components/common/feedback/AsyncBoundary"
import ErrorMessage from "../../../components/common/feedback/ErrorMessage"
import MediaSection from "./MediaSection"
import MediaGrid from "./MediaGrid"

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