import { useState, useEffect } from "react";

import { IMAGE_BASE_URL } from "../../services/config";
import type { MediaSummary } from "../../types";

import { useModal } from "../../store/ModalContext";

import ProgressBar from "./progressbar";
import Button from "./Button";
import Modal from "./Modal";

const TIMEOUT_DURATION = 15000;
const UPDATE_INTERVAL = 10;

interface SliderProps{
  items: MediaSummary[];
}

export default function Slider({ items }: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectTrailer, setSelectTrailer] = useState<MediaSummary | null>(null);

  const { openModal } = useModal();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress(prev => {
        if(prev >= 100){
          setCurrentSlide(prevCurSlide => (prevCurSlide + 1) % items.length);
          return 0;
        }

        return prev + (UPDATE_INTERVAL / TIMEOUT_DURATION) * 100;
      })
    }, UPDATE_INTERVAL)

    return () => clearInterval(intervalId);
  }, [items.length, currentSlide]);

  const handleSelectTrailer = function(item: MediaSummary){
    setSelectTrailer(item);
    openModal();
  }

  return (
    <div className="slider min-h-50 w-full overflow-hidden relative">
      {items.map((item, index) => (
        <div key={item.id} className={`slider-item absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'}`}>
          <img 
            src={`${IMAGE_BASE_URL}/${'backdrop_path' in item ? item.backdrop_path : ''}`}
            alt={`Slide ${item.id}`}
            className="slider__image w-full h-full object-cover"
          />
          <div className="slider__backdrop w-full h-full absolute top-0 left-0 backdrop-brightness-50">
            <div className="slider__content max-w-300 h-full px-4 py-6 flex flex-col justify-end mx-auto">
              <h1 className="text-white-light text-3xl font-semibold">{'title' in item && item.title}</h1>
              <div className="slider__group-button flex justify-start gap-3 items-center mt-3">
                <Button className="bg-back-light text-white-light hover:bg-back-dark rounded-xl px-4 py-2" onClick={() => handleSelectTrailer(item)}>Watch Trailer</Button>
                <Button className="bg-transparent text-white-light border-2 border-white-light hover:bg-back-dark rounded-xl px-4">more info</Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Modal>
        <iframe
          key={selectTrailer ? selectTrailer.id : 'no-trailer'}
          src={`https://www.youtube.com/embed/${selectTrailer && 'trailerKey' in selectTrailer ? selectTrailer.trailerKey : ''}`} 
          allowFullScreen
          className="w-full"
          >
        </iframe>
      </Modal>
      <ProgressBar progress={progress} />
    </div>
  );
}
