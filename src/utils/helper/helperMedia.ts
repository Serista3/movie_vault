// --- IMPORTS ---
import { formatDateToReadable } from "@/utils";
import type { MediaSummary, MediaType, } from "@/@types";
import { 
  isMovieSummary, 
  isTvShowSummary, 
  isPersonSummary, 
  isBasePerson, 
  isTvShowLastEpisodeToAir,
  isTvShowSeason,
  isEpisode,
} from "@/guards";

// --- TYPE DEFINATIONS ---
export interface MediaSummaryData {
  mediaCategory: MediaType;
  mediaDetailPath: string | null;
  mediaImg: string | null;
  mediaTitle: string;
  mediaSubtitle: string | MediaSummary[];
  mediaOverview: string;
  mediaRating: number | 'N/A';
}

// --- HELPERS ---
export const getMediaSummaryData = function(media: MediaSummary): MediaSummaryData {
  let mediaCategory: MediaType = 'movie';
  let mediaDetailPath: string | null = null;
  let mediaImg: string | null = null;
  let mediaTitle: string = 'No Title';
  let mediaSubtitle: string | MediaSummary[] = 'No Subtitle';
  let mediaOverview: string = 'No Overview Available';
  let mediaRating: number | 'N/A' = 'N/A';

  const pathName = location.pathname

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

  else if (isEpisode(media)) {
    mediaCategory = 'tv';
    mediaDetailPath = null;
    mediaImg = media.still_path;
    mediaTitle = `${media.episode_number}. ${media.name}`;
    mediaSubtitle = `${formatDateToReadable(media.air_date)} 
      ${media.runtime >= 60 || media.runtime % 60 > 0 ? '•': ''} 
      ${media.runtime >= 60 ? `${Math.floor(media.runtime / 60)}h` : ''} 
      ${media.runtime % 60 > 0 ? `${media.runtime}m` : ''}
    `;
    mediaOverview = media.overview;
    mediaRating = media.vote_average !== 0 ? Math.round(media.vote_average * 10) : 'N/A';
  }

  else if (isTvShowSeason(media)) {
    mediaCategory = 'tv';
    mediaDetailPath = `${pathName.includes('seasons') ? location.pathname.replace('seasons', 'season') : location.pathname + '/season' }/${media.season_number}`;
    mediaImg = media.poster_path;
    mediaTitle = media.name;
    mediaSubtitle = `${formatDateToReadable(media.air_date)} • Episodes ${media.episode_count}`;
    mediaOverview = media.overview;
    mediaRating = media.vote_average !== 0 ? Math.round(media.vote_average * 10) : 'N/A';
  }
  
  else if (isTvShowLastEpisodeToAir(media)) {
    mediaCategory = 'tv';
    mediaDetailPath = `/tv/${media.id}/seasons/${media.season_number}`;
    mediaImg = media.still_path;
    mediaTitle = `${media.name} ${media.season_number}`;
    mediaSubtitle = `${formatDateToReadable(media.air_date)} • Episodes ${media.episode_number}`;
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

    if(isTvShowSeason(item)){
      content = item.name
    }

    if(isEpisode(item)){
      content = item.name
    }
    
    return content;
  })
  
  return newSubtitle.join(', ');
}

export function getMediaType(media: MediaSummary): string {
  if (isMovieSummary(media)) 
    return 'movie';
  if (isTvShowSummary(media))
    return 'tv';
  if (isBasePerson(media))
    return 'person';
  if (isTvShowLastEpisodeToAir(media))
    return 'tv';
  if (isTvShowSeason(media))
    return 'tv'
  if (isEpisode(media))
    return 'tv'

  return 'unknown';
}