// --- IMPORTS ---
import type { 
    MovieSummary, 
    MovieDetail, 
    MovieAccountStates, 
    MovieCredits, 
    MovieExternalIds, 
    MovieImages, 
    MovieKeywords, 
    MovieVideos 
} from '@/@types'

// --- TYPE GUARD FUNCTIONS ---
export const isMovieSummary = function(data: unknown): data is MovieSummary {
    if(typeof data !== 'object' || data === null) return false
    return 'release_date' in data && 'title' in data
}

export const isMovieDetail = function(data: unknown): data is MovieDetail {
    if(typeof data !== 'object' || data === null) return false
    return 'spoken_languages' in data && 'imdb_id' in data && 'revenue' in data;
}

export const isMovieAccountStates = function(data: unknown): data is MovieAccountStates {
    if(typeof data !== 'object' || data === null) return false
    return 'favorite' in data && 'rated' in data && 'watchlist' in data;
}

export const isMovieCredits = function(data: unknown): data is MovieCredits {
    if(typeof data !== 'object' || data === null) return false
    return 'cast' in data && 'crew' in data;
}

export const isMovieExternalIds = function(data: unknown): data is MovieExternalIds {
    if(typeof data !== 'object' || data === null) return false
    return 'imdb_id' in data && 'wikidata_id' in data && 'facebook_id' in data;
}

export const isMovieImages = function(data: unknown): data is MovieImages {
    if(typeof data !== 'object' || data === null) return false
    return 'backdrops' in data;
}

export const isMovieKeywords = function(data: unknown): data is MovieKeywords {
    if(typeof data !== 'object' || data === null) return false
    return 'keywords' in data;
}

export const isMovieVideos = function(data: unknown): data is MovieVideos {
    if(typeof data !== 'object' || data === null) return false
    return 'results' in data;
}