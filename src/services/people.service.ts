import type { 
  MediaResponse, 
  PersonSummary, 
  PersonDetail, 
  PersonCombinedCredits, 
  PersonImages, 
  PersonMovieCredits, 
  PersonTvCredits,
  AppError
} from "../types"
import { tmdbFetch } from "../utils/api"

export const getPeople = async function(page: number): Promise<MediaResponse<PersonSummary> | AppError>{
  return tmdbFetch<MediaResponse<PersonSummary>>(`/person/popular?language=en-US&page=${page}`);
}

export const getPerson = async function (personId: number): Promise<PersonDetail | AppError>{
  return tmdbFetch<PersonDetail>(`/person/${personId}?language=en-US`);
}

export const getPersonCombinedCredits = async function(personId: number): Promise<PersonCombinedCredits | AppError>{
  return tmdbFetch<PersonCombinedCredits>(`/person/${personId}/combined_credits?language=en-US`);
}

export const getPersonImages = async function(personId: number): Promise<PersonImages | AppError>{
  return tmdbFetch<PersonImages>(`/person/${personId}/images`);
}

export const getPersonMovieCredits = async function(personId: number): Promise<PersonMovieCredits | AppError>{
  return tmdbFetch<PersonMovieCredits>(`/person/${personId}/movie_credits?language=en-US`);
}

export const getPersonTvCredits = async function(personId: number): Promise<PersonTvCredits | AppError>{
  return tmdbFetch<PersonTvCredits>(`/person/${personId}/tv_credits?language=en-US`);
}
