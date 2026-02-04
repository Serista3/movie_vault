export const SORT_BASE_OPTIONS = [
  { label: 'Popularity Descending', value: 'popularity.desc' },
  { label: 'Popularity Ascending', value: 'popularity.asc' },
  { label: 'Rating Descending', value: 'vote_average.desc' },
  { label: 'Rating Ascending', value: 'vote_average.asc' },
];

export const SORT_MOVIE_OPTIONS = [ 
  ...SORT_BASE_OPTIONS,
  { label: 'Release Date Descending', value: 'release_date.desc' },
  { label: 'Release Date Ascending', value: 'release_date.asc' },
  { label: 'Title (Z-A)', value: 'original_title.desc' },
  { label: 'Title (A-Z)', value: 'original_title.asc' },
];

export const SORT_TV_OPTIONS = [
  ...SORT_BASE_OPTIONS,
  { label: 'First Air Date Descending', value: 'first_air_date.desc' },
  { label: 'First Air Date Ascending', value: 'first_air_date.asc' },
  { label: 'Name (Z-A)', value: 'original_name.desc' },
  { label: 'Name (A-Z)', value: 'original_name.asc' },
]

export const GENRES_OPTIONS = [
  { label: 'Action', value: 28 },
  { label: 'Adventure', value: 12 },
  { label: 'Animation', value: 16 },
  { label: 'Comedy', value: 35 },
  { label: 'Crime', value: 80 },
  { label: 'Documentary', value: 99 },
  { label: 'Drama', value: 18 },
  { label: 'Family', value: 10751 },
  { label: 'Fantasy', value: 14 },
  { label: 'History', value: 36 },
  { label: 'Horror', value: 27 },
  { label: 'Music', value: 10402 },
  { label: 'Mystery', value: 9648 },
  { label: 'Romance', value: 10749 },
  { label: 'Science Fiction', value: 878 },
  { label: 'TV Movie', value: 10770 },
  { label: 'Thriller', value: 53 },
  { label: 'War', value: 10752 },
  { label: 'Western', value: 37 },
];

export const SELECT_ADULT_OPTIONS = [
  { label: 'Include Adult', value: 'true' },
  { label: 'Exclude Adult', value: 'false' },
];