// --- IMPORTS ---
import type { 
    MediaResponse, 
    MediaImage, 
    MediaVideo, 
    MediaKeyword, 
    MediaGenre, 
    MediaLanguage, 
    MediaCountry 
} from '@/@types'

// --- TYPE GUARD FUNCTIONS ---
export const isMediaResponse = function<T>(data: unknown): data is MediaResponse<T> {
    if(typeof data !== 'object' || data === null) return false
    return 'results' in data && Array.isArray(data.results) && 'page' in data
}

export const isMediaImage = function(data: unknown): data is MediaImage {
    if(typeof data !== 'object' || data === null) return false
    return 'width' in data && 'height' in data && 'aspect_ratio' in data
}

export const isMediaVideo = function(data: unknown): data is MediaVideo {
    if(typeof data !== 'object' || data === null) return false
    return 'iso_639_1' in data && 'key' in data && 'site' in data
}

export const isMediaKeyword = function(data: unknown): data is MediaKeyword {
    if(typeof data !== 'object' || data === null) return false
    return 'id' in data && 'name' in data;
}

export const isMediaGenre = function(data: unknown): data is MediaGenre {
    if(typeof data !== 'object' || data === null) return false
    return 'id' in data && 'name' in data;
}

export const isMediaLanguage = function(data: unknown): data is MediaLanguage {
    if(typeof data !== 'object' || data === null) return false
    return 'iso_639_1' in data && 'english_name' in data && 'name' in data;
}

export const isMediaCountry = function(data: unknown): data is MediaCountry {
    if(typeof data !== 'object' || data === null) return false
    return 'iso_3166_1' in data && 'name' in data;
}