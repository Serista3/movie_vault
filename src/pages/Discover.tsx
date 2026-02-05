// --- CUSTOM HOOKS & HOOKS & ROUTER ---
import { type LoaderFunctionArgs, useLoaderData, useLocation } from "react-router";
import { usePagination } from "../hooks/usePagination";

// --- TYPES ---
import type { 
  MovieDiscoverQueryParams, 
  TvShowDiscoverQueryParams,  
  MediaResponse, 
  MovieSummary, 
  TvShowSummary,
  AppError 
} from "../types";

// --- SERVICES ---
import { getDiscoverMovies, getDiscoverTvShows } from "../services/discover.service";

// --- COMPONENTS ---
import ExplorerLayout from "../components/layout/ExplorerLayout";
import Pagination from "../components/common/Pagination";
import MediaGrid from "../components/media/MediaGrid";
import ErrorMessage from "../components/common/ErrorMessage";
import DiscoverControls from "../components/discover/DiscoverControls";

export default function Discover() {
  const location = useLocation();
  const discoverType = location.pathname.includes("movie") ? "movie" : "tv";

  // --- COMPUTED MEDIA DATA ---
  const mediaData = useLoaderData<MediaResponse<MovieSummary | TvShowSummary> | AppError>();
  const mediaTotalPages = mediaData && 'total_pages' in mediaData ? mediaData.total_pages : 1;

  const { curPage, totalPages, handlePageChange } = usePagination(mediaTotalPages);

  return (
    <ExplorerLayout title={discoverType === "movie" ? "Movies" : "TV Shows"}>
      <DiscoverControls key={location.key} mediaType={discoverType} className="mb-4" />
      {'results' in mediaData && <MediaGrid mediaList={mediaData.results} />}
      {'isError' in mediaData && <ErrorMessage error={mediaData} />}
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