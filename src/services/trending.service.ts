import { tmdbFetch } from "../utils/api";
import type { MediaResponse, TrendingType, TimeWindow, AppError } from "../types";

export const getTrending = async function<T>(type: TrendingType, timeWindow: TimeWindow): Promise<MediaResponse<T> | AppError>{
    return tmdbFetch<MediaResponse<T>>(`/trending/${type}/${timeWindow}?language=en-US`);
}
