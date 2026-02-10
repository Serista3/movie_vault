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
      <div className="grid grid-cols-1 lg:grid-cols-4 items-start gap-6">
        <DiscoverControls key={location.key} mediaType={discoverType} className="mb-4 sm:mb-6 md:mb-8 lg:mb-10" />
        {isMediaResponse(mediaData) && <MediaGrid mediaList={mediaData.results} className="xl:py-0 lg:col-span-3" />}
        {isAppError(mediaData) && <ErrorMessage error={mediaData} className="lg:col-span-3" />}
      </div>
      <Pagination curPage={curPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </ExplorerLayout>
  );
}

// --- HELPERS ---
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