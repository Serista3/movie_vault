import MediaCard from "./MediaCard"

import type { MediaSummary } from "../types"

interface MediaGridProps {
  mediaList: MediaSummary[];
  variant?: 'horizontal' | 'vertical';
  limit?: number;
  className?: string;
} 

export default function MediaGrid({ 
  mediaList,
  variant = 'vertical',
  limit = mediaList.length,
  className = '', 
}: MediaGridProps) {
  const layoutClass = variant === 'horizontal' 
    ? `flex items-start gap-4 overflow-x-auto snap-x 
      [&::-webkit-scrollbar]:w-0.5 
      [&::-webkit-scrollbar-track]:bg-back-light
      [&::-webkit-scrollbar-thumb]:bg-main-light
      [&::-webkit-scrollbar-thumb]:rounded-full`
    : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6';
  const minArrayLength = Math.min(mediaList.length, limit);

  return (
    <div className={`${layoutClass} ${className} min-h-90 w-full py-4`}>
      {mediaList.length > 0 && mediaList.slice(0, minArrayLength).map((media) => (
        <MediaCard key={media.id} media={media} className={variant === 'horizontal' ? 'flex-none' : ''} />
      ))}
      {mediaList.length === 0 && <div className="min-h-90 flex items-center justify-center text-white-dark">No media available.</div>}
    </div>
  )
}
