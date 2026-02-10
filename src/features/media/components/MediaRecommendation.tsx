// --- IMPORTS ---
import type { MovieSummary, TvShowSummary, MediaResponse, AppError } from "@/@types"
import { isAppError } from "@/guards";
import { AsyncBoundary, ErrorMessage } from "@/components/common"
import { MediaSection, MediaGrid } from "@/features/media"

// --- TYPE DEFINATIONS ---
interface MediaRecommendationProps {
  mediaRecommendations: Promise<MediaResponse<MovieSummary | TvShowSummary> | AppError>;
}

export default function MediaRecommendation({ mediaRecommendations }: MediaRecommendationProps) {
  return (
    <AsyncBoundary resolve={mediaRecommendations} errorElement={<div>Error loading recommendations.</div>}>
      {recommendationsData => {
        if (isAppError(recommendationsData)) 
          return <ErrorMessage error={recommendationsData} />
        
        return (
          <>
            {/* --- MEDIA RECOMMENDATION --- */}
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