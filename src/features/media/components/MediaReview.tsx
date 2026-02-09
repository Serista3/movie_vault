import type { ReviewSummary, MediaResponse, AppError } from "../../../@types"

import AsyncBoundary from "../../../components/common/feedback/AsyncBoundary"
import ErrorMessage from "../../../components/common/feedback/ErrorMessage"
import MediaSection from "./MediaSection"
import Paragraph from "../../../components/common/typography/Paragraph"
import ReviewCard from "./ReviewCard"

interface MediaReviewProps {
  mediaReviews: Promise<MediaResponse<ReviewSummary> | AppError>;
  path: string;
}

export default function MediaReview({ mediaReviews, path }: MediaReviewProps) {
  return (
    <AsyncBoundary resolve={mediaReviews} errorElement={<div>Error loading reviews.</div>}>
      {reviewsData => {
        if ('isError' in reviewsData) 
          return <ErrorMessage error={reviewsData} />

        return (
          <MediaSection title={`Reviews`} className="px-0" path={`${path}/reviews`} seeAllText="Read All Reviews">
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