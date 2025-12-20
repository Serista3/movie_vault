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
            throw new Error(errorData.status_message || 'tmdbFetch: Network response was not ok');
        }

        return await res.json() as T;

    } catch (error) {
        console.error('tmdbFetch error:', error);
        return { isError: true, message: (error as Error).message }
    }
}
