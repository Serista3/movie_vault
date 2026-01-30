import { type LoaderFunctionArgs, useLoaderData } from "react-router";
import { getPeople } from "../services/people.service";
import type { MediaResponse, PersonSummary, AppError } from "../types";
import { usePagination } from "../hooks/usePagination";

import ExplorerLayout from "../components/layout/ExplorerLayout";
import MediaGrid from "../components/media/MediaGrid";
import ErrorMessage from "../components/common/ErrorMessage";
import Pagination from "../components/common/Pagination";

export default function People() {
  const peopleData = useLoaderData<MediaResponse<PersonSummary> | AppError>();
  const peopleTotalPages = peopleData && 'total_pages' in peopleData ? peopleData.total_pages : 1;
  const { curPage, totalPages, handlePageChange } = usePagination(peopleTotalPages);

  return (
    <ExplorerLayout title="People">
      {peopleData && 'results' in peopleData && <MediaGrid mediaList={peopleData.results} />}
      {peopleData && 'isError' in peopleData && <ErrorMessage error={peopleData} />}
      <Pagination curPage={curPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </ExplorerLayout>
  )
}

export const loader = async function({ request }: LoaderFunctionArgs): Promise<MediaResponse<PersonSummary> | AppError> {
  const url = new URL(request.url);
  const pageParam = url.searchParams.get('page');

  if (!pageParam){
    const peopleData = await getPeople(1);
    return peopleData;
  }

  return await getPeople(Number(pageParam));
}
