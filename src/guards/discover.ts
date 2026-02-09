// --- IMPORTS ---
import type { 
  Monetization, 
  WithStatus, 
  SortBy, 
  BaseDiscoverQueryParams, 
  MovieDiscoverQueryParams, 
  TvShowDiscoverQueryParams 
} from "@/@types";

// --- CONSTANTS ---
const sortByOptions = [
  'original_title.asc', 'original_title.desc', 'original_name.asc', 'original_name.desc', 
  'popularity.asc', 'popularity.desc', 'revenue.asc', 'revenue.desc', 'primary_release_date.asc', 'primary_release_date.desc',
  'first_air_date.asc', 'first_air_date.desc', 'title.asc', 'title.desc', 'name.asc', 'name.desc',
  'vote_average.asc', 'vote_average.desc', 'vote_count.asc', 'vote_count.desc'
]

// --- TYPE GUARD FUNCTIONS ---
export const isMonetization = function(data: unknown): data is Monetization {
  if(typeof data !== 'string' || data === null) return false
  return ['flatrate', 'free', 'ads', 'rent', 'buy'].some(d => d === data);
}

export const isWithStatus = function(data: unknown): data is WithStatus {
  if(typeof data !== 'number' || data === null) return false
  return [1, 2, 3, 4, 5, 6].some(d => d === data);
}

export const isSortBy = function(data: unknown): data is SortBy {
  if(typeof data !== 'string' || data === null) return false
  return sortByOptions.some(d => d === data)
}

export const isBaseDiscoverQueryParams = function(data: unknown): data is BaseDiscoverQueryParams {
  if(typeof data !== 'object' || data === null) return false
  return 'sort_by' in data && 'vote_average.gte' in data && 'vote_average.lte' in data
}

export const isMovieDiscoverQueryParams = function(data: unknown): data is MovieDiscoverQueryParams {
  if(typeof data !== 'object' || data === null) return false
  return 'certification' in data && 'primary_release_date.gte' in data && 'with_release_type' in data
}

export const isTvShowDiscoverQueryParams = function(data: unknown): data is TvShowDiscoverQueryParams {
  if(typeof data !== 'object' || data === null) return false
  return 'first_air_date.gte' in data && 'screened_theatrically' in data && 'with_networks' in data
}