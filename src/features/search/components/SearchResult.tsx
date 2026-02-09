// --- IMPORTS ---
import { Suspense } from "react";
import { Await, useNavigate, useSearchParams, useLocation } from "react-router";
import type { AppError, MediaResponse, MediaSummary } from "@/@types";
import { Button } from "@/components/common";
import { LoadingSpin } from "@/components/skeleton";

// --- CONSTANTS ---
const MEDIA_TYPES = ['Movies', 'Tv Shows', 'People'];
const MEDIA_TYPE_PATHS = ['movie', 'tv', 'person'];

// --- TYPE DEFINATIONS ---
interface SearchResultProps {
  countResults: (MediaResponse<MediaSummary> | AppError)[]
}

export default function SearchResult({ countResults }: SearchResultProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // --- CURRENT PATH & QUERY PARAM ---
  const curPath = location.pathname.split('/').at(-1) || 'movie';
  const query = searchParams.get('query') || '';

  // --- CLICK BUTTON TO CHANGE SEARCH MEDIA TYPE ---
  const onClickResultType = function(typeIndex: number): void {
    const mediaTypePath = MEDIA_TYPE_PATHS[typeIndex];
    navigate(`/search/${mediaTypePath}?query=${query}&page=1`);
  }

  return (
    <div className="mb-4 w-full shadow-2xl">
      <div className="font-semibold bg-secondary-dark py-2 px-4 rounded-t-[10px]">
        Search Result
      </div>
      {/* --- SEARCH RESULT COUNTS --- */}
      <Suspense fallback={<LoadingSpin />}>
        <Await resolve={countResults}>
          {countResults => {
            return (
              <ul className="flex flex-col w-full rounded-b-[10px] overflow-hidden">
                {countResults.map((result, index) => {
                  // --- EXTRACT MEDIA TYPE & COUNT MEDIA ---
                  const mediaType = MEDIA_TYPES[index];
                  const count = 'total_pages' in result && result.total_pages * result.results.length;

                  return (
                    // --- SEARCH MEDIA TYPE BUTTON ---
                    <li key={new Date().getTime() + index}>
                      <Button
                        variant="tertiary" 
                        className={`w-full flex justify-between items-center rounded-none z-1
                          ${MEDIA_TYPE_PATHS[index] === curPath && 'bg-tertiary-dark'}`
                        }
                        onClick={() => onClickResultType(index)}
                      >

                        {/* --- MEDIA TYPE --- */}
                        <div className="font-semibold">
                          {mediaType}
                        </div>

                        {/* --- COUNT MEDIA --- */}
                        <div 
                          onClick={e => e.stopPropagation()} 
                          className="px-2 py-.5 rounded-[10px] bg-primary-light font-normal z-3 cursor-text select-text"
                        >
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