export default function MediaCardSkeleton() {
  return (
    <div className="w-40 h-65 bg-gray-dark rounded-[10px] overflow-hidden animate-pulse relative flex-none p-4 flex flex-col gap-4">
      <div className="w-full h-44 bg-gray-light rounded-[10px]"></div>
      <div className="flex flex-col gap-2">
        <div className="w-full h-3 bg-gray-light rounded"></div>
        <div className="w-3/4 h-2 bg-gray-light rounded"></div>
      </div>
    </div>
  )
}