// --- IMPORTS ---
import noImage from '@/assets/images/no-image.jpg'
import { cn } from "@/utils/helper";
import { ImageSkeleton } from "@/components/skeleton";
import { IMAGE_BASE_URL } from "@/services"
import { useState } from "react";

// --- TYPE DEFINATIONS ---
interface ImageProps {
  src: string | null;
  alt?: string;
  className?: string;
  containerClassName?: string;
}

// --- CONSTANTS ---
const BASE_CLASS = "image w-full h-full object-cover transition-all duration-300";

export default function Image({ className, containerClassName, src, alt = "Image" }: ImageProps){
  // --- LOADED STATE ---
  const [isLoaded, setIsLoaded] = useState(false);
  const imageSrc = src && src !== 'null' ? `${IMAGE_BASE_URL}${src}` : noImage;

  // --- COMPUTED CLASS NAMES ---
  const wrapperClass = cn(
    "container-image overflow-hidden w-full relative shadow-xl rounded-[10px]",
    containerClassName
  )

  const imageClass = cn(
    BASE_CLASS,
    className,
    isLoaded ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
  )

  return (
    <div className={wrapperClass}>
      {/* --- IMAGE SKELETON --- */}
      {!isLoaded && <ImageSkeleton />}

      {/* --- IMAGE CONTENT --- */}
      <img 
        className={imageClass}
        onLoad={() => setIsLoaded(true)}
        src={imageSrc}
        alt={alt}
        loading="lazy"
      />
    </div>
  );
}