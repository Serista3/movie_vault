import MediaCardSkeleton from "./MediaCardSkeleton";

export default function MediaListSkeleton({ amount = 10 }: { amount?: number }) {
  return (
    <div 
      className="flex items-start mx-auto gap-4 max-w-300 w-full overflow-x-auto py-4 snap-x [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-track]:bg-gray-dark [&::-webkit-scrollbar-thumb]:bg-primary-light [&::-webkit-scrollbar-thumb]:rounded-full">
      {Array.from({ length: amount }).map((_, index) => (
        <MediaCardSkeleton key={index} />
      ))}
    </div>
  )
}
