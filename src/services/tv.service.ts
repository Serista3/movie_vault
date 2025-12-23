import type { 
  MediaResponse, 
  TvShowSummary, 
  TvShowDetail, 
  TvShowAccountStates, 
  TvShowContentRatings, 
  TvShowCredits,
  TvShowEpisodeGroups,
  TvShowExternalIds,
  TvShowImages,
  TvShowKeywords,
  TvShowVideos,
  ReviewSummary,
  AppError
} from "../types";
import { tmdbFetch } from "../utils/api";

export const getTvShowList = async function(category: string, page: number): Promise<MediaResponse<TvShowSummary> | AppError>{
  return tmdbFetch<MediaResponse<TvShowSummary>>(`/tv/${category}?language=en-US&page=${page}`);
}

export const getTvShow = async function(tvShowId: number): Promise<TvShowDetail | AppError>{
  return tmdbFetch<TvShowDetail>(`/tv/${tvShowId}?language=en-US`);
}

export const getTvShowAccountStates = async function(tvShowId: number, sessionId: string): Promise<TvShowAccountStates | AppError>{
  return tmdbFetch<TvShowAccountStates>(`/tv/${tvShowId}/account_states?session_id=${sessionId}`);
}

export const getTvShowContentRatings = async function(tvShowId: number): Promise<TvShowContentRatings | AppError>{
  return tmdbFetch<TvShowContentRatings>(`/tv/${tvShowId}/content_ratings`);
}

export const getTvShowCredits = async function(tvShowId: number): Promise<TvShowCredits | AppError>{
  return tmdbFetch<TvShowCredits>(`/tv/${tvShowId}/credits?language=en-US`);
}

export const getTvShowEpisodeGroups = async function(tvShowId: number): Promise<TvShowEpisodeGroups | AppError>{
  return tmdbFetch<TvShowEpisodeGroups>(`/tv/${tvShowId}/episode_groups`);
}

export const getTvShowExternalIds = async function(tvShowId: number): Promise<TvShowExternalIds | AppError>{
  return tmdbFetch<TvShowExternalIds>(`/tv/${tvShowId}/external_ids`);
}

export const getTvShowImages = async function(tvShowId: number): Promise<TvShowImages | AppError>{
  return tmdbFetch<TvShowImages>(`/tv/${tvShowId}/images`);
}

export const getTvShowKeywords = async function(tvShowId: number): Promise<TvShowKeywords | AppError>{
  return tmdbFetch<TvShowKeywords>(`/tv/${tvShowId}/keywords`);
}

export const getTvShowRecommendations = async function(tvShowId: number, page: number): Promise<MediaResponse<TvShowSummary> | AppError>{
  return tmdbFetch<MediaResponse<TvShowSummary>>(`/tv/${tvShowId}/recommendations?language=en-US&page=${page}`);
}

export const getTvReviews = async function(tvShowId: number, page: number): Promise<MediaResponse<ReviewSummary> | AppError>{
  return tmdbFetch<MediaResponse<ReviewSummary>>(`/tv/${tvShowId}/reviews?language=en-US&page=${page}`);
}

export const getTvShowVideos = async function(tvShowId: number): Promise<TvShowVideos | AppError>{
  return tmdbFetch<TvShowVideos>(`/tv/${tvShowId}/videos?language=en-US`);
}
