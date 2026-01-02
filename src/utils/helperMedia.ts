import type { MediaSummary } from "../types";

export function getMediaType(media: MediaSummary): string {
  if ('title' in media) 
    return 'movie';
  if ('name' in media) 
    return 'tv';
  if ('gender' in media)
    return 'person';

  return 'unknown';
}
