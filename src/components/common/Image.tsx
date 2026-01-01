import { useState } from "react";

import ImageSkeleton from "../skeleton/ImageSkeleton";
import noImage from '../../assets/images/no-image.jpg'
import { IMAGE_BASE_URL } from "../../services/config"

interface ImageProps {
  src: string | null;
  alt: string;
  className?: string;
}

export default function Image({ className = 'w-full h-full', src, ...props }: ImageProps){
  const [isLoaded, setIsLoaded] = useState(false);
  const imageSrc = src ? `${IMAGE_BASE_URL}${src}` : noImage;

  return (
    <div className="container-image overflow-hidden rounded-[10px] relative">
      {!isLoaded && <ImageSkeleton />}
      <img 
        className={`image ${className} object-cover transition-all duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'}`} 
        onLoad={() => setIsLoaded(true)}
        src={imageSrc}
        loading="lazy"
        {...props}/>
    </div>
  );
}
