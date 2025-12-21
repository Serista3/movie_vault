import type { MediaResponse } from "../types";
import { tmdbFetch } from "../utils/api";

interface SearchOptions {
  query: string;
  page?: number;
}

export const getSearchCompanyResults = async function<T>({ query, page = 1 }: SearchOptions){
  return tmdbFetch<MediaResponse<T>>(`/search/company?query=${query}&page=${page}`);
}

export const getSearchKeywordResults = async function<T>({ query, page = 1 }: SearchOptions){
  return tmdbFetch<MediaResponse<T>>(`/search/keyword?query=${query}&page=${page}`);
}

export const getSearchMovieResults = async function<T>({ query, page = 1 }: SearchOptions){
  return tmdbFetch<MediaResponse<T>>(`/search/movie?query=${query}&page=${page}`);
}

export const getSearchPersonResults = async function<T>({ query, page = 1 }: SearchOptions){
  return tmdbFetch<MediaResponse<T>>(`/search/person?query=${query}&page=${page}`);
}

export const getSearchTvResults = async function<T>({ query, page = 1 }: SearchOptions){
  return tmdbFetch<MediaResponse<T>>(`/search/tv?query=${query}&page=${page}`);
}
