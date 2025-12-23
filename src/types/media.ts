import type { MovieSummary } from './movie';
import type { TvShowSummary } from './tvShow';

export type MediaType = 'movie' | 'tv' | 'person';
export type MediaSummary = MovieSummary | TvShowSummary;

export interface Media {
    id: number;
    adult: boolean;
    popularity?: number;
    media_type?: MediaType;
}

export interface MediaResponse<T> {
    dates?: {
        maximum: string;
        minimum: string;
    }
    results: T[];
    page: number;
    total_pages: number;
    total_results: number;
}

export interface MediaImage {
    aspect_ratio: number;
    height: number;
    iso_639_1: null | string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
}

export interface MediaVideo {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: false;
    published_at: string;
    id: string;
}

export interface MediaKeyword {
    id: number;
    name: string;
}

export interface MediaGenre {
    id: number;
    name: string;
}

export interface MediaLanguage {
    iso_639_1: string;
    english_name: string;
    name: string;
}

export interface MediaCountry {
    iso_3166_1: string;
    name: string;
}
