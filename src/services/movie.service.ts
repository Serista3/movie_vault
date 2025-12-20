import type {
    MediaResponse,
    MovieSummary, 
    MovieDetail, 
    MovieAccountStates, 
    MovieCredits, 
    MovieExternalIds, 
    MovieImages, 
    MovieKeywords, 
    MovieRecommendations,
    ReviewSummary
} from "../types";
import { tmdbFetch } from "../utils/api";

export const getMovieLists = async function(category: string, page: number){
    return tmdbFetch<MovieSummary>(`/movie/${category}?language=en-US&page=${page}`);
}

export const getMovie = async function(movieId: number){
    return tmdbFetch<MovieDetail>(`/movie/${movieId}?language=en-US`);
}

export const getMovieAccountStates = async function(movieId: number, sessionId: string){
    return tmdbFetch<MovieAccountStates>(`/movie/${movieId}/account_states?session_id=${sessionId}`);
}

export const getMovieCredits = async function(movieId: number){
    return tmdbFetch<MovieCredits>(`/movie/${movieId}/credits?language=en-US`);
}

export const getMovieExternalIds = async function(movieId: number){
    return tmdbFetch<MovieExternalIds>(`/movie/${movieId}/external_ids`);
}

export const getMovieImages = async function(movieId: number){
    return tmdbFetch<MovieImages>(`/movie/${movieId}/images`);
}

export const getMovieKeywords = async function(movieId: number){
    return tmdbFetch<MovieKeywords>(`/movie/${movieId}/keywords`);
}

export const getMovieRecommendations = async function(movieId: number, page: number){
    return tmdbFetch<MovieRecommendations>(`/movie/${movieId}/recommendations?language=en-US&page=${page}`);
}

export const getMovieReviews = async function(movieId: number, page: number){
    return tmdbFetch<MediaResponse<ReviewSummary>>(`/movie/${movieId}/reviews?language=en-US&page=${page}`);
}

export const getMovieVideos = async function(movieId: number){
    return tmdbFetch<MovieRecommendations>(`/movie/${movieId}/videos?language=en-US`);
}
