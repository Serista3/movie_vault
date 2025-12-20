import { tmdbFetch } from "../utils/api";
import type { MediaResponse, MovieSummary, TrendingType, TimeWindow } from "../types";

export const getTrending = async function(type: TrendingType, timeWindow: TimeWindow){
    return tmdbFetch<MediaResponse<MovieSummary>>(`/trending/${type}/${timeWindow}?language=en-US`);
}
