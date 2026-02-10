// --- IMPORTS ---
import { Link } from 'react-router'
import type { MovieCredits, TvShowAggregateCredits, AppError } from '@/@types'
import { isAppError } from '@/guards';
import { AsyncBoundary, ErrorMessage, Paragraph } from '@/components/common'

// --- TYPE DEFINATIONS ---
interface MediaCrewProps {
  mediaCredits: Promise<MovieCredits | TvShowAggregateCredits | AppError>;
}

export default function MediaCrew({ mediaCredits }: MediaCrewProps) {
  return (
    <AsyncBoundary resolve={mediaCredits} errorElement={<div>Error loading crew.</div>}>
      {creditsData => {
        if (isAppError(creditsData)) 
          return <ErrorMessage error={creditsData} />
        
        const crewToDisplay = creditsData.crew.slice(0, 5);
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {/* --- CREW LIST --- */}
            {crewToDisplay.map((crewMember) => (
              <div key={`${crewMember.credit_id}-${crewMember.name}`}>
                <Link 
                  to={`/person/${crewMember.id}`} 
                  className="underline hover:text-primary-light transition-all duration-300"
                >
                  {crewMember.name}
                </Link>
                <Paragraph>{crewMember.department}</Paragraph>
              </div>
            ))}
          </div>
        )
      }}
    </AsyncBoundary>
  )
}