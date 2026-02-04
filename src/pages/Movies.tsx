import { type LoaderFunctionArgs, useLoaderData } from "react-router";
import { usePagination } from "../hooks/usePagination";

import type { MovieDiscoverQueryParams,  MediaResponse, MovieSummary, AppError } from "../types";
import { getDiscoverMovies } from "../services/discover.service";

import ExplorerLayout from "../components/layout/ExplorerLayout";
import Pagination from "../components/common/Pagination";
import MediaGrid from "../components/media/MediaGrid";
import ErrorMessage from "../components/common/ErrorMessage";
import DiscoverControls from "../components/discover/DiscoverControls";

export default function Movies() {
  const moviesData = useLoaderData<MediaResponse<MovieSummary> | AppError>();
  const moviesTotalPages = moviesData && 'total_pages' in moviesData ? moviesData.total_pages : 1;
  const { curPage, totalPages, handlePageChange } = usePagination(moviesTotalPages);

  return (
    <ExplorerLayout title="Movies">
      <DiscoverControls mediaType="movie" className="mb-4" />
      {'results' in moviesData && <MediaGrid mediaList={moviesData.results} />}
      {'isError' in moviesData && <ErrorMessage error={moviesData} />}
      <Pagination curPage={curPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </ExplorerLayout>
  );
}

export const loader = async function({ request }: LoaderFunctionArgs): Promise<MediaResponse<MovieSummary> | AppError> {
  const url = new URL(request.url);

  const allQueryParams: MovieDiscoverQueryParams = Array.from(url.searchParams.entries()).map(([key, value]) => {
    return {
      [key]: Number(value) 
        ? Number(value) : value === 'true' 
        ? true : value === 'false' 
        ? false : value
    }
  }).reduce((acc, curr) => ({ ...acc, ...curr }), {});

  return await getDiscoverMovies(allQueryParams);
}
