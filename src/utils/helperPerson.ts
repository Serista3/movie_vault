import type { 
  PersonCombinedCredits, 
  PersonMovieCredit, 
  PersonTvCredit, 
  PersonDetail,
  CreditCastMember,
  CreditCrewMember,
  AggregateCreditsCastMember,
  AggregateCreditsCrewMember,
  AppError,
  PersonSummary,
} from "../types";
import { formatDateToReadable } from "../utils/formatters";

export interface ActingInfo {
  id: number;
  year: number;
  credits: (PersonMovieCredit | PersonTvCredit)[];
}

export interface PersonInfo {
  title: string;
  value: string | number | string[];
}

export interface CrewInfo {
  department: string;
  credits: (PersonMovieCredit | PersonTvCredit)[];
}

export const findAllYears = function(credit: PersonMovieCredit | PersonTvCredit) {
  if('release_date' in credit && credit.release_date)
    return new Date(credit.release_date).getFullYear();
  if('first_air_date' in credit && credit.first_air_date)
    return new Date(credit.first_air_date).getFullYear();
}

export const getActingData = function(data: PersonDetail & PersonCombinedCredits | AppError): ActingInfo[] {
  const yearCredits = 'cast' in data && data.cast.map(findAllYears)
  const uniqueYears = yearCredits ? Array.from(new Set(yearCredits))
    .filter(year => year !== undefined)
    .sort((a, b) => (b || 0) - (a || 0)) : [];
  const actingData: ActingInfo[] = uniqueYears.map(year => {
    const credits = 'cast' in data

    if (credits) {
      const filteredCredits = data.cast.filter(credit => credit && findAllYears(credit) === year)
      return {
        id: year,
        year,
        credits: filteredCredits
      }
    }

    return {
      id: Math.random() * new Date().getTime(),
      year,
      credits: []
    }
  })

  return actingData;
}

const REQUIRED_PERSON_INFO = [
  'Known For',
  'Known Credits',
  'Gender',
  'Birthday',
  'Place of Birth',
  'Also Known As'
];

export const getPersonInfo = function(data: PersonDetail & PersonCombinedCredits | AppError): PersonInfo[] {
  const newData = REQUIRED_PERSON_INFO.map(infoTitle => {
    switch(infoTitle) {
      case 'Known For':
        return {
          title: infoTitle,
          value: 'known_for_department' in data && data.known_for_department 
            ? data.known_for_department : 'N/A'
        };
      case 'Known Credits':
        return {
          title: infoTitle,
          value: 'also_known_as' in data && data.cast.filter(c => findAllYears(c) !== undefined).length > 0 
            ? data.cast.length : 'N/A'
        };
      case 'Gender':
        return {
          title: infoTitle,
          value: 'gender' in data && data.gender === 1 ? 'Female' : 'Male'
        };
      case 'Birthday':  
        return {
          title: infoTitle,
          value: 'birthday' in data ? `${formatDateToReadable(data.birthday)} 
            (${new Date().getFullYear() - new Date(data.birthday).getFullYear()} years old)` : 'N/A'
        };
      case 'Place of Birth':
        return {
          title: infoTitle,
          value: 'place_of_birth' in data && data.place_of_birth 
            ? data.place_of_birth : 'N/A'
        };
      case 'Also Known As':
        return {
          title: infoTitle,
          value: 'also_known_as' in data && data.also_known_as.length > 0 
            ? data.also_known_as.join(', ') : 'N/A'
        };
      default:
        return {
          title: infoTitle,
          value: 'N/A'
        };
    }
  });
  return newData;
}

export const getCrewData = function(data: PersonDetail & PersonCombinedCredits | AppError): CrewInfo[] {
  if(!('crew' in data)) return [];

  const crewDepartment = data.crew.map(credit => credit.department)
  const uniqueDepartments = Array.from(new Set(crewDepartment))
    .filter(dept => dept !== undefined)
  
  const crewData: CrewInfo[] = uniqueDepartments.map(dept => {
    const credits: (PersonMovieCredit | PersonTvCredit)[] = data.crew.map(credit => {
      if(credit.department === dept)
        return {
          ...credit,
          year: findAllYears(credit)
        };

      return credit;
    })

    return {
      department: dept,
      credits: credits.filter(credit => credit.department === dept).sort((a, b) => {
        const yearA = findAllYears(a) || 0;
        const yearB = findAllYears(b) || 0;
        return yearB - yearA;
      })
    }
      
  })

  return crewData;
}

export interface PersonSummaryData {
  personImg: string | null;
  personName: string;
  personSubtitle: string;
}

function isAggregateCast(p: any): p is AggregateCreditsCastMember {
  return 'roles' in p && Array.isArray(p.roles);
}

function isAggregateCrew(p: any): p is AggregateCreditsCrewMember {
  return 'jobs' in p && Array.isArray(p.jobs);
}

function isCast(p: any): p is CreditCastMember {
  return 'character' in p;
}

function isCrew(p: any): p is CreditCrewMember {
  return 'job' in p;
}

function isPersonSummary(p: any): p is PersonSummary {
  return 'known_for' in p;
}

export const getPersonSummaryData = function(person: PersonSummary | CreditCastMember 
  | CreditCrewMember | AggregateCreditsCastMember | AggregateCreditsCrewMember): PersonSummaryData {
  const personImg = person.profile_path;
  const personName = person.name;
  let personSubtitle = 'no subtitle';

  if(isPersonSummary(person)) {
    personSubtitle = person.known_for.map(item => 'title' in item ? item.title : item.original_name).join(', ');
  }

  if(isAggregateCast(person)) {
    const roles = person.roles[0]?.character || 'No Role Info';
    personSubtitle = roles
  }

  if(isAggregateCrew(person)) {
    const jobs = person.jobs[0]?.job || 'No Job Info';
    personSubtitle = jobs;
  }

  if(isCast(person)) {
    personSubtitle = person.character;
  }

  if(isCrew(person)) {
    personSubtitle = person.job;
  }

  return {
    personImg,
    personName,
    personSubtitle,
  }
}