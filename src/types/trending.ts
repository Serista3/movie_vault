export type TrendingType = 'all' | 'movie' | 'tv' | 'person';
export type TimeWindow = 'day' | 'week';

// export interface BaseTrendingItem {
//     id: number;
//     adult: boolean;
//     popularity: number;
// }

// export interface TvItem extends BaseTrendingItem {
//     "backdrop_path": string | null;
//     "name": string;
//     "original_language": string;
//     "original_name": string;
//     "overview": string;
//     "poster_path": string | null;
//     "genre_ids": number[];
//     "first_air_date": string;
//     "vote_average": number;
//     "vote_count": number;
//     "origin_country": string[];
// }

// export interface KnownForItem extends BaseTrendingItem {
//     "backdrop_path": string | null;
//     "title": string;
//     "original_language": string;
//     "original_title": string;
//     "overview": string;
//     "poster_path": string | null;
//     "genre_ids": number[];
//     "release_date": string;
//     "video": boolean;
//     "vote_average": number;
//     "vote_count": number;
// }

// export interface PersonItem extends BaseTrendingItem {
//     "name": string;
//     "original_name": string;
//     "gender": number;
//     "known_for_department": "Acting";
//     "profile_path": string | null;
//     "known_for": KnownForItem[];
// }

// export type TrendingItem = Movie | TvItem | PersonItem;

// export interface TrendingData {
//     "page": number;
//     "results": TrendingItem[];
//     total_pages: number;
//     total_results: number;
// }