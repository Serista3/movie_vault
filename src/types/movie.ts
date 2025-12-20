import type { Media, MediaImage, MediaKeyword, MediaVideo, MediaGenre, MediaLanguage } from "./media";
import type { CompanySummary } from "./company";
import type { CreditCastMember, CreditCrewMember } from "./person";

export interface MovieSummary extends Media {
    backdrop_path: string | null;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MovieDetail extends MovieSummary {
    belongs_to_collection: null | string;
    budget: number;
    genres: MediaGenre[];
    homepage: string | null;
    imdb_id: string | null;
    production_companies: CompanySummary[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    revenue: number;
    runtime: number | null; 
    spoken_languages: MediaLanguage[];
    status: string;
    tagline: string | null;
}

export interface MovieAccountStates {
    id: number;
    favorite: boolean;
    rated: false | {
        value: number;
    };
    watchlist: boolean;
}

export interface MovieCredits {
    id: number;
    cast: CreditCastMember[] | CreditCrewMember[];
}

export interface MovieExternalIds {
    id: number;
    imdb_id: string | null;
    wikidata_id: null | string;
    facebook_id: string | null;
    instagram_id: string | null;
    twitter_id: string | null;
}

export interface MovieImages {
    backdrops: MediaImage[];
}

export interface MovieKeywords {
    id: number;
    keywords: MediaKeyword[];
}

export interface MovieRecommendations {
    page: number;
    results: MovieSummary[];
}

export interface MovieVideos {
    id: number;
    results: MediaVideo[];
}
