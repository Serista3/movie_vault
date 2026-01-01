import { useRef, useEffect } from "react"
import { useFetchData } from "../hooks/useFetchData"

import MediaGrid from "./MediaGrid"
import MediaListSkeleton from "./skeleton/MediaListSkeleton"

import type { MediaResponse, MediaSummary, AppError } from "../types"

interface LazyMediaRowProps<P extends any[]> {
  fetchFunction: (...args: P) => Promise<AppError | MediaResponse<MediaSummary>>; 
  fetchArgs: P; 
}

export default function LazyMediaRow<P extends any[]>({ fetchFunction, fetchArgs }: LazyMediaRowProps<P>){
  const { data, isLoading, error, fetchData } = useFetchData<AppError | MediaResponse<MediaSummary>, P>(fetchFunction, fetchArgs);
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(isLoading || data || error) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !data && !isLoading && !error) {
          fetchData();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) 
      observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [fetchData, data, isLoading, error]);

  return (
    <div ref={containerRef} className="min-h-90 w-full flex flex-col justify-center">
      {isLoading && !error && <MediaListSkeleton /> }
      {!isLoading && !error && data && 'results' in data && <MediaGrid variant="horizontal" mediaList={data.results} limit={10} />}
      {error && <div>Error: {error.message}</div>}
    </div>
  )
}
