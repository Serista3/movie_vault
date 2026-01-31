import { Suspense } from "react";
import { Await, useNavigate, useSearchParams, useLocation } from "react-router";
import type { AppError, MediaResponse, MediaSummary } from "../types";

import Button from "./common/Button";

const MEDIA_TYPES = ['Movies', 'Tv Shows', 'People'];
const MEDIA_TYPE_PATHS = ['movie', 'tv', 'person'];

interface SearchResultProps {
  countResults: (MediaResponse<MediaSummary> | AppError)[]
}

export default function SearchResult({ countResults }: SearchResultProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const curPath = location.pathname.split('/').at(-1) || 'movie';

  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || '1';

  const onClickResultType = function(typeIndex: number): void {
    const mediaTypePath = MEDIA_TYPE_PATHS[typeIndex];
    navigate(`/search/${mediaTypePath}?query=${query}&page=${page}`);
  }

  return (
    <div className="search-result mb-4 w-full shadow-2xl">
      <div className="font-semibold mb-2 bg-secondary-dark py-2 px-4 rounded-t-[10px]">Search Result</div>
      <Suspense fallback={<div>Loading counts...</div>}>
        <Await resolve={countResults}>
          {countResults => {
            return (
              <ul className="flex flex-col w-full rounded-b-[10px] overflow-hidden">
                {countResults.map((result, index) => {
                  const mediaType = MEDIA_TYPES[index];
                  const count = 'total_pages' in result && result.total_pages * result.results.length;

                  return (
                    <li key={new Date().getTime() + index}>
                      <Button 
                        variant="tertiary" 
                        className={`w-full flex justify-between items-center rounded-none 
                          ${MEDIA_TYPE_PATHS[index] === curPath && 'bg-tertiary-dark'}`
                        }
                        onClick={() => onClickResultType(index)}
                      >
                        <div className="font-semibold">
                          {mediaType}
                        </div>
                        <div className="px-2 py-.5 rounded-[10px] bg-primary-light font-normal">
                          {count.toLocaleString()}
                        </div>
                      </Button>
                    </li>
                  )
                })}
              </ul>
            )
          }}
        </Await>
      </Suspense>
    </div>
  )
} 