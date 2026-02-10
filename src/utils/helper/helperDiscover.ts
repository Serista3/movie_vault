// --- IMPORTS ---
import type { SortBy, Monetization } from "@/@types";

// --- TYPE DEFINATIONS ---
interface SortOption {
  label: string;
  value: SortBy;
}

// --- HELPERS ---
export const SORT_BASE_OPTIONS: SortOption[] = [
  { label: 'Popularity Descending', value: 'popularity.desc' },
  { label: 'Popularity Ascending', value: 'popularity.asc' },
  { label: 'Rating Descending', value: 'vote_average.desc' },
  { label: 'Rating Ascending', value: 'vote_average.asc' },
];

export const SORT_MOVIE_OPTIONS: SortOption[] = [
  ...SORT_BASE_OPTIONS,
  { label: 'Release Date Descending', value: 'primary_release_date.desc' },
  { label: 'Release Date Ascending', value: 'primary_release_date.asc' },
  { label: 'Title (Z-A)', value: 'title.desc' },
  { label: 'Title (A-Z)', value: 'title.asc' },
];

export const SORT_TV_OPTIONS: SortOption[] = [
  ...SORT_BASE_OPTIONS,
  { label: 'First Air Date Descending', value: 'first_air_date.desc' },
  { label: 'First Air Date Ascending', value: 'first_air_date.asc' },
  { label: 'Name (Z-A)', value: 'name.desc' },
  { label: 'Name (A-Z)', value: 'name.asc' },
]

export const SELECT_ADULT_OPTIONS = [
  { label: 'Include Adult', value: 'true' },
  { label: 'Exclude Adult', value: 'false' },
];

export const AVAILABILITY_OPTIONS: { label: string; value: Monetization }[] = [
  { label: 'Stream', value: 'flatrate' },
  { label: 'Free', value: 'free' },
  { label: 'Ads', value: 'ads' },
  { label: 'Rent', value: 'rent' },
  { label: 'Buy', value: 'buy' },
];

export const USER_SCORE_OPTION = { 
  value: [0, 10],
  min: 0, 
  max: 10, 
  step: 1 
};

export const MINIMUN_VOTES_OPTION = { 
  value: [0], 
  min: 0, 
  max: 500, 
  step: 50 
};

export const RUNNING_TIME_OPTION = { 
  value: [0, 400],
  min: 0, 
  max: 400, 
  step: 15 
};