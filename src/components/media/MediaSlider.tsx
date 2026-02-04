// --- HOOKS & CUSTOM HOOKS ---
import { useState } from "react";
import { useLoaderData, Link } from "react-router";
import { useModal } from "../../store/ModalContext";
import { useSlider } from "../../hooks/useSlider";

// --- TYPES & HELPERS ---
import type { MediaSummary, AppError } from "../../types";
import { getMediaType } from "../../utils/helperMedia";
import { cn } from "../../utils/helperClassName";

// --- COMPONENTS ---
import Slider from "../common/Slider";
import Button from "../../components/common/Button";
import Image from "../common/Image";
import TrailerModal from "../TrailerModal";
import ErrorMessage from "../common/ErrorMessage";
import Heading from "../common/Heading";

export default function MediaSlider() {
  // --- MODAL CONTEXT & LOADER DATA ---
  const { isOpen, openModal } = useModal();
  const data = useLoaderData<MediaSummary[] | AppError>()

  // --- SLIDER STATE ---
  const [selectTrailer, setSelectTrailer] = useState<MediaSummary | null>(null);
  const { currentSlide, progress } = useSlider({ items: Array.isArray(data) ? data : [], isPaused: isOpen });

  // --- SELECTED TRAILER ---
  const handleSelectTrailer = function(item: MediaSummary){
    setSelectTrailer(item);
    openModal();
  }

  return (
    <>
      {/* --- ERROR MESSAGE --- */}
      {'isError' in data && (
        <ErrorMessage error={data} />
      )}

      {/* --- NO DATA MESSAGE --- */}
      {!('isError' in data) && data.length === 0 && (
        <div className="text-tertiary-dark text-center py-20">
          No now playing movies found.
        </div>
      )}

      {/* --- MEDIA SLIDES --- */}
      {!('isError' in data) && data.length > 0 && (
        <>

          {/* --- SLIDER --- */}
          <Slider progress={progress}>
            {data.map((item, index) => (
              <div 
                key={item.id} 
                className={cn(
                  `absolute top-0 left-0 w-full h-full transition-opacity 
                  duration-1000 ease-in-out opacity-0 z-0 pointer-events-none`,
                  {'opacity-100 z-10 pointer-events-auto': index === currentSlide}
                )}
              >
                <Image 
                  src={'backdrop_path' in item ? item.backdrop_path : null} 
                  alt={`Slide ${item.id}`} 
                  containerClassName="h-full absolute top-0 left-0 rounded-none" 
                />
                <div className="w-full h-full absolute top-0 left-0 backdrop-brightness-50">
                  <div className="max-w-300 h-full px-4 py-6 flex flex-col justify-end mx-auto">
                    <Heading level={3} className="line-clamp-1">
                      {'title' in item && item.title}
                    </Heading>
                    <div className="flex justify-start gap-3 items-center mt-3">
                      <Button variant="secondary" onClick={() => handleSelectTrailer(item)}>
                        Watch Trailer
                      </Button>
                      <Link to={`/${getMediaType(item)}/${item.id}`}>
                        <Button 
                          variant="secondary" 
                          className="border-tertiary-dark bg-transparent hover:bg-tertiary-light hover:text-secondary-light"
                        >
                          more info
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* --- TRAILER MODAL --- */}
          <TrailerModal selectTrailer={selectTrailer} />
        </>
      )}
    </>
  );
}