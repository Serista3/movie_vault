export type MediaType = 'movie' | 'tv' | 'person';

export interface Media {
    id: number;
    adult: boolean;
    popularity: number;
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
