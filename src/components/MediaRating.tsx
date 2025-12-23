interface MediaRatingProps {
  rating: number;
  className?: string;
}

export default function MediaRating({ rating, className }: MediaRatingProps) {
  return (
    <div className={`font-semibold text-main-light size-13 absolute top-0 right-0 z-4 bg-back-light rounded-full flex justify-center items-center ${className}`}>
      {rating}%
      <svg className="rotate-90 size-full absolute" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="17" fill="none" className="stroke-current text-gray-dark" strokeWidth="2"></circle>
        <circle cx="18" cy="18" r="17" fill="none" className="stroke-current text-main-light" strokeWidth="2" strokeDasharray="100" strokeDashoffset={100 - rating} strokeLinecap="round"></circle>
      </svg>
    </div>
  )
}