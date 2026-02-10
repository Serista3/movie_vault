// --- IMPORTS ---
import type { MediaGenre, AppError } from "@/@types";
import { tmdbFetch } from "@/utils/api";

// --- SERVICES ---
export const getGenreMovieList = async function(): Promise<MediaGenre[] | AppError> {
  return tmdbFetch<MediaGenre[]>(`/genre/movie/list?language=en-US`);
}

export const getGenreTvList = async function(): Promise<MediaGenre[] | AppError> {
  return tmdbFetch<MediaGenre[]>(`/genre/tv/list?language=en-US`);
}