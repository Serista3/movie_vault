import type { 
  MediaResponse, 
  AppError, 
  MovieSummary, 
  TvShowSummary,
  MovieDiscoverQueryParams,
  TvShowDiscoverQueryParams
} from "@/@types";
import { tmdbFetch } from "@/utils/api";

const defaultParams = {
  language: 'en-US',
  sort_by: 'popularity.desc',
  include_adult: false,
  page: 1,
};

const defaultMovieParams = {
  ...defaultParams,
  include_video: false,
}

const defaultTvParams = {
  ...defaultParams,
  include_null_first_air_dates: false,
}

const getQueryString = function(params: MovieDiscoverQueryParams | TvShowDiscoverQueryParams): string {
  const defaultParams = 'include_video' in params ? defaultMovieParams : defaultTvParams;
  const finalParams = { ...defaultParams, ...params };
  const searchParams = new URLSearchParams();
  
  Object.entries(finalParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}

export const getDiscoverMovies = async function(
  params: MovieDiscoverQueryParams = {}
): Promise<MediaResponse<MovieSummary> | AppError> {
  const queryString = getQueryString(params);

  return tmdbFetch<MediaResponse<MovieSummary>>(
    `/discover/movie?${queryString}`
  );
}

export const getDiscoverTvShows = async function(
  params: TvShowDiscoverQueryParams = {}
): Promise<MediaResponse<TvShowSummary> | AppError> {
  const queryString = getQueryString(params);

  return tmdbFetch<MediaResponse<TvShowSummary>>(
    `/discover/tv?${queryString}`
  );
}