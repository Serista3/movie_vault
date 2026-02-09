// --- IMPORTS ---
import { MediaCard } from "@/features/media"
import { PersonCard } from "@/features/person";
import { Paragraph } from "@/components/common";
import type { MediaSummary, PersonSummary } from "@/@types"
import { cn, getMediaType } from "@/utils/helper";

// --- TYPE DEFINATIONS ---
type Orientation = 'horizontal' | 'vertical';

interface MediaGridProps {
  mediaList: MediaSummary[];
  variant?: Orientation;
  limit?: number;
  className?: string;
} 

// --- CONSTANTS ---
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
  // --- COMPUTED CLASS NAME ---
  const layoutClass = variant === 'horizontal' ? HORIZONTAL_CLASS : VERTICAL_CLASS;

  const wrapperClass = cn(
    layoutClass,
    className,
    "min-h-90 w-full py-4"
  );

  const mediaCardClass = cn(
    variant === 'horizontal' ? 'flex-none' : 'w-full'
  );

  // --- LIMIT MEDIA LIST TO DISPLAY ---
  const minArrayLength = Math.min(mediaList.length, limit);
  
  const mediaType = mediaList.every(media => getMediaType(media) === 'person') ? 'person' : 'media';

  return (
    <div className={wrapperClass}>
      {/* --- MEDIA CARDS --- */}
      {mediaType === 'media' && mediaList.length > 0 && mediaList.slice(0, minArrayLength).map((media) => (
        <MediaCard 
          key={media.id} 
          media={media} 
          className={mediaCardClass}
        />
      ))}

      {/* --- PERSON CARDS --- */}
      {mediaType === 'person' && mediaList.length > 0 && mediaList.slice(0, minArrayLength).map((person) => (
        <PersonCard 
          key={person.id} 
          person={person as PersonSummary} 
          className={mediaCardClass}
        />
      ))}

      {/* --- NO MEDIA MESSAGE --- */}
      {mediaList.length === 0 && (
        <Paragraph className="min-h-90 flex items-center justify-center">
          No media available.
        </Paragraph>
      )}
    </div>
  )
}