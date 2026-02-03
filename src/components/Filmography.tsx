import { Link } from "react-router"
import type { PersonMovieCredit, PersonTvCredit } from "../types";
import type { ActingInfo } from "../utils/helperPerson";
import { cn } from "../utils/helperClassName";

import Heading from "./common/Heading"
import Paragraph from "./common/Paragraph"

interface FilmographyProps {
  data: (ActingInfo | (PersonMovieCredit | PersonTvCredit))[];
  className?: string;
}

const BASE_CLASS = "p-4 flex flex-col rounded-[10px] bg-tertiary-light text-secondary-light";

export default function Filmography({ data, className }: FilmographyProps) {
  return (
    <div className={cn(BASE_CLASS, className)}>
    {data.length > 0 && (
      data.map(acting => (
        <div 
          key={'id' in acting ? acting.id : Math.random() * new Date().getTime()} 
          className="py-3 not-last:border-b border-gray-light"
        >
          <div className="flex flex-col gap-2">
            {('credits' in acting ? acting.credits : [acting]).map(credit => (
              <div key={credit.credit_id} className="flex items-start gap-4">           
                <div className="flex items-center gap-4">
                  <Heading level={4} className="font-normal">
                    {'year' in acting && acting.year ? acting.year : '-'}
                  </Heading>
                  <hr className="w-10 h-0.5 text-gray-dark" />
                </div>
                <div>
                  <Link 
                    to={`/${'title' in credit ? 'movie' : 'tv'}/${credit.id}`}
                    className="hover:text-primary-dark transition-all font-semibold line-clamp-1"
                  >
                    { 'title' in credit ? credit.title : credit.name }
                  </Link>
                  <Paragraph>
                    as {
                      'character' in credit && credit.character 
                      ? credit.character : credit.job
                    }
                  </Paragraph>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))
    )}
  </div>
  )
}