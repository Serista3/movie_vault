import { formatDateToReadable } from "./formatters";
import type { MediaSummary } from "../types";

export interface MediaSummaryData {
  mediaCategory: 'movie' | 'tv' | 'person';
  mediaImg: string | null;
  mediaTitle: string;
  mediaSubtitle: string | MediaSummary[];
  mediaOverview: string;
  mediaRating: number | 'N/A';
}

export const getMediaSummaryData = function(media: MediaSummary): MediaSummaryData {
  const mediaCategory = 'title' in media  ? 'movie' : 'first_air_date' in media ? 'tv' : 'person';
  const mediaImg = `${'poster_path' in media ? media.poster_path : media.profile_path}`;
  const mediaTitle = 'title' in media ? media.title : 'original_name' in media ? media.original_name : media.name
  const mediaSubtitle = 'release_date' in media ? formatDateToReadable(media.release_date) : 'first_air_date' in media 
    ? formatDateToReadable(media.first_air_date) : media.known_for;
  const mediaOverview = 'overview' in media ? media.overview : '';
  
  const mediaRating = 'vote_average' in media ? Math.round(media.vote_average * 10) : 'N/A';

  return {
    mediaCategory,
    mediaImg,
    mediaTitle,
    mediaSubtitle,
    mediaOverview,
    mediaRating,
  }
}

export const displayMediaSubtitle = function(subtitle: string | MediaSummary[]): string {
  if(typeof subtitle === 'string') return subtitle;
    
  const newSubtitle = subtitle.map(item => {
    let content = null;

    if(item.media_type === 'movie' && 'title' in item)
      content = item.title;
    
    else if(item.media_type === 'tv' && 'original_name' in item)
      content = item.original_name;
    
    return content;
  })
  
  return newSubtitle.join(', ');
}

export function getMediaType(media: MediaSummary): string {
  if ('title' in media) 
    return 'movie';
  if ('first_air_date' in media) 
    return 'tv';
  if ('gender' in media)
    return 'person';

  return 'unknown';
}
