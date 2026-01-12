import IframeSkeleton from "../skeleton/IframeSkeleton";

import { useState } from "react";
import { cn } from "../../utils/helperClassName";

interface IframeProps {
  title?: string;
  src?: string;
  aspectRatio?: string;
  className?: string;
}

export default function Iframe({ title = "Iframe", src, aspectRatio = "aspect-video", className }: IframeProps){
  const [isLoaded, setIsLoaded] = useState(false);
  const hasSrc = Boolean(src);

  return (
    <div className={cn(aspectRatio, "w-full relative")}>
      {hasSrc && !isLoaded && <IframeSkeleton />}
      {hasSrc && (
        <iframe 
          title={title}
          src={src ?? ''} 
          sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
          allowFullScreen
          className={cn(isLoaded ? 'opacity-100' : 'opacity-0 absolute top-0 left-0', className, "w-full h-full transition-all duration-300")}
          onLoad={() => setIsLoaded(true)}
        >
        </iframe>
      )}
      {!hasSrc && (
        <div className={cn("w-full h-full flex justify-center items-center bg-secondary-light text-gray-light", className)}>
          No iframe available
        </div>
      )}
    </div>
  )
}
