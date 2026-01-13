import { cn } from "../utils/helperClassName";

interface MediaRatingProps {
  rating: number | string;
  size?: number;
  className?: string;
}

const calCuratedRatingColors = function(rating: number): string{
  switch(true){
    case rating >= 70:
      return 'text-green-500';
    case rating >= 50:
      return 'text-primary-light';
    case rating >= 30:
      return 'text-orange-400';
    default:
      return 'text-red-500';
  }
}

const BASE_CLASS = `font-semibold text-tertiary-light bg-secondary-light rounded-full flex justify-center items-center`

export default function MediaRating({ 
  rating,
  size = 52,
  className = ''
}: MediaRatingProps) {
  const strokeWidth = size / 20;
  const radius = 18 - (strokeWidth / 2);
  const circumference = 2 * Math.PI * radius;
  const offset = typeof rating === 'string' ? circumference : circumference - (rating / 100) * circumference;
  const ratingColor = calCuratedRatingColors(typeof rating === 'number' ? rating : 0);

  return (
    <div 
      style={{ width: size, height: size }} 
      className={cn(className, BASE_CLASS)}>
      {rating}%
      <svg className="-rotate-90 size-full absolute" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <circle 
          cx="18" 
          cy="18" 
          r={radius} 
          fill="none" 
          className={`stroke-current text-gray-dark`} 
          strokeWidth={strokeWidth} 
        />
        <circle 
          cx="18" 
          cy="18" 
          r={radius} 
          fill="none" 
          className={`stroke-current ${ratingColor}`} 
          strokeWidth={strokeWidth} 
          strokeDasharray={circumference}
          strokeDashoffset={offset} 
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
