import { useState } from "react";
import { cn } from "../../utils/helperClassName";

import ImageSkeleton from "../skeleton/ImageSkeleton";
import noImage from '../../assets/images/no-image.jpg'
import { IMAGE_BASE_URL } from "../../services/config"

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

const BASE_CLASS = "image w-full h-full object-cover transition-all duration-300";

export default function Image({ className, src, alt = "Image", ...props }: ImageProps){
  const [isLoaded, setIsLoaded] = useState(false);
  const imageSrc = src ? `${IMAGE_BASE_URL}${src}` : noImage;

  return (
    <div className="container-image overflow-hidden rounded-[10px] relative shadow-xl">
      {!isLoaded && <ImageSkeleton />}
      <img 
        className={cn(BASE_CLASS, className, isLoaded ? 'opacity-100' : 'opacity-0 absolute top-0 left-0')} 
        onLoad={() => setIsLoaded(true)}
        src={imageSrc}
        alt={alt}
        loading="lazy"
        {...props}
      />
    </div>
  );
}
