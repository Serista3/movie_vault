// --- HELPERS ---
import { cn } from "../../utils/helperClassName"

// --- HOOKS & CUSTOM HOOKS ---
import { useRef, useEffect } from "react"
import { useFetchData } from "../../hooks/useFetchData"

// --- COMPONENTS ---
import MediaGrid from "./MediaGrid"
import MediaListSkeleton from "../skeleton/MediaListSkeleton"
import ErrorMessage from "../common/ErrorMessage"

// --- TYPES ---
import type { MediaResponse, MediaSummary, AppError } from "../../types"

// --- TYPES FOR LAZY MEDIA ROW PROPS ---
interface LazyMediaRowProps<P extends unknown[]> {
  fetchFunction: (...args: P) => Promise<AppError | MediaResponse<MediaSummary>>; 
  fetchArgs: P; 
}

export default function LazyMediaRow<P extends unknown[]>({ fetchFunction, fetchArgs }: LazyMediaRowProps<P>){
  // --- FETCH DATA USING CUSTOM HOOK ---
  const { data, isLoading, error, fetchData } = useFetchData<AppError | MediaResponse<MediaSummary>, P>(fetchFunction, fetchArgs);
  const containerRef = useRef<HTMLDivElement>(null)

  // --- USE INTERSECTION OBSERVER TO LAZY LOAD MEDIA ROW ---
  useEffect(() => {
    if(isLoading || data || error) return;

    // --- CREATE INTERSECTION OBSERVER INSTANCE ---
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !data && !isLoading && !error) {
          fetchData();
        }
      },
      { threshold: 0.1 }
    );

    // --- OBSERVE THE CONTAINER REFERENCE ---
    if (containerRef.current) 
      observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [fetchData, data, isLoading, error]);

  // --- COMPUTED CLASS NAME ---
  const wrapperClass = cn(
    "w-full flex flex-col justify-start",
    error ? 'mt-4' : 'min-h-90'
  );

  return (
    <div ref={containerRef} className={wrapperClass}>
      {/* --- MEDIA SKELETON --- */}
      {isLoading && !error && <MediaListSkeleton /> }

      {/* --- MEDIA GRID CONTENT --- */}
      {!isLoading && !error && data && 'results' in data && (
        <MediaGrid variant="horizontal" mediaList={data.results} limit={10} />
      )}

      {/* --- ERROR MESSAGE --- */}
      {error && <ErrorMessage error={error} className="rounded-[10px]" />}
    </div>
  )
}