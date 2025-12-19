import { API_READ_ACCESS_TOKEN } from "./config";
import type { MediaResponse, MovieSummary, TrendingType, TimeWindow } from "../types";

export const fetchTrending = async function(type: TrendingType, timeWindow: TimeWindow){
    try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/${type}/${timeWindow}?language=en-US`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`
            }
        })

        if (!res.ok) {
            throw new Error('Failed to fetch trending data');
        }

        const data: MediaResponse<MovieSummary> = await res.json();
        return data;

    } catch (error) {
        return { isError: true, message: (error as Error).message }
    }

}
