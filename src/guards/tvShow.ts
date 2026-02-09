// --- IMPORTS ---
import type {
  CreatedBy,
  TvShowSeason,
  TvShowLastEpisodeToAir,
  TvShowSummary,
  TvShowDetail,
  TvShowAccountStates,
  TvShowAggregateCredits,
  TvShowContentRatings,
  TvShowCredits,
  TvShowEpisodeGroups,
  TvShowExternalIds,
  TvShowImages,
  TvShowKeywords,
  TvShowVideos
} from '@/@types'

// --- TYPE GUARD FUNCTIONS ---
export const isCreatedBy = function(data: unknown): data is CreatedBy {
  if(typeof data !== 'object' || data === null) return false
  return 'credit_id' in data && 'profile_path' in data && 'name' in data;
}

export const isTvShowSeason = function(data: unknown): data is TvShowSeason {
  if(typeof data !== 'object' || data === null) return false
  return 'air_date' in data && 'overview' in data && 'season_number' in data;
}

export const isTvShowLastEpisodeToAir = function(data: unknown): data is TvShowLastEpisodeToAir {
  if(typeof data !== 'object' || data === null) return false
  return 'episode_number' in data && 'production_code' in data && 'show_id' in data;
}

export const isTvShowSummary = function(data: unknown): data is TvShowSummary {
  if(typeof data !== 'object' || data === null) return false
  return 'first_air_date' in data && 'origin_country' in data;
}

export const isTvShowDetail = function(data: unknown): data is TvShowDetail {
  if(typeof data !== 'object' || data === null) return false
  return 'episode_run_time' in data && 'last_episode_to_air' in data && 'number_of_episodes' in data;
}

export const isTvShowAccountStates = function(data: unknown): data is TvShowAccountStates {
  if(typeof data !== 'object' || data === null) return false
  return 'favorite' in data && 'rated' in data && 'watchlist' in data;
}

export const isTvShowAggregateCredits = function(data: unknown): data is TvShowAggregateCredits {
  if(typeof data !== 'object' || data === null) return false
  return 'cast' in data && 'crew' in data;
}

export const isTvShowContentRatings = function(data: unknown): data is TvShowContentRatings {
  if(typeof data !== 'object' || data === null) return false
  return 'id' in data && 'results' in data;
}

export const isTvShowCredits = function(data: unknown): data is TvShowCredits {
  if(typeof data !== 'object' || data === null) return false
  return 'cast' in data && 'crew' in data;
}

export const isTvShowEpisodeGroups = function(data: unknown): data is TvShowEpisodeGroups {
  if(typeof data !== 'object' || data === null) return false
  return 'id' in data && 'results' in data;
}

export const isTvShowExternalIds = function(data: unknown): data is TvShowExternalIds {
  if(typeof data !== 'object' || data === null) return false
  return 'freebase_mid' in data && 'tvdb_id' in data;
}

export const isTvShowImages = function(data: unknown): data is TvShowImages {
  if(typeof data !== 'object' || data === null) return false
  return 'backdrops' in data;
}

export const isTvShowKeywords = function(data: unknown): data is TvShowKeywords {
  if(typeof data !== 'object' || data === null) return false
  return 'id' in data && 'results' in data;
}

export const isTvShowVideos = function(data: unknown): data is TvShowVideos {
  if(typeof data !== 'object' || data === null) return false
  return 'id' in data && 'results' in data;
}