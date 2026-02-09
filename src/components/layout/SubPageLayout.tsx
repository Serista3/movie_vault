// --- IMPORTS ---
import { cn } from "@/utils/helper";

// --- TYPE DEFINATIONS ---
interface SubPageLayoutProps {
  headerSlot?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

// --- CONSTANTS ---
const BASE_CLASS = "max-w-300 mx-auto w-full flex flex-col gap-5 pt-8 px-4 pb-14";

export default function SubPageLayout({ className, headerSlot, children }: SubPageLayoutProps) {
  return (
    <>
      {/* --- SUBPAGE HEADER --- */}
      <div className="bg-gray-dark w-full">
        <div className="max-w-300 mx-auto flex items-center gap-4 px-4 py-6">
          {headerSlot}
        </div>
      </div>
      <div className={cn(BASE_CLASS, className)}>
        {/* --- SUBPAGE CONTENT --- */}
        {children}
      </div>
    </>
  )
}