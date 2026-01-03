import { BASE_URL, API_READ_ACCESS_TOKEN } from "../services/config";
import type { TmdbErrorResponse, AppError } from "../types/api";

export const tmdbFetch = async function<T>(endpoint: string, options: RequestInit = {}): Promise<T | AppError> {
    const url = BASE_URL + endpoint;
    const defaultOptions = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_READ_ACCESS_TOKEN,
        },
        ...options
    }

    try {
        const res = await fetch(url, defaultOptions)

        if (!res.ok){
            const errorData: TmdbErrorResponse = await res.json().catch(() => {});
            throw errorData || { isError: true, message: `something went wrong`, status_code: res.status };
        }

        return await res.json() as T;

    } catch (error) {
        if ('status_code' in (error as TmdbErrorResponse)) {
            const tmdbError = error as TmdbErrorResponse;

            console.error('tmdbFetch error:', tmdbError.status_message);
            return { isError: !tmdbError.success, message: tmdbError.status_message, statusCode: tmdbError.status_code }
        }

        const appError = error as AppError;
        
        console.error('tmdbFetch unexpected error:', appError);
        return appError;
    }
}
