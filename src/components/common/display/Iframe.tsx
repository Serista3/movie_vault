// --- IMPORTS ---
import { cn } from "@/utils/helper";
import { LoadingSpin } from "@/components/skeleton";
import { useState } from "react";

// --- TYPE DEFINATIONS ---
interface IframeProps {
  title?: string;
  src: string | null;
  aspectRatio?: string;
  className?: string;
}

export default function Iframe({ title = "Iframe", src, aspectRatio = "aspect-video", className }: IframeProps){
  // --- LOADED STATE ---
  const [isLoaded, setIsLoaded] = useState(false);
  const hasSrc = Boolean(src);

  // --- COMPUTED CLASS NAMES ---
  const wrapperClass = cn(
    "w-full h-full relative",
    aspectRatio
  )

  const iframeClass = cn(
    isLoaded ? 'opacity-100' : 'opacity-0 absolute top-0 left-0',
    className, 
    "w-full h-full transition-all duration-300"
  )

  const noSrcClass = cn(
    "w-full h-full flex justify-center items-center bg-secondary-light text-gray-light",
    className
  )

  return (
    <div className={wrapperClass}>
      {/* --- IFRAME SKELETON --- */}
      {hasSrc && !isLoaded && <LoadingSpin />}

      {/* --- IFRAME CONTENT --- */}
      {hasSrc && (
        <iframe 
          title={title}
          src={src ?? ''} 
          sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
          allowFullScreen
          className={iframeClass}
          onLoad={() => setIsLoaded(true)}
        >
        </iframe>
      )}

      {/* --- NO IFRAME AVAILABLE MESSAGE --- */}
      {!hasSrc && (
        <div className={noSrcClass}>
          No iframe available
        </div>
      )}
    </div>
  )
}