import { useState } from "react";
import { useSearchParams } from "react-router";
import { useGenres } from "../../store/GenresContext";
import { useConfig } from "../../store/ConfigContext";

import type { MediaType } from "../../types";
import { cn } from "../../utils/helperClassName";
import { 
  SORT_MOVIE_OPTIONS,
  SORT_TV_OPTIONS,
  SELECT_ADULT_OPTIONS,
  USER_SCORE_OPTION,
  MINIMUN_VOTES_OPTION,
  RUNNING_TIME_OPTION,
} from "../../utils/helperDiscover";

import Accordion from "../common/Accordion"
import Button from "../common/Button"
import Select from "../common/Select"
import Input from "../common/Input";
import Paragraph from "../common/Paragraph";
import AvailabilityFilter from "./AvailabilityFilter";
import ReleaseDateFilter from "./ReleaseDateFilter";
import FilterSlider from "./FilterSlider";
import FilterChip from "./FilterChip";

interface DiscoverControlsProps {
  mediaType: MediaType;
  className?: string;
}

export default function DiscoverControls({ mediaType, className }: DiscoverControlsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAccordionOpen, setIsAccordionOpen] = useState({ sort: true, filters: false });
  
  const { movieGenres, tvGenres } = useGenres();
  const { languages } = useConfig();

  // INITIALIZE STATE FROM URL
  const initialGenres = searchParams.get("with_genres")?.split(",").map(Number).filter(n => n) || [];
  const initialAvailabilities = searchParams.get("with_watch_monetization_types")?.split(",") || [];
  
  // Sliders State
  const [userScore, setUserScore] = useState([
    Number(searchParams.get("vote_average.gte")) || 0, 
    Number(searchParams.get("vote_average.lte")) || 10
  ]);
  const [minVotes, setMinVotes] = useState([Number(searchParams.get("vote_count.gte")) || 0]);
  const [runtime, setRuntime] = useState([
    Number(searchParams.get("with_runtime.gte")) || 0, 
    Number(searchParams.get("with_runtime.lte")) || 400
  ]);

  // Selection State
  const [selectedGenres, setSelectedGenres] = useState<number[]>(initialGenres);
  const [selectedAvailabilities, setSelectedAvailabilities] = useState<string[]>(initialAvailabilities);

  // HANDLERS
  const toggleAccordion = (title: string) => {
    if (title === 'Sort') setIsAccordionOpen(prev => ({ ...prev, sort: !prev.sort }));
    if (title === 'Filters') setIsAccordionOpen(prev => ({ ...prev, filters: !prev.filters }));
  }

  const handleToggleGenre = (id: number) => {
    setSelectedGenres(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
  };

  const handleToggleAvailability = (value: string) => {
    setSelectedAvailabilities(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams(searchParams);

    // 1. จัดการ Native Inputs (Select, Date, Text)
    // ลบค่าเก่าออกก่อน แล้วใส่ค่าใหม่จาก Form
    ['sort_by', 'include_adult', 'language', 'primary_release_date.gte', 'primary_release_date.lte', 'with_keywords'].forEach(key => {
      params.delete(key);
    });

    for (const [key, value] of formData.entries()) {
      if (value && value.toString().trim() !== "") {
        params.set(key, value.toString());
      }
    }

    // 2. จัดการ Custom State (Genres, Availabilities, Sliders)
    if (selectedGenres.length > 0) params.set("with_genres", selectedGenres.join(","));
    else params.delete("with_genres");

    if (selectedAvailabilities.length > 0) params.set("with_watch_monetization_types", selectedAvailabilities.join(","));
    else params.delete("with_watch_monetization_types");

    // Sliders
    params.set("vote_average.gte", userScore[0].toString());
    params.set("vote_average.lte", userScore[1].toString());
    params.set("vote_count.gte", minVotes[0].toString());
    params.set("with_runtime.gte", runtime[0].toString());
    params.set("with_runtime.lte", runtime[1].toString());

    params.set("page", "1");
    console.log(params.toString());
    setSearchParams(params);
  };

  const sortOptions = mediaType === 'movie' ? SORT_MOVIE_OPTIONS : SORT_TV_OPTIONS;
  const genres = mediaType === 'movie' ? movieGenres : tvGenres;
  
  // แปลง Languages ให้ถูกต้อง
  const languageOption = languages
    .sort((a, b) => a.english_name.localeCompare(b.english_name))
    .map(lang => ({ label: lang.english_name, value: lang.iso_639_1 }));

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-2.5">
        <Accordion title="Sort" isOpen={isAccordionOpen.sort} onToggle={toggleAccordion}>
          <Paragraph className="text-base mb-2">Sort {mediaType === 'movie' ? 'Movies' : 'TV Shows'} by</Paragraph>
          <Select 
            name="sort_by" 
            items={sortOptions} 
            defaultValue={searchParams.get('sort_by') || sortOptions[0]?.value} 
          />
        </Accordion>

        <Accordion title="Filters" isOpen={isAccordionOpen.filters} onToggle={toggleAccordion}>
          <div className="flex flex-col gap-8">
            
            {/* Availabilities - ส่ง state ไปจัดการ */}
            <AvailabilityFilter 
              selected={selectedAvailabilities} 
              onChange={(val) => handleToggleAvailability(val)} 
            />

            {/* Dates - ใช้ defaultValue จาก URL */}
            <ReleaseDateFilter 
              defaultGte={searchParams.get('primary_release_date.gte') || ''}
              defaultLte={searchParams.get('primary_release_date.lte') || ''}
            />

            <div className="flex flex-col gap-4">
              <Paragraph className="text-base">Genres</Paragraph>
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

            <div className="flex flex-col gap-4">
              <Paragraph className="text-base">Adult Content</Paragraph>
              <Select 
                name="include_adult" 
                items={SELECT_ADULT_OPTIONS} 
                defaultValue={searchParams.get('include_adult') || 'false'} 
              />
            </div>

            <div className="flex flex-col gap-4">
              <Paragraph className="text-base">Languages</Paragraph>
              <div className="flex flex-wrap gap-2">
                {languageOption.length > 0 && (
                  <Select 
                    name="language" 
                    items={languageOption} 
                    defaultValue={searchParams.get('language') || ''} 
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Paragraph className="text-base">User Score</Paragraph>
              <FilterSlider 
                {...USER_SCORE_OPTION} 
                value={userScore}
                onValueChange={setUserScore}
              />
            </div>

            <div className="flex flex-col gap-4">
              <Paragraph className="text-base">Minimum User Votes</Paragraph>
              <FilterSlider 
                {...MINIMUN_VOTES_OPTION} 
                value={minVotes}
                onValueChange={setMinVotes}
              />
            </div>

            <div className="flex flex-col gap-4">
              <Paragraph className="text-base">Runtime</Paragraph>
              <FilterSlider 
                {...RUNNING_TIME_OPTION} 
                value={runtime}
                onValueChange={setRuntime}
              />
            </div>

            <div className="flex flex-col gap-4">
              <Paragraph className="text-base">Keywords</Paragraph>
              <Input 
                type="text" 
                name="with_keywords" 
                placeholder="Enter keywords..."
                className="border-gray-dark focus:border-gray-light"
                defaultValue={searchParams.get('with_keywords') || ''}
              />
            </div>

          </div>
        </Accordion>
      </div>
      <Button type="submit">Apply</Button>
    </form>
  )
}