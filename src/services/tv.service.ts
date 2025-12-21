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
  ReviewSummary
} from "../types";
import { tmdbFetch } from "../utils/api";

export const getTvShowList = async function(category: string, page: number){
  return tmdbFetch<MediaResponse<TvShowSummary>>(`/tv/${category}?language=en-US&page=${page}`);
}

export const getTvShow = async function(tvShowId: number){
  return tmdbFetch<TvShowDetail>(`/tv/${tvShowId}?language=en-US`);
}

export const getTvShowAccountStates = async function(tvShowId: number, sessionId: string){
  return tmdbFetch<TvShowAccountStates>(`/tv/${tvShowId}/account_states?session_id=${sessionId}`);
}

export const getTvShowContentRatings = async function(tvShowId: number){
  return tmdbFetch<TvShowContentRatings>(`/tv/${tvShowId}/content_ratings`);
}

export const getTvShowCredits = async function(tvShowId: number){
  return tmdbFetch<TvShowCredits>(`/tv/${tvShowId}/credits?language=en-US`);
}

export const getTvShowEpisodeGroups = async function(tvShowId: number){
  return tmdbFetch<TvShowEpisodeGroups>(`/tv/${tvShowId}/episode_groups`);
}

export const getTvShowExternalIds = async function(tvShowId: number){
  return tmdbFetch<TvShowExternalIds>(`/tv/${tvShowId}/external_ids`);
}

export const getTvShowImages = async function(tvShowId: number){
  return tmdbFetch<TvShowImages>(`/tv/${tvShowId}/images`);
}

export const getTvShowKeywords = async function(tvShowId: number){
  return tmdbFetch<TvShowKeywords>(`/tv/${tvShowId}/keywords`);
}

export const getTvShowRecommendations = async function(tvShowId: number, page: number){
  return tmdbFetch<MediaResponse<TvShowSummary>>(`/tv/${tvShowId}/recommendations?language=en-US&page=${page}`);
}

export const getTvReviews = async function(tvShowId: number, page: number){
  return tmdbFetch<MediaResponse<ReviewSummary>>(`/tv/${tvShowId}/reviews?language=en-US&page=${page}`);
}

export const getTvShowVideos = async function(tvShowId: number){
  return tmdbFetch<TvShowVideos>(`/tv/${tvShowId}/videos?language=en-US`);
}
