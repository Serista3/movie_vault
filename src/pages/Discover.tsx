// --- IMPORTS ---
import { type LoaderFunctionArgs, useLoaderData, useLocation } from "react-router";
import { usePagination } from "@/hooks";
import type { 
  MovieDiscoverQueryParams, 
  TvShowDiscoverQueryParams,  
  MediaResponse, 
  MovieSummary, 
  TvShowSummary,
  AppError 
} from "@/@types";
import { isAppError, isMediaResponse } from "@/guards";
import { getDiscoverMovies, getDiscoverTvShows } from "@/services";
import { ExplorerLayout } from "@/components/layout";
import { Pagination, ErrorMessage } from "@/components/common";
import { MediaGrid } from "@/features/media";
import { DiscoverControls } from "@/features/discover";

export default function Discover() {
  const location = useLocation();
  const discoverType = location.pathname.includes("movie") ? "movie" : "tv";

  // --- COMPUTED MEDIA DATA ---
  const mediaData = useLoaderData<MediaResponse<MovieSummary | TvShowSummary> | AppError>();
  const mediaTotalPages = mediaData && isMediaResponse(mediaData) ? mediaData.total_pages : 1;

  const { curPage, totalPages, handlePageChange } = usePagination(mediaTotalPages);

  return (
    <ExplorerLayout title={discoverType === "movie" ? "Movies" : "TV Shows"}>
      <DiscoverControls key={location.key} mediaType={discoverType} className="mb-4" />
      {isMediaResponse(mediaData) && <MediaGrid mediaList={mediaData.results} />}
      {isAppError(mediaData) && <ErrorMessage error={mediaData} />}
      <Pagination curPage={curPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </ExplorerLayout>
  );
}

const getAllQueryParams = function(url: URL): TvShowDiscoverQueryParams | MovieDiscoverQueryParams {
  return Array.from(url.searchParams.entries()).map(([key, value]) => {
    return {
      [key]: Number(value)
        ? Number(value) : value === 'true'
        ? true : value === 'false'
        ? false : value
    }
  }).reduce((acc, curr) => ({ ...acc, ...curr }), {});
}

// --- LOADERS ---
export const discoverMovieLoader = async function({ request }: LoaderFunctionArgs): Promise<MediaResponse<MovieSummary> | AppError> {
  const url = new URL(request.url);
  const allQueryParams: MovieDiscoverQueryParams = getAllQueryParams(url);

  return await getDiscoverMovies(allQueryParams);
}

export const discoverTvShowLoader = async function({ request }: LoaderFunctionArgs): Promise<MediaResponse<TvShowSummary> | AppError> {
  const url = new URL(request.url);
  const allQueryParams: TvShowDiscoverQueryParams = getAllQueryParams(url);

  return await getDiscoverTvShows(allQueryParams);
}