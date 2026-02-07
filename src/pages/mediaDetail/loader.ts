// --- ROUTER ---
import type { LoaderFunctionArgs } from "react-router";

// --- TYPES ---
import type { 
  MovieDetail, 
  TvShowDetail, 
  MovieVideos, 
  TvShowVideos,
  MovieCredits,
  TvShowAggregateCredits,
  ReviewSummary,
  MovieKeywords,
  TvShowKeywords,
  MovieAccountStates,
  TvShowAccountStates,
  MovieSummary,
  TvShowSummary,
  MediaResponse,
  AppError,
} from "../../types";

// --- SERVICES ---
import { 
  getMovie, 
  getMovieVideos, 
  getMovieCredits,
  getMovieReviews,
  getMovieRecommendations,
  getMovieKeywords,
  getMovieAccountStates,
} from "../../services/movie.service";
import { 
  getTvShow, 
  getTvShowVideos, 
  getTvShowAggregateCredits,
  getTvShowReviews,
  getTvShowRecommendations,
  getTvShowKeywords,
  getTvShowAccountStates,
} from "../../services/tv.service";

// --- TYPES FOR LOADER DATA ---
export interface MediaDetailLoaderData {
  mediaDetail: MovieDetail | TvShowDetail | AppError;
  mediaVideos: Promise<MovieVideos | TvShowVideos | AppError>;
  mediaCredits: Promise<MovieCredits | TvShowAggregateCredits | AppError>;
  mediaReviews: Promise<MediaResponse<ReviewSummary> | AppError>;
  mediaRecommendations: Promise<MediaResponse<MovieSummary | TvShowSummary> | AppError>;
  mediaKeywords: Promise<MovieKeywords | TvShowKeywords | AppError>;
  mediaAccountStates: Promise<MovieAccountStates | TvShowAccountStates | AppError>;
}

// --- LOADER ---
export const mediaDetailLoader = async function({ request, params }: LoaderFunctionArgs): Promise<MediaDetailLoaderData | AppError> {
  const { id } = params;
  const url = new URL(request.url);
  const mediaType = url.pathname.split('/')[1] === 'movie' ? 'movie' : 'tv';
  const mediaId = id ? parseInt(id) : null;
  
  if (!mediaId)
    return { isError: true, message: "Invalid media ID.", statusCode: 400 };

  // --- FETCH MEDIA DATA ---
  const mediaDetail = mediaType === 'movie'
    ? await getMovie(mediaId)
    : await getTvShow(mediaId);

  const mediaVideos = mediaType === 'movie'
    ? getMovieVideos(mediaId)
    : getTvShowVideos(mediaId);

  const mediaCredits = mediaType === 'movie'
    ? getMovieCredits(mediaId)
    : getTvShowAggregateCredits(mediaId);
  
  const mediaReviews = mediaType === 'movie'
    ? getMovieReviews(mediaId, 1)
    : getTvShowReviews(mediaId, 1);

  const mediaRecommendations = mediaType === 'movie'
    ? getMovieRecommendations(mediaId, 1)
    : getTvShowRecommendations(mediaId, 1);

  const mediaKeywords = mediaType === 'movie'
    ? getMovieKeywords(mediaId)
    : getTvShowKeywords(mediaId);

  const mediaAccountStates = mediaType === 'movie'
    ? getMovieAccountStates(mediaId, localStorage.getItem('session_id') || '')
    : getTvShowAccountStates(mediaId, localStorage.getItem('session_id') || '');

  return {
    mediaDetail,
    mediaVideos,
    mediaCredits,
    mediaReviews,
    mediaRecommendations,
    mediaKeywords,
    mediaAccountStates,
  }
}