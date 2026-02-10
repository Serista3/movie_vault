// --- IMPORTS ---
import { type LoaderFunctionArgs, useLoaderData } from "react-router";
import { getPeople } from "@/services";
import type { MediaResponse, PersonSummary, AppError } from "@/@types";
import { isAppError, isMediaResponse } from "@/guards";
import { usePagination } from "@/hooks";
import { ExplorerLayout } from "@/components/layout";
import { MediaGrid } from "@/features/media";
import { ErrorMessage, Pagination } from "@/components/common";

export default function People() {
  const peopleData = useLoaderData<MediaResponse<PersonSummary> | AppError>();
  const peopleTotalPages = peopleData && isMediaResponse(peopleData) ? peopleData.total_pages : 1;
  const { curPage, totalPages, handlePageChange } = usePagination(peopleTotalPages);

  return (
    <ExplorerLayout title="People">
      {/* --- PEOPLE --- */}
      {isMediaResponse(peopleData) && <MediaGrid mediaList={peopleData.results} />}
      {isAppError(peopleData) && <ErrorMessage error={peopleData} />}
      <Pagination curPage={curPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </ExplorerLayout>
  )
}

// --- LOADER ---
export const loader = async function({ request }: LoaderFunctionArgs): Promise<MediaResponse<PersonSummary> | AppError> {
  const url = new URL(request.url);
  const pageParam = url.searchParams.get('page');

  if (!pageParam){
    const peopleData = await getPeople(1);
    return peopleData;
  }

  return await getPeople(Number(pageParam));
}
