import { type LoaderFunctionArgs, useLoaderData } from "react-router";
import type { MediaResponse, MediaSummary, AppError } from "../types";
import { getSearchMovieResults, getSearchTvResults, getSearchPersonResults } from "../services/search.service";
import { usePagination } from "../hooks/usePagination";

import ExplorerLayout from "../components/layout/ExplorerLayout";
import WideMediaCard from "../components/media/WideMediaCard";
import ErrorMessage from "../components/common/ErrorMessage";
import SearchResult from "../components/SearchResutl";
import Pagination from "../components/common/Pagination";

export default function Search(){
  const { searchData, countResults } = useLoaderData<{ searchData: MediaResponse<MediaSummary> | AppError, countResults: (MediaResponse<MediaSummary> | AppError)[] }>();
  const searchTotalPages = searchData && 'total_pages' in searchData ? searchData.total_pages : 1;
  const { curPage, totalPages, handlePageChange } = usePagination(searchTotalPages)

  return (
    <ExplorerLayout title="Search">
      <SearchResult countResults={countResults} />
      {searchData && 'results' in searchData && (
        <div className="results flex flex-col mt-4 w-full gap-8">
          {searchData.results.length > 0 && (
            searchData.results.map((media) => (
              <WideMediaCard key={media.id} media={media} className="mb-4" />
            ))
          )}
          {searchData.results.length === 0 && (
            <div className="text-tertiary-dark text-center py-20">
              No results found.
            </div>
          )}
        </div>
      )}
      {searchData && 'isError' in searchData && <ErrorMessage error={searchData} />}
      <Pagination curPage={curPage} totalPages={totalPages} onPageChange={handlePageChange} className="mt-8" />
    </ExplorerLayout>
  );
}

export const loader = async function({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const routePath = url.pathname.split('/').pop() || 'movie';
  const queryParam = url.searchParams.get('query')
  const pageParam = url.searchParams.get('page');

  const pageNumber = pageParam ? Number(pageParam) : 1;

  let searchFunction;
  switch (routePath){
    case 'movie':
      searchFunction = getSearchMovieResults;
      break;
    case 'tv':
      searchFunction = getSearchTvResults;
      break;
    case 'person':
      searchFunction = getSearchPersonResults;
      break;
    default:
      searchFunction = getSearchMovieResults;
  }

  const query = queryParam ?? '';

  return {
    searchData: await searchFunction({ query, page: pageNumber }),
    countResults: Promise.all([
      getSearchMovieResults({ query, page: 1 }),
      getSearchTvResults({ query, page: 1 }),
      getSearchPersonResults({ query, page: 1 })
    ])
  }
}