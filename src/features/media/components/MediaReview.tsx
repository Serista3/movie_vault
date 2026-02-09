import type { ReviewSummary, MediaResponse, AppError } from "@/@types"
import { isAppError } from "@/guards";
import { AsyncBoundary, ErrorMessage, Paragraph, Anchor } from "@/components/common"
import { MediaSection, ReviewCard } from "@/features/media"

interface MediaReviewProps {
  mediaReviews: Promise<MediaResponse<ReviewSummary> | AppError>;
  path: string;
}

export default function MediaReview({ mediaReviews, path }: MediaReviewProps) {
  return (
    <AsyncBoundary resolve={mediaReviews} errorElement={<div>Error loading reviews.</div>}>
      {reviewsData => {
        if (isAppError(reviewsData)) 
          return <ErrorMessage error={reviewsData} />

        return (
          <MediaSection title={`Reviews`} className="px-0">
            {reviewsData.results.length === 0 && (
              <Paragraph>No reviews found.</Paragraph>
            )}
            {reviewsData.results.length > 0 && (
              <>
                {reviewsData.results.slice(0, 1).map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
                <Anchor to={`${path}/reviews`} className="mt-4 self-end w-fit">
                  Read All Reviews
                </Anchor>
              </>
            )}
          </MediaSection>
        )
      }}
  </AsyncBoundary>
  )
}