import { useState } from "react";
import { useLoaderData, Link } from "react-router";
import { useModal } from "../store/ModalContext";
import { useSlider } from "../hooks/useSlider";

import type { MediaSummary, AppError } from "../types";
import { getMediaType } from "../utils/helperMedia";

import Slider from "./common/Slider";
import Button from "../components/common/Button";
import Image from "./common/Image";
import TrailerModal from "./TrailerModal";
import ErrorMessage from "./common/ErrorMessage";

export default function MediaSlider() {
  const { isOpen, openModal } = useModal();
  const data = useLoaderData<MediaSummary[] | AppError>()
  const [selectTrailer, setSelectTrailer] = useState<MediaSummary | null>(null);
  const { currentSlide, progress } = useSlider({ items: Array.isArray(data) ? data : [], isPaused: isOpen });

  const handleSelectTrailer = function(item: MediaSummary){
    setSelectTrailer(item);
    openModal();
  }

  return (
    <>
      {'isError' in data && (
        <ErrorMessage error={data} />
      )}
      {!('isError' in data) && data.length === 0 && (
        <div className="text-white-dark text-center py-20">
          No now playing movies found.
        </div>
      )}
      {!('isError' in data) && data.length > 0 && (
        <>
          <Slider progress={progress}>
            {data.map((item, index) => (
              <div key={item.id} className={`slider-item absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'}`}>
                <Image src={'backdrop_path' in item ? item.backdrop_path : null} alt={`Slide ${item.id}`} className="w-full min-h-50" />
                <div className="slider__backdrop w-full h-full absolute top-0 left-0 backdrop-brightness-50">
                  <div className="slider__content max-w-300 h-full px-4 py-6 flex flex-col justify-end mx-auto">
                    <h1 className="text-white-light text-3xl font-semibold line-clamp-1">
                      {'title' in item && item.title}
                    </h1>
                    <div className="slider__group-button flex justify-start gap-3 items-center mt-3">
                      <Button 
                        className="bg-back-light text-white-light hover:bg-back-dark rounded-[10px] px-4" 
                        onClick={() => handleSelectTrailer(item)}>
                        Watch Trailer
                      </Button>
                      <Link to={`/${getMediaType(item)}/${item.id}`}>
                        <Button className="bg-transparent text-white-light border-2 border-white-light hover:bg-white-light hover:text-back-light rounded-xl px-4">
                          more info
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <TrailerModal selectTrailer={selectTrailer} />
        </>
      )}
    </>
  );
}
