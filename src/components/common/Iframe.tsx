import IframeSkeleton from "../skeleton/IframeSkeleton";

import { useState } from "react";

interface IframeProps {
  title?: string;
  src: string | null;
  aspectRatio?: string;
  className?: string;
}

export default function Iframe({ title = "Iframe", src, aspectRatio = "aspect-video", className = 'w-full h-full' }: IframeProps){
  const [isLoaded, setIsLoaded] = useState(false);
  const hasSrc = Boolean(src);

  return (
    <div className={`${aspectRatio} w-full relative`}>
      {hasSrc && !isLoaded && <IframeSkeleton />}
      {hasSrc && (
        <iframe 
          title={title}
          src={src ?? ''} 
          sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
          allowFullScreen
          className={`${isLoaded ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'} ${className} transition-all duration-300`}
          onLoad={() => setIsLoaded(true)}
        >
        </iframe>
      )}
      {!hasSrc && (
        <div className={`w-full h-full flex justify-center items-center bg-back-light text-gray-light ${className}`}>
          No trailer available
        </div>
      )}
    </div>
  )
}
