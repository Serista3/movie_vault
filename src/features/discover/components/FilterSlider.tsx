// --- IMPORTS ---
import { Slider } from "radix-ui";
import { cn } from "@/utils/helper";

// --- TYPE DEFINATONS ---
interface FilterSliderProps {
  value: number[];
  min: number;
  max: number;
  step: number;
  onValueChange: (value: number[]) => void;
}

export default function FilterSlider({ 
  value, 
  min, 
  max, 
  step, 
  onValueChange
}: FilterSliderProps) {
  return (
    <Slider.Root
      className="relative flex h-5 w-full touch-none select-none items-center"
      onValueChange={onValueChange}
      value={value}
      min={min}
      max={max}
      step={step}
      minStepsBetweenThumbs={1}
    >
      <Slider.Track className="relative h-0.5 grow rounded-full bg-gray-dark">
        <Slider.Range className="absolute h-full rounded-full bg-tertiary-light" />
      </Slider.Track>
      {value.map((val, index) => (
        <Slider.Thumb
          key={index}
          className="block size-4 rounded-[10px] bg-tertiary-light hover:bg-primary-light 
          focus:size-4.5 focus:bg-primary-light focus:outline-none cursor-grab active:cursor-grabbing"
          aria-label="Value"
        >
          {/* --- VALUE LABEL --- */}
          <div className={cn(
            "absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2",
            "bg-secondary-dark text-tertiary-light text-sm sm:text-base py-1 px-2 sm:py-1.5 sm:px-2.5 rounded",
            "min-w-8 text-center shadow-sm opacity-100 transition-opacity"
          )}>
            {val}
          </div>
        </Slider.Thumb>
      ))}
    </Slider.Root>
  )
}