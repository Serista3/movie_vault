// --- IMPORTS ---
import { cn } from "@/utils/helper";
import { Heading } from "@/components/common";

// --- TYPE DEFINATIONS ---
interface ExplorerLayoutProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

// --- CONSTANTS ---
const BASE_CLASS = "explorer-layout max-w-300 mx-auto w-full flex flex-col gap-5 sm:gap-7 md:gap-9 pt-8 sm:pt-10 px-4 pb-14 sm:pb-16";

export default function ExplorerLayout({ title, className, children }: ExplorerLayoutProps) {
  return (
    <div className={cn(BASE_CLASS, className)}>
      {/* --- EXPLORER TITLE --- */}
      <Heading level={1}>{title}</Heading>

      {/* --- EXPLORER CONTENT --- */}
      {children}
    </div>
  )
}