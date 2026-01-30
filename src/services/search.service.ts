import type { MediaResponse, AppError, MovieSummary, TvShowSummary, PersonSummary } from "../types";
import { tmdbFetch } from "../utils/api";

interface SearchOptions {
  query: string;
  page?: number;
}

export const getSearchCompanyResults = async function<T>({ query, page = 1 }: SearchOptions): Promise<MediaResponse<T> | AppError>{
  return tmdbFetch<MediaResponse<T>>(`/search/company?query=${query}&page=${page}`);
}

export const getSearchKeywordResults = async function<T>({ query, page = 1 }: SearchOptions): Promise<MediaResponse<T> | AppError>{
  return tmdbFetch<MediaResponse<T>>(`/search/keyword?query=${query}&page=${page}`);
}

export const getSearchMovieResults = async function({ query, page = 1 }: SearchOptions): Promise<MediaResponse<MovieSummary> | AppError>{
  return tmdbFetch<MediaResponse<MovieSummary>>(`/search/movie?query=${query}&page=${page}`);
}

export const getSearchPersonResults = async function({ query, page = 1 }: SearchOptions): Promise<MediaResponse<PersonSummary> | AppError>{
  return tmdbFetch<MediaResponse<PersonSummary>>(`/search/person?query=${query}&page=${page}`);
}

export const getSearchTvResults = async function({ query, page = 1 }: SearchOptions): Promise<MediaResponse<TvShowSummary> | AppError>{
  return tmdbFetch<MediaResponse<TvShowSummary>>(`/search/tv?query=${query}&page=${page}`);
}
