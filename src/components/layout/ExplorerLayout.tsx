// --- HELPERS ---
import { cn } from "../../utils/helperClassName";

// --- COMPONENTS ---
import Heading from "../common/Heading";

// --- TYPES FOR EXPLORER LAYOUT PROPS ---
interface ExplorerLayoutProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const BASE_CLASS = "explorer-layout max-w-300 mx-auto w-full flex flex-col gap-5 pt-8 px-4 pb-14";

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