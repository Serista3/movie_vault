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
    department: string;
    job: string;
}

export interface PersonTvCredit extends TvShowSummary {
    character: string;
    credit_id: string;
    department: string;
    job: string;
}

export interface PersonCombinedCredits {
    id: number;
    cast: PersonMovieCredit[] | PersonTvCredit[];
    crew: PersonMovieCredit[] | PersonTvCredit[];
}

export interface PersonImages {
    id: number;
    profiles: MediaImage[];
}

export interface PersonMovieCredits {
    id: number;
    cast: PersonMovieCredit[];
    crew: PersonMovieCredit[];
}

export interface PersonTvCredits {
    id: number;
    cast: PersonTvCredit[];
    crew: PersonTvCredit[];
}

export interface BaseCredit extends PersonSummary {
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

export interface AggregateCreditsCastMember extends BaseCredit {
    original_name: string;
    roles: {
        credit_id: string;
        character: string;
        episode_count: number;
    }[];
    total_episode_count: number;
    order?: number;
}

export interface AggregateCreditsCrewMember extends BaseCredit {
    original_name: string;
    jobs: {
        credit_id: string;
        job: string;
        episode_count: number;
    }[];
    department: string;
    total_episode_count: number;
}
