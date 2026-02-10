// --- IMPORTS ---
import type { 
  Media, 
  MediaGenre, 
  MediaLanguage, 
  MediaCountry, 
  MediaImage, 
  MediaKeyword, 
  MediaVideo 
} from "./media"
import type { 
  CreditCastMember, 
  CreditCrewMember, 
  AggregateCreditsCastMember, 
  AggregateCreditsCrewMember 
} from "./person";
import type { CompanySummary } from "./company";
import type { NetworkSummary } from "./network";

// --- TYPE DEFINATIONS ---
export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface Episode {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
  crew: CreditCrewMember[]
  guest_stars: CreditCastMember[]
}

export interface Season {
  air_date: string;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface TvShowSeason extends Season {
  episode_count: number;
}

export interface TvShowSeasonDetail extends Season {
  _id: string;
  episodes: Episode[]
  networks: NetworkSummary[]
}

export interface TvShowLastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

export interface TvShowSummary extends Media {
  backdrop_path: string | null;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

export interface TvShowDetail extends TvShowSummary {
  created_by: CreatedBy[];
  episode_run_time: number[];
  genres: MediaGenre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: TvShowLastEpisodeToAir;
  next_episode_to_air: null | string;
  networks: NetworkSummary[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  production_companies: CompanySummary[];
  production_countries: MediaCountry[];
  seasons: TvShowSeason[];
  spoken_languages: MediaLanguage[];
  status: string;
  tagline: string;
  type: string;
}

export interface TvShowAccountStates {
  id: number;
  favorite: boolean;
  rated: false | {
    value: number;
  };
  watchlist: boolean;
}

export interface TvShowAggregateCredits {
  id: number;
  cast: AggregateCreditsCastMember[];
  crew: AggregateCreditsCrewMember[];
}

export interface TvShowContentRatings {
  id: number;
  results: {
    iso_3166_1: string;
    rating: string;
  }[];
}

export interface TvShowCredits {
  id: number;
  cast: CreditCastMember[];
  crew: CreditCrewMember[];
}

export interface TvShowEpisodeGroups {
  id: number;
  results: {
    description: string;
    episode_count: number;
    group_count: number;
    id: string;
    name: string;
    network: NetworkSummary;
    type: number;
  }
}

export interface TvShowExternalIds {
  id: number;
  imdb_id: string | null;
  freebase_mid: string | null;
  freebase_id: string | null;
  tvdb_id: number | null;
  tvrage_id: number | null;
  wikidata_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
}

export interface TvShowImages {
  backdrops: MediaImage[];
}

export interface TvShowKeywords {
  id: number;
  results: MediaKeyword[];
}

export interface TvShowVideos {
  id: number;
  results: MediaVideo[];
}