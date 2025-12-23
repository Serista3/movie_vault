import { useRef, useEffect } from "react"
import { useFetchData } from "../hooks/useFetchData"

import MediaCard from "./MediaCard"

import type { MediaResponse, MediaSummary } from "../types"
import { getMovieLists } from "../services/movie.service";
import { getTvShowList } from "../services/tv.service";

interface MediaListProps {
  category: string;
  page: number;
  media_type: 'movie' | 'tv';
}

type Params = string | number;

export default function MediaList({ category, page, media_type }: MediaListProps){
  const { data, isLoading, error, fetchData } = useFetchData<MediaResponse<MediaSummary>, Params>(
    media_type === 'movie' ? getMovieLists : getTvShowList, 
    [category, page]
  );
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !data && !isLoading) {
          fetchData();
        }
      },
      {
        threshold: 1.0
      }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [data, isLoading]);

  return (
    <div 
      ref={containerRef} 
      className="flex items-start mx-auto gap-4 max-w-300 w-full overflow-x-auto py-4 snap-x [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-track]:bg-gray-dark [&::-webkit-scrollbar-thumb]:bg-main-light [&::-webkit-scrollbar-thumb]:rounded-full">
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && data.results.slice(0, 10).map((media) => (
        <MediaCard key={media.id} media={media} />
      ))}
    </div>
  )
}