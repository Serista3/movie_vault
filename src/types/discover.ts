export type Monetization = 'flatrate' | 'free' | 'ads' | 'rent' | 'buy';

export type WithStatus = 0 | 1 | 2 | 3 | 4 | 5

export type SortBy = 
  | 'original_title.asc' | 'original_title.desc' 
  | 'popularity.asc' | 'popularity.desc' 
  | 'revenue.asc' | 'revenue.desc' 
  | 'primary_release_date.asc' | 'primary_release_date.desc' 
  | 'title.asc' | 'title.desc' 
  | 'vote_average.asc' | 'vote_average.desc' 
  | 'vote_count.asc' | 'vote_count.desc';

export interface BaseDiscoverQueryParams {
  include_adult?: boolean;
  language?: string;
  page?: number;

  "vote_average.gte"?: number;
  "vote_average.lte"?: number;
  "vote_count.gte"?: number;
  "vote_count.lte"?: number;

  sort_by?: SortBy;
  
  watch_region?: string;

  with_watch_monetization_types?: Monetization;
  with_watch_providers?: string;

  'with_runtime.gte'?: number;
  'with_runtime.lte'?: number;

  with_companies?: string;
  with_genres?: string;
  with_keywords?: string;

  with_origin_country?: string;
  with_original_language?: string;

  without_companies?: string;
  without_genres?: string;
  without_keywords?: string;
  without_watch_providers?: string;
}

export interface MovieDiscoverQueryParams extends BaseDiscoverQueryParams {
  include_video?: boolean;

  certification?: string;
  'certification.gte'?: string;
  'certification.lte'?: string;
  certification_country?: string;

  primary_release_year?: number;
  "primary_release_date.gte"?: Date;
  "primary_release_date.lte"?: Date;
  
  region?: string;
  "release_date.gte"?: Date;
  "release_date.lte"?: Date;
  
  with_cast?: string;
  with_crew?: string;
  with_people?: string;
  with_release_type?: number; 
  
  year?: number;
}

export interface TvShowDiscoverQueryParams extends BaseDiscoverQueryParams {
  'air_date.gte'?: Date;
  'air_date.lte'?: Date;
  first_air_date_year?: number;
  'first_air_date.gte'?: Date;
  'first_air_date.lte'?: Date;
  
  include_null_first_air_dates?: boolean;

  screened_theatrically?: boolean;

  timezone?: string;

  with_networks?: number;
  with_status?: WithStatus;
  with_type?: string;
}