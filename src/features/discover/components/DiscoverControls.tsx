// --- IMPORTS ---
import { useState } from "react";
import { useSearchParams } from "react-router";
import { useGenres, useConfig } from "@/store";
import type { MediaType } from "@/@types";
import { cn } from "@/utils/helper";
import * as option from "@/utils/helper";
import { Accordion, Button, Select, Paragraph } from "@/components/common"
import { AvailabilityFilter, ReleaseDateFilter, FilterSlider, FilterChip } from "@/features/discover";

// --- TYPE DEFINATIONS ---
interface DiscoverControlsProps {
  mediaType: MediaType;
  className?: string;
}

export default function DiscoverControls({ mediaType, className }: DiscoverControlsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAccordionOpen, setIsAccordionOpen] = useState({ sort: false, filters: false });
  
  // --- STORE DATA ---
  const { movieGenres, tvGenres } = useGenres();
  const { languages } = useConfig();

   // --- OPTIONS BASED ON MEDIA TYPE ---
  const sortOptions = mediaType === 'movie' ? option.SORT_MOVIE_OPTIONS : option.SORT_TV_OPTIONS;
  const genres = mediaType === 'movie' ? movieGenres : tvGenres;
  const fromReleaseDateParam = mediaType === 'movie' ? 'primary_release_date.gte' : 'first_air_date.gte';
  const toReleaseDateParam = mediaType === 'movie' ? 'primary_release_date.lte' : 'first_air_date.lte';

  // --- LANGUAGE OPTIONS ---
  const languageOptions = languages
    .sort((a, b) => a.english_name.localeCompare(b.english_name))
    .map(lang => ({ label: lang.english_name, value: lang.iso_639_1 }));
  
  // --- FILTER STATES ---
  const [userScore, setUserScore] = useState([
    Number(searchParams.get("vote_average.gte")) || option.USER_SCORE_OPTION.min, 
    Number(searchParams.get("vote_average.lte")) || option.USER_SCORE_OPTION.max
  ]);
  const [minVotes, setMinVotes] = useState([Number(searchParams.get("vote_count.gte")) || option.MINIMUN_VOTES_OPTION.min]);
  const [runtime, setRuntime] = useState([
    Number(searchParams.get("with_runtime.gte")) || option.RUNNING_TIME_OPTION.min, 
    Number(searchParams.get("with_runtime.lte")) || option.RUNNING_TIME_OPTION.max
  ]);

  const initialGenres = searchParams.get("with_genres")?.split(",").map(g => Number(g)) || [];
  const initialAvailabilities = searchParams.get("with_watch_monetization_types")?.split(",") || [];

  const [selectedGenres, setSelectedGenres] = useState<number[]>(initialGenres);
  const [selectedAvailabilities, setSelectedAvailabilities] = useState<string[]>(initialAvailabilities);

  // --- TOGGLE ACCORDION ---
  const toggleAccordion = (title: string) => {
    if (title === 'Sort') setIsAccordionOpen(prev => ({ ...prev, sort: !prev.sort }));
    if (title === 'Filters') setIsAccordionOpen(prev => ({ ...prev, filters: !prev.filters }));
  }

  // --- HANDLE TOGGLE GENRES & AVAILABILITY ---
  const handleToggleGenre = (id: number) => {
    setSelectedGenres(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
  };

  const handleToggleAvailability = (value: string) => {
    setSelectedAvailabilities(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  // --- HANDLE FORM SUBMIT ---
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams(searchParams);

    // --- REMOVE OLD PARAMS ---
    ['sort_by', 'include_adult', 'language', `${fromReleaseDateParam}`, 
    `${toReleaseDateParam}`].forEach(key => {
      params.delete(key);
    });

    // --- SET NEW PARAMS ---
    for (const [key, value] of formData.entries()) {
      if (value && value.toString().trim() !== "") {
        params.set(key, value.toString());
      }
    }

    // --- SET ARRAY PARAMS ---
    if (selectedGenres.length > 0) params.set("with_genres", selectedGenres.join(","));
    else params.delete("with_genres");

    if (selectedAvailabilities.length > 0) params.set("with_watch_monetization_types", selectedAvailabilities.join(","));
    else params.delete("with_watch_monetization_types");

    // --- SET SLIDER PARAMS ---
    params.set("vote_average.gte", userScore[0].toString());
    params.set("vote_average.lte", userScore[1].toString());
    params.set("vote_count.gte", minVotes[0].toString());
    params.set("with_runtime.gte", runtime[0].toString());
    params.set("with_runtime.lte", runtime[1].toString());

    params.set("page", "1");

    setSearchParams(params);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-2.5">
        {/* --- SORT --- */}
        <Accordion title="Sort" isOpen={isAccordionOpen.sort} onToggle={toggleAccordion}>
          <Paragraph className="text-base sm:text-lg mb-4">Sort {mediaType === 'movie' ? 'Movies' : 'TV Shows'} by</Paragraph>
          <Select 
            name="sort_by" 
            items={sortOptions} 
            defaultValue={searchParams.get('sort_by') || sortOptions[0]?.value} 
          />
        </Accordion>

        {/* --- FILTERS --- */}
        <Accordion title="Filters" isOpen={isAccordionOpen.filters} onToggle={toggleAccordion}>
          <div className="flex flex-col gap-8">
            
            {/* --- AVAILABILITY --- */}
            <AvailabilityFilter 
              selected={selectedAvailabilities} 
              onChange={handleToggleAvailability} 
            />

            {/* --- RELEASE DATES --- */}
            <ReleaseDateFilter 
              defaultGte={searchParams.get(fromReleaseDateParam) || ''}
              defaultLte={searchParams.get(toReleaseDateParam) || ''}
              mediaType={mediaType}
            />

            {/* --- GENRES --- */}
            <div className="flex flex-col gap-4">
              <Paragraph className="text-base sm:text-lg">Genres</Paragraph>
              <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                  <FilterChip 
                    key={genre.id} 
                    label={genre.name} 
                    isSelected={selectedGenres.includes(genre.id)}
                    onClick={() => handleToggleGenre(genre.id)}
                    className="border-gray-dark" 
                  />
                ))}
              </div>
            </div>
            
            {/* --- ADULT CONTENT --- */}
            <div className="flex flex-col gap-4">
              <Paragraph className="text-base sm:text-lg">Adult Content</Paragraph>
              <Select 
                name="include_adult" 
                items={option.SELECT_ADULT_OPTIONS} 
                defaultValue={searchParams.get('include_adult') || 'true'} 
              />
            </div>

            {/* --- LANGUAGES --- */}
            <div className="flex flex-col gap-4">
              <Paragraph className="text-base sm:text-lg">Languages</Paragraph>
              <div className="flex flex-wrap gap-2">
                {languageOptions.length > 0 && (
                  <Select 
                    name="language" 
                    items={languageOptions} 
                    defaultValue={searchParams.get('language') || navigator.language.split('-')[0]} 
                  />
                )}
              </div>
            </div>

            {/* --- USER SCORE SLIDER --- */}
            <div className="flex flex-col gap-4">
              <Paragraph className="text-base sm:text-lg">User Score</Paragraph>
              <FilterSlider 
                {...option.USER_SCORE_OPTION} 
                value={userScore}
                onValueChange={setUserScore}
              />
            </div>
            
            {/* --- MINIMUM VOTES SLIDER --- */}
            <div className="flex flex-col gap-4">
              <Paragraph className="text-base sm:text-lg">Minimum User Votes</Paragraph>
              <FilterSlider 
                {...option.MINIMUN_VOTES_OPTION} 
                value={minVotes}
                onValueChange={setMinVotes}
              />
            </div>

            {/* --- RUNNING TIME SLIDER --- */}
            <div className="flex flex-col gap-4">
              <Paragraph className="text-base sm:text-lg">Runtime</Paragraph>
              <FilterSlider 
                {...option.RUNNING_TIME_OPTION} 
                value={runtime}
                onValueChange={setRuntime}
              />
            </div>
          </div>
        </Accordion>
      </div>
      <Button type="submit">Apply</Button>
    </form>
  )
}