// --- RADIX COMPONENTS ---
import { Slider } from "radix-ui";

// --- TYPES FOR FILTER SLIDER PROPS ---
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
    >
      <Slider.Track className="relative h-0.5 grow rounded-full bg-gray-dark">
        <Slider.Range className="absolute h-full rounded-full bg-tertiary-light" />
      </Slider.Track>
      {value.map((_, index) => (
        <Slider.Thumb
          key={index}
          className="block size-4 rounded-[10px] bg-tertiary-light hover:bg-primary-light 
          focus:size-4.5 focus:bg-primary-light focus:outline-none cursor-grab active:cursor-grabbing"
          aria-label="Value"
        />
      ))}
    </Slider.Root>
  )
}