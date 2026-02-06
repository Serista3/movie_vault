export default function LoadingSpin() {
  return (
    <div className="w-full h-full relative p-4 flex justify-center items-center gap-3 bg-secondary-light">
      <div className="w-10 h-10 bg-transparent border-4 border-gray-dark border-t-primary-light rounded-full animate-spin"></div>
      <div>Loading...</div>
    </div>
  )
}