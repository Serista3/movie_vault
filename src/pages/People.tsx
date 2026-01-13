import { type LoaderFunctionArgs, useLoaderData, useSearchParams } from "react-router";
import { getPeople } from "../services/people.service";
import type { MediaResponse, PersonSummary, AppError } from "../types";

import ExplorerLayout from "../components/layout/ExplorerLayout";
import MediaGrid from "../components/MediaGrid";
import ErrorMessage from "../components/common/ErrorMessage";
import Pagination from "../components/common/Pagination";

export default function People() {
  const peopleData = useLoaderData<MediaResponse<PersonSummary> | AppError>();
  const [searchParams, setSearchParams] = useSearchParams();
  const curPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  const handlePageChange = function(newPage: number){
    setSearchParams(searchParams => {
      searchParams.set('page', newPage.toString());
      return searchParams;
    });
  }

  return (
    <ExplorerLayout title="People">
      {peopleData && 'results' in peopleData && <MediaGrid mediaList={peopleData.results} />}
      {peopleData && 'isError' in peopleData && <ErrorMessage error={peopleData} />}
      <Pagination curPage={curPage} totalPages={5} onPageChange={handlePageChange} />
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
