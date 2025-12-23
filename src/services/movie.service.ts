import type {
    MediaResponse,
    MovieSummary, 
    MovieDetail, 
    MovieAccountStates, 
    MovieCredits, 
    MovieExternalIds, 
    MovieImages, 
    MovieKeywords, 
    MovieVideos,
    ReviewSummary,
    AppError
} from "../types";
import { tmdbFetch } from "../utils/api";

export const getMovieLists = async function(category: string, page: number): Promise<MediaResponse<MovieSummary> | AppError>{
    return tmdbFetch<MediaResponse<MovieSummary>>(`/movie/${category}?language=en-US&page=${page}`);
}

export const getMovie = async function(movieId: number): Promise<MovieDetail | AppError>{
    return tmdbFetch<MovieDetail>(`/movie/${movieId}?language=en-US`);
}

export const getMovieAccountStates = async function(movieId: number, sessionId: string): Promise<MovieAccountStates | AppError>{
    return tmdbFetch<MovieAccountStates>(`/movie/${movieId}/account_states?session_id=${sessionId}`);
}

export const getMovieCredits = async function(movieId: number): Promise<MovieCredits | AppError>{
    return tmdbFetch<MovieCredits>(`/movie/${movieId}/credits?language=en-US`);
}

export const getMovieExternalIds = async function(movieId: number): Promise<MovieExternalIds | AppError>{
    return tmdbFetch<MovieExternalIds>(`/movie/${movieId}/external_ids`);
}

export const getMovieImages = async function(movieId: number): Promise<MovieImages | AppError>{
    return tmdbFetch<MovieImages>(`/movie/${movieId}/images`);
}

export const getMovieKeywords = async function(movieId: number): Promise<MovieKeywords | AppError>{
    return tmdbFetch<MovieKeywords>(`/movie/${movieId}/keywords`);
}

export const getMovieRecommendations = async function(movieId: number, page: number): Promise<MediaResponse<MovieSummary> | AppError>{
    return tmdbFetch<MediaResponse<MovieSummary>>(`/movie/${movieId}/recommendations?language=en-US&page=${page}`);
}

export const getMovieReviews = async function(movieId: number, page: number): Promise<MediaResponse<ReviewSummary> | AppError>{
    return tmdbFetch<MediaResponse<ReviewSummary>>(`/movie/${movieId}/reviews?language=en-US&page=${page}`);
}

export const getMovieVideos = async function(movieId: number): Promise<MovieVideos | AppError>{
    return tmdbFetch<MovieVideos>(`/movie/${movieId}/videos?language=en-US`);
}
