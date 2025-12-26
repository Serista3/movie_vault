import { useRef, useEffect } from "react"
import { useFetchData } from "../hooks/useFetchData"

import MediaCard from "./MediaCard"
import MediaListSkeleton from "./skeleton/MediaListSkeleton"

import type { MediaResponse, MediaSummary, AppError } from "../types"

interface MediaListProps<P extends (string | number | boolean)[]> {
  fetchFunction: (...args: P) => Promise<AppError | MediaResponse<MediaSummary>>; 
  fetchArgs: P; 
}

export default function MediaList<P extends (string | number | boolean)[]>({ fetchFunction, fetchArgs }: MediaListProps<P>){
  const { data, isLoading, error, fetchData } = useFetchData<AppError | MediaResponse<MediaSummary>, P>(fetchFunction, fetchArgs);
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !data && !isLoading) {
          fetchData();

        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) 
      observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [fetchData, data, isLoading]);

  return (
    <div 
      ref={containerRef} 
      className="flex items-start gap-4 min-h-90 w-full overflow-x-auto py-4 snap-x [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-track]:bg-gray-dark [&::-webkit-scrollbar-thumb]:bg-main-light [&::-webkit-scrollbar-thumb]:rounded-full">
      {isLoading && <MediaListSkeleton />}
      {error && <div>Error: {error.message}</div>}
      {data && 'results' in data && data.results.slice(0, 10).map((media) => (
        <MediaCard key={media.id} media={media} />
      ))}
    </div>
  )
}