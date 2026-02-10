// --- IMPORTS ---
import type { CertificationSummary, MediaCountry, MediaLanguage, AppError } from "@/@types";
import { tmdbFetch } from "@/utils/api";

// --- SERVICES ---
export const getLanguages = async function(): Promise<MediaLanguage[] | AppError> {
  return tmdbFetch<MediaLanguage[]>(`/configuration/languages`);
}

export const getCountries = async function(): Promise<MediaCountry[] | AppError> {
  return tmdbFetch<MediaCountry[]>(`/configuration/countries?language=en-US`);
}

export const getCertificationMovieList = async function(): Promise<CertificationSummary | AppError> {
  return tmdbFetch<CertificationSummary>(`/certification/movie/list`);
}

export const getCertificationTvList = async function(): Promise<CertificationSummary | AppError> {
  return tmdbFetch<CertificationSummary>(`/certification/tv/list`);
}
