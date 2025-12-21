import type { Media, MediaImage } from "./media";
import type { MovieSummary } from "./movie";
import type { TvShowSummary } from "./tvShow";

export type KnownForItem = MovieSummary | TvShowSummary;

export interface BasePerson extends Media {
    gender: number;
    known_for_department: string;
    name: string;
    profile_path: string | null;
}

export interface PersonSummary extends BasePerson {
    known_for: KnownForItem[];
}

export interface PersonDetail extends PersonSummary {
    also_known_as: string[],
    biography: string,
    birthday: string,
    deathday: string | null,
    homepage: string | null,
    imdb_id: string,
    place_of_birth: string | null,
}

export interface PersonMovieCredit extends MovieSummary {
    character: string;
    credit_id: string;
    order: number;
}

export interface PersonTvCredit extends TvShowSummary {
    credit_id: string;
    department: string;
    job: string;
}

export interface PersonCombinedCredits {
    id: number;
    cast: PersonMovieCredit[] | PersonTvCredit[];
}

export interface PersonImages {
    id: number;
    profiles: MediaImage[];
}

export interface PersonMovieCredits {
    id: number;
    cast: PersonMovieCredit[];
}

export interface PersonTvCredits {
    id: number;
    cast: PersonTvCredit[];
}

export interface BaseCredit extends BasePerson {
    original_name: string;
    credit_id: string;
}

export interface CreditCastMember extends BaseCredit {
    cast_id: number;
    character: string;
    order: number;
}

export interface CreditCrewMember extends BaseCredit {
    original_name: string;
    department: string;
    job: string;
}
