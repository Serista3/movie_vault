// --- IMPORTS ---
import { type LoaderFunctionArgs, useLoaderData, useLocation } from "react-router";
import type { NavItem, MovieSummary, TvShowSummary, MediaResponse, AppError } from "@/@types";
import { isMediaResponse, isAppError } from "@/guards";
import { getWatchlistMovies, getWatchlistTvShows } from "@/services";
import { usePagination } from "@/hooks";
import { ExplorerLayout, Navigation } from "@/components/layout";
import { Pagination, ErrorMessage, Paragraph } from "@/components/common";
import { MediaGrid } from "@/features/media";

export default function Favorites() {
  const location = useLocation()
  const path = location.pathname.split('/')
  const navItem: NavItem[] = [
    { 
      to: path.slice(0, path.length - 1).join('/') + '/movie', 
      label: 'Movies', 
      end: true 
    },
    { 
      to: path.slice(0, path.length - 1).join('/') + '/tv', 
      label: 'Tv', 
      end: true 
    },
  ]
  const { watchList } = useLoaderData<WatchListLoaderData>();
  const searchTotalPages = isMediaResponse(watchList) ? watchList.total_pages : 1;
  const { curPage, totalPages, handlePageChange } = usePagination(searchTotalPages)

  return (
    <ExplorerLayout title="My Watchlist">
      <Navigation items={navItem} direction="row" isNavLink={true} className="bg-primary-light rounded-[10px] py-2 px-4 mt-6" />
      {isAppError(watchList) && <ErrorMessage error={watchList} />}
      {/* --- WATCH LIST --- */}
      {!isAppError(watchList) && watchList.results.length > 0 && <MediaGrid mediaList={watchList.results} />}
      {!isAppError(watchList) && watchList.results.length === 0 && (
        <Paragraph>No watchlist available.</Paragraph>
      )}
      <Pagination curPage={curPage} totalPages={totalPages} onPageChange={handlePageChange} className="mt-8"/>
    </ExplorerLayout>
  );
}

// --- TYPE DEFINATIONS ---
interface WatchListLoaderData {
  watchList: MediaResponse<MovieSummary | TvShowSummary> | AppError
}

type FavSortBy = 'created_at.desc' | 'created_at.asc'

// --- LOADER ---
export const loader = async function({ request, params }: LoaderFunctionArgs): Promise<WatchListLoaderData> {
  const url = new URL(request.url)
  const paramId = Number(params.id)
  const paramPage = url.searchParams.get('page') || 1;
  const paramSortBy = url.searchParams.get('sort_by') || 'created_at.asc'
  const mediaType = url.pathname.includes('/movie') ? 'movie' : 'tv';

  const paramOptions = {
    accountId: paramId,
    page: Number(paramPage),
    sortBy: paramSortBy === 'created_at.asc' || paramSortBy === 'created_at.desc' 
      ? paramSortBy : 'created_at.desc' as FavSortBy,
  }

  if(mediaType === 'movie'){
    const watchList = await getWatchlistMovies(paramOptions)
    return { watchList }
  }

  const watchList = await getWatchlistTvShows(paramOptions)
  return { watchList }
}