import { type LoaderFunctionArgs, useLoaderData } from "react-router";
import { usePagination } from "../hooks/usePagination";

import type { TvShowDiscoverQueryParams,  MediaResponse, TvShowSummary, AppError } from "../types";
import { getDiscoverTvShows } from "../services/discover.service";

import ExplorerLayout from "../components/layout/ExplorerLayout";
import Pagination from "../components/common/Pagination";
import MediaGrid from "../components/media/MediaGrid";
import ErrorMessage from "../components/common/ErrorMessage";
import DiscoverControls from "../components/discover/DiscoverControls";

export default function TvShows() {
  const tvShowsData = useLoaderData<MediaResponse<TvShowSummary> | AppError>();
  const tvShowsTotalPages = tvShowsData && 'total_pages' in tvShowsData ? tvShowsData.total_pages : 1;
  const { curPage, totalPages, handlePageChange } = usePagination(tvShowsTotalPages);

  return (
    <ExplorerLayout title="TV Shows">
      <DiscoverControls mediaType="tv" className="mb-4" />
      {'results' in tvShowsData && <MediaGrid mediaList={tvShowsData.results} />}
      {'isError' in tvShowsData && <ErrorMessage error={tvShowsData} />}
      <Pagination curPage={curPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </ExplorerLayout>
  );
}

export const loader = async function({ request }: LoaderFunctionArgs): Promise<MediaResponse<TvShowSummary> | AppError> {
  const url = new URL(request.url);

  const allQueryParams: TvShowDiscoverQueryParams = Array.from(url.searchParams.entries()).map(([key, value]) => {
    return {
      [key]: Number(value) 
        ? Number(value) : value === 'true' 
        ? true : value === 'false' 
        ? false : value
    }
  }).reduce((acc, curr) => ({ ...acc, ...curr }), {});

  return await getDiscoverTvShows(allQueryParams);
}
