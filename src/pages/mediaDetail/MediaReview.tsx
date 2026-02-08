import type { ReviewSummary, MediaResponse, AppError } from "../../types"

import AsyncBoundary from "../../components/AsyncBoundary"
import ErrorMessage from "../../components/common/ErrorMessage"
import MediaSection from "../../components/media/MediaSection"
import Paragraph from "../../components/common/Paragraph"
import ReviewCard from "../../components/ReviewCard"

interface MediaReviewProps {
  mediaReviews: Promise<MediaResponse<ReviewSummary> | AppError>;
}

export default function MediaReview({ mediaReviews }: MediaReviewProps) {
  return (
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
  )
}