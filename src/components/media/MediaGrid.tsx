import MediaCard from "./MediaCard"

import type { MediaSummary } from "../../types"
import { cn } from "../../utils/helperClassName";

type Orientation = 'horizontal' | 'vertical';

interface MediaGridProps {
  mediaList: MediaSummary[];
  variant?: Orientation;
  limit?: number;
  className?: string;
} 

const HORIZONTAL_CLASS = `
  flex items-start gap-4 overflow-x-auto snap-x 
  [&::-webkit-scrollbar]:w-0.5 
  [&::-webkit-scrollbar-track]:bg-secondary-light
  [&::-webkit-scrollbar-thumb]:bg-primary-light
  [&::-webkit-scrollbar-thumb]:rounded-full
`
const VERTICAL_CLASS = `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-start`

export default function MediaGrid({ 
  mediaList,
  variant = 'vertical',
  limit = mediaList.length,
  className, 
}: MediaGridProps) {
  const layoutClass = variant === 'horizontal' ? HORIZONTAL_CLASS : VERTICAL_CLASS;
  const minArrayLength = Math.min(mediaList.length, limit);

  return (
    <div className={cn(layoutClass, className, "min-h-90 w-full py-4")}>
      {mediaList.length > 0 && mediaList.slice(0, minArrayLength).map((media) => (
        <MediaCard key={media.id} media={media} className={variant === 'horizontal' ? 'flex-none' : 'w-full'} />
      ))}
      {mediaList.length === 0 && <div className="min-h-90 flex items-center justify-center text-tertiary-dark">No media available.</div>}
    </div>
  )
}
