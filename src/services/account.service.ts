import { tmdbFetch } from "@/utils/api";

import { optionMethodPost } from "./config";
import type { 
    MediaType,
    MediaResponse,
    MovieSummary,
    TvShowSummary,
    SortBy,
    TmdbSuccessResponse,
    AppError 
} from "../@types";

interface MaskRequest {
    media_type: MediaType;
    media_id: number;
}

interface FavoriteRequest extends MaskRequest {
    favorite: boolean;
}

interface WatchlistRequest extends MaskRequest {
    watchlist: boolean;
}

interface AccountMediaParams {
    accountId: number;
    page: number;
    sortBy: SortBy;
}

export const toggleFavorite = async function(favoriteRequest: FavoriteRequest, accountId: number): Promise<TmdbSuccessResponse | AppError>{
    const sessionId = localStorage.getItem('session_id');
    return tmdbFetch<TmdbSuccessResponse>(`/account/${accountId}/favorite?session_id=${sessionId}`, {
        ...optionMethodPost,
        body: JSON.stringify({
            ...favoriteRequest,
        })
    })
}

export const toggleWatchlist = async function(watchlistRequest: WatchlistRequest, accountId: number): Promise<TmdbSuccessResponse | AppError>{
    const sessionId = localStorage.getItem('session_id');
    return tmdbFetch<TmdbSuccessResponse>(`/account/${accountId}/watchlist?session_id=${sessionId}`, {
        ...optionMethodPost,
        body: JSON.stringify({
            ...watchlistRequest,
        })
    })
}

export const getFavoriteMovies = async function({ accountId, page, sortBy }: AccountMediaParams): Promise<MediaResponse<MovieSummary> | AppError>{
    const sessionId = localStorage.getItem('session_id');
    return tmdbFetch<MediaResponse<MovieSummary>>(`/account/${accountId}/favorite/movies?session_id=${sessionId}&language=en-US&sort_by=${sortBy}&page=${page}`);
}

export const getFavoriteTvShows = async function({ accountId, page, sortBy }: AccountMediaParams): Promise<MediaResponse<TvShowSummary> | AppError>{
    const sessionId = localStorage.getItem('session_id');
    return tmdbFetch<MediaResponse<TvShowSummary>>(`/account/${accountId}/favorite/tv?session_id=${sessionId}&language=en-US&sort_by=${sortBy}&page=${page}`);
}

export const getWatchlistMovies = async function({ accountId, page, sortBy }: AccountMediaParams): Promise<MediaResponse<MovieSummary> | AppError>{
    const sessionId = localStorage.getItem('session_id');
    return tmdbFetch<MediaResponse<MovieSummary>>(`/account/${accountId}/watchlist/movies?session_id=${sessionId}&language=en-US&sort_by=${sortBy}&page=${page}`);
}

export const getWatchlistTvShows = async function({ accountId, page, sortBy }: AccountMediaParams): Promise<MediaResponse<TvShowSummary> | AppError>{
    const sessionId = localStorage.getItem('session_id');
    return tmdbFetch<MediaResponse<TvShowSummary>>(`/account/${accountId}/watchlist/tv?session_id=${sessionId}&language=en-US&sort_by=${sortBy}&page=${page}`);
}