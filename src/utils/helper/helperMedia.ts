import { formatDateToReadable } from "@/utils";
import type { 
  MediaSummary, 
  MediaType, 
  MovieSummary, 
  TvShowSummary,
  TvShowLastEpisodeToAir,
} from "@/@types";

import { isPersonSummary } from "./helperPerson";

export interface MediaSummaryData {
  mediaCategory: MediaType;
  mediaDetailPath: string;
  mediaImg: string | null;
  mediaTitle: string;
  mediaSubtitle: string | MediaSummary[];
  mediaOverview: string;
  mediaRating: number | 'N/A';
}

export const isMovieSummary = function(media: any): media is MovieSummary {
  return 'title' in media;
}

export const isTvShowSummary = function(media: any): media is TvShowSummary {
  return 'first_air_date' in media;
}

export const isTvShowLastEpisodeToAir = function(media: any): media is TvShowLastEpisodeToAir {
  return 'episode_number' in media && 'season_number' in media;
}

export const getMediaSummaryData = function(media: MediaSummary): MediaSummaryData {
  let mediaCategory: MediaType = 'movie';
  let mediaDetailPath: string = '';
  let mediaImg: string | null = null;
  let mediaTitle: string = 'No Title';
  let mediaSubtitle: string | MediaSummary[] = 'No Subtitle';
  let mediaOverview: string = 'No Overview Available';
  let mediaRating: number | 'N/A' = 'N/A';

  if(isMovieSummary(media)) {
    mediaCategory = 'movie';
    mediaDetailPath = `/movie/${media.id}`;
    mediaImg = media.poster_path;
    mediaTitle = media.title;
    mediaSubtitle = formatDateToReadable(media.release_date);
    mediaOverview = media.overview;
    mediaRating = media.vote_average !== 0 ? Math.round(media.vote_average * 10) : 'N/A';
  }
  
  else if(isTvShowSummary(media)) {
    mediaCategory = 'tv';
    mediaDetailPath = `/tv/${media.id}`;
    mediaImg = media.poster_path;
    mediaTitle = media.original_name;
    mediaSubtitle = formatDateToReadable(media.first_air_date);
    mediaOverview = media.overview;
    mediaRating = media.vote_average !== 0 ? Math.round(media.vote_average * 10) : 'N/A';
  }
    
  else if(isPersonSummary(media)) {
    mediaCategory = 'person';
    mediaDetailPath = `/person/${media.id}`;
    mediaImg = media.profile_path;
    mediaTitle = media.name;
    mediaSubtitle = displayMediaSubtitle(media.known_for);
    mediaOverview = '';
    mediaRating = 'N/A';
  }
  
  else if (isTvShowLastEpisodeToAir(media)) {
    mediaCategory = 'tv';
    mediaDetailPath = `/tv/${media.id}/season/${media.season_number}/episode/${media.episode_number}`;
    mediaImg = media.still_path;
    mediaTitle = media.name;
    mediaSubtitle = `S${media.season_number} E${media.episode_number} • ${formatDateToReadable(media.air_date)}`;
    mediaOverview = media.overview;
    mediaRating = media.vote_average !== 0 ? Math.round(media.vote_average * 10) : 'N/A';
  }

  return {
    mediaCategory,
    mediaDetailPath,
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

    if(isMovieSummary(item)){
      content = item.title;
    }

    if(isTvShowSummary(item)){
      content = item.original_name;
    }

    if(isTvShowLastEpisodeToAir(item)){
      content = item.name;
    }
    
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
  if ('episode_number' in media && 'season_number' in media)
    return 'tv';

  return 'unknown';
}