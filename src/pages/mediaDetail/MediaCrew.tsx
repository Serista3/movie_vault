import { Link } from 'react-router'

import type { MovieCredits, TvShowAggregateCredits, AppError } from '../../types'

import AsyncBoundary from '../../components/AsyncBoundary'
import ErrorMessage from '../../components/common/ErrorMessage'
import Paragraph from '../../components/common/Paragraph'

interface MediaCrewProps {
  mediaCredits: Promise<MovieCredits | TvShowAggregateCredits | AppError>;
}

export default function MediaCrew({ mediaCredits }: MediaCrewProps) {
  return (
    <AsyncBoundary resolve={mediaCredits} errorElement={<div>Error loading crew.</div>}>
      {creditsData => {
        if ('isError' in creditsData) 
          return <ErrorMessage error={creditsData} />
        
        const crewToDisplay = creditsData.crew.slice(0, 5);
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {crewToDisplay.map((crewMember) => (
              <div key={crewMember.credit_id}>
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