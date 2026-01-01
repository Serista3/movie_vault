interface MediaRatingProps {
  rating: number | string;
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  className?: string;
}

const primaryDefaultColor = 'text-main-light';
const secondaryDefaultColor = 'bg-back-light';
const tertiaryDefaultColor = 'text-gray-dark';

export default function MediaRating({ 
  rating,
  size = 52,
  primaryColor = primaryDefaultColor, 
  secondaryColor = secondaryDefaultColor, 
  tertiaryColor = tertiaryDefaultColor,
  className = ''
}: MediaRatingProps) {
  const strokeWidth = size / 20;
  const radius = 18 - (strokeWidth / 2);
  const circumference = 2 * Math.PI * radius;
  const offset = typeof rating === 'string' ? circumference : circumference - (rating / 100) * circumference;

  return (
    <div style={{ width: size, height: size }} className={`font-semibold ${className} ${primaryColor} ${secondaryColor} rounded-full flex justify-center items-center`}>
      {rating}%
      <svg className="-rotate-90 size-full absolute" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <circle 
          cx="18" 
          cy="18" 
          r={radius} 
          fill="none" 
          className={`stroke-current ${tertiaryColor}`} 
          strokeWidth={strokeWidth} 
        />
        <circle 
          cx="18" 
          cy="18" 
          r={radius} 
          fill="none" 
          className={`stroke-current ${primaryColor}`} 
          strokeWidth={strokeWidth} 
          strokeDasharray={circumference}
          strokeDashoffset={offset} 
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
