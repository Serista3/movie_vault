import { IMAGE_BASE_URL } from "../../services/config";
import type { MediaSummary } from "../../types";

interface SliderProps{
  items: MediaSummary[];
}

export default function Slider({ items }: SliderProps) {

  return (
    <div className="slider">
      {items.map((item, index) => (
        <div key={index} className="slider-item">
          <img 
            src={`${IMAGE_BASE_URL}/${'backdrop_path' in item ? item.backdrop_path : ''}`}
            alt={`Slide ${item.id}`}
          />
        </div>
      ))}
    </div>
  );
}
