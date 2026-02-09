// --- IMPORTS ---
import { Link } from "react-router"
import type { PersonMovieCredit, PersonTvCredit } from "@/@types";
import { cn, type ActingInfo } from "@/utils/helper";
import { Heading, Paragraph } from "@/components/common"

// --- TYPE DEFINATIONS ---
interface FilmographyProps {
  data: (ActingInfo | (PersonMovieCredit | PersonTvCredit))[];
  className?: string;
}

// --- CONSTANTS ---
const BASE_CLASS = "p-4 flex flex-col rounded-[10px] bg-tertiary-light text-secondary-light";

export default function Filmography({ data, className }: FilmographyProps) {
  return (
    <div className={cn(BASE_CLASS, className)}>
    {/* --- FILMOGRAPHY LIST --- */}
    {data.length > 0 && (
      data.map(acting => (
        <div 
          key={'id' in acting ? acting.id : new Date().getTime()} 
          className="py-3 not-last:border-b border-gray-light"
        >
          <div className="flex flex-col gap-2">
            {('credits' in acting ? acting.credits : [acting]).map(credit => (
              <div key={credit.credit_id} className="flex items-start gap-4">
                {/* --- CREDIT YEAR --- */}      
                <div className="flex items-center gap-4">
                  <Heading level={4} className="font-normal">
                    {'year' in acting && acting.year ? acting.year : '-'}
                  </Heading>
                  <hr className="w-10 h-0.5 text-gray-dark" />
                </div>

                {/* --- CREDIT INFO --- */}
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
    {data.length === 0 && (
      <div className="text-secondary-dark text-center py-20">
        No filmography data found.
      </div>
    )}
  </div>
  )
}