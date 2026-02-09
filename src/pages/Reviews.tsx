// --- IMPORTS ---
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { usePagination } from "@/hooks";
import { getMovieReviews, getTvShowReviews, getMovie, getTvShow } from "@/services";
import type { MediaResponse, ReviewSummary, MovieDetail, TvShowDetail, AppError } from "@/@types";
import { isAppError, isMediaResponse} from "@/guards";
import { SubPageMediaLayout } from "@/components/layout";
import { ErrorMessage, Pagination, Paragraph } from "@/components/common";
import { ReviewCard } from "@/features/media";

export default function Reviews() {
  const { mediaDetail, mediaReviews } = useLoaderData<ReviewsLoaderData>();
  const searchTotalPages = isMediaResponse(mediaReviews) ? mediaReviews.total_pages : 1;
  const { curPage, totalPages, handlePageChange } = usePagination(searchTotalPages)

  return (
    <>
      {isAppError(mediaDetail) && <ErrorMessage error={mediaDetail} />}
      {!isAppError(mediaDetail) && (
        <SubPageMediaLayout mediaDetail={mediaDetail}>
          {isAppError(mediaReviews) && <ErrorMessage error={mediaReviews} />}
          {/* --- LIST MEDIA REVIEW --- */}
          {!isAppError(mediaReviews) && mediaReviews.results.length > 0 && (
            <div className="flex flex-col gap-10">
              {mediaReviews.results.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
          {!isAppError(mediaReviews) && mediaReviews.results.length === 0 && (
            <Paragraph>No review available.</Paragraph>
          )}
          <Pagination curPage={curPage} totalPages={totalPages} onPageChange={handlePageChange} className="mt-8"/>
        </SubPageMediaLayout>
      )}
    </>
  );
}

// --- TYPE DEFINATIONS ---
interface ReviewsLoaderData {
  mediaReviews: MediaResponse<ReviewSummary> | AppError;
  mediaDetail: MovieDetail | TvShowDetail | AppError;
}

// --- LOADERS ---
export const loader = async function({ request, params }: LoaderFunctionArgs): Promise<ReviewsLoaderData>{ 
  const url = new URL(request.url);
  const pageParam = url.searchParams.get('page');
  const mediaId = Number(params.id);
  const mediaType = url.pathname.includes('/movie/') ? 'movie' : 'tv';

  const pageNumber = pageParam ? Number(pageParam) : 1;
  
  if(mediaType === 'movie'){
    const mediaReviews = await getMovieReviews(mediaId, pageNumber);
    const mediaDetail = await getMovie(mediaId);
    return { mediaReviews, mediaDetail} ;
  }
  
  const mediaReviews = await getTvShowReviews(mediaId, pageNumber);
  const mediaDetail = await getTvShow(mediaId);

  return { mediaReviews, mediaDetail };
}