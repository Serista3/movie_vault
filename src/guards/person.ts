// --- IMPORTS ---
import type { 
    BasePerson, 
    PersonSummary, 
    PersonDetail, 
    PersonMovieCredit, 
    PersonTvCredit, 
    PersonCombinedCredits, 
    PersonImages,
    PersonMovieCredits,
    PersonTvCredits,
    BaseCredit,
    CreditCastMember,
    CreditCrewMember,
    AggregateCreditsCastMember,
    AggregateCreditsCrewMember,

} from '@/@types';

// --- TYPE GUARD FUNCTIONS ---
export const isBasePerson = function(data: unknown): data is BasePerson {
  if(typeof data !== 'object' || data === null) return false
  return 'gender' in data && 'known_for_department' in data && 'profile_path' in data;
}

export const isPersonSummary = function(data: unknown): data is PersonSummary {
  if(typeof data !== 'object' || data === null) return false
  return 'known_for' in data;
}

export const isPersonDetail = function(data: unknown): data is PersonDetail {
  if(typeof data !== 'object' || data === null) return false
  return 'biography' in data && 'birthday' in data;
}

export const isPersonMovieCredit = function(data: unknown): data is PersonMovieCredit {
  if(typeof data !== 'object' || data === null) return false
  return 'character' in data && 'credit_id' in data && 'department' in data;
}

export const isPersonPersonTvCredit = function(data: unknown): data is PersonTvCredit {
  if(typeof data !== 'object' || data === null) return false
  return 'credit_id' in data && 'job' in data;
}

export const isPersonCombinedCredits = function(data: unknown): data is PersonCombinedCredits {
  if(typeof data !== 'object' || data === null) return false
  return 'cast' in data && 'crew' in data;
}

export const isPersonImages = function(data: unknown): data is PersonImages {
  if(typeof data !== 'object' || data === null) return false
  return 'id' in data && 'profiles' in data;
}

export const isPersonMovieCredits = function(data: unknown): data is PersonMovieCredits {
  if(typeof data !== 'object' || data === null) return false
  return 'cast' in data && 'crew' in data;
}

export const isPersonTvCredits = function(data: unknown): data is PersonTvCredits {
  if(typeof data !== 'object' || data === null) return false
  return 'cast' in data && 'crew' in data;
}

export const isBaseCredit = function(data: unknown): data is BaseCredit {
  if(typeof data !== 'object' || data === null) return false
  return 'original_name' in data && 'credit_id' in data;
}

export const isCreditCastMember = function(data: unknown): data is CreditCastMember {
  if(typeof data !== 'object' || data === null) return false
  return 'cast_id' in data && 'character' in data;
}

export const isCreditCrewMember = function(data: unknown): data is CreditCrewMember {
  if(typeof data !== 'object' || data === null) return false
  return 'original_name' in data && 'department' in data && 'job' in data;
}

export const isAggregateCreditsCastMember = function(data: unknown): data is AggregateCreditsCastMember {
  if(typeof data !== 'object' || data === null) return false
  return 'roles' in data && 'total_episode_count' in data;
}

export const isAggregateCreditsCrewMember = function(data: unknown): data is AggregateCreditsCrewMember {
  if(typeof data !== 'object' || data === null) return false
  return 'jobs' in data && 'total_episode_count' in data;
}