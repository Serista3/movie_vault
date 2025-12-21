import { tmdbFetch } from "../utils/api";
import type { MediaResponse, TrendingType, TimeWindow } from "../types";

export const getTrending = async function<T>(type: TrendingType, timeWindow: TimeWindow){
    return tmdbFetch<MediaResponse<T>>(`/trending/${type}/${timeWindow}?language=en-US`);
}
