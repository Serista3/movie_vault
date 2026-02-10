// --- IMPORTS ---
import { AVAILABILITY_OPTIONS, cn } from "@/utils/helper"
import { Paragraph } from "@/components/common"
import { Checkbox } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";

// --- TYPE DEFINATIONS ---
interface AvailabilityFilterProps {
  onChange: (value: string) => void; 
  selected: string[];
  className?: string;
}

export default function AvailabilityFilter({ onChange, selected, className }: AvailabilityFilterProps) {
  return (
    <div className={cn(className)}>
      {/* --- AVAILABILITY FILTER --- */}
      <Paragraph className="text-base sm:text-lg mb-4 sm:mb-6">Availabilities</Paragraph>
      
      {/* --- AVAILABILITY OPTIONS --- */}
      <div className="flex flex-col gap-4">
        {AVAILABILITY_OPTIONS.map(option => (
          <div key={option.value} className="flex items-center mb-1 sm:mb-2">
            <Checkbox.Root
              className="flex size-5 appearance-none items-center justify-center rounded 
                bg-tertiary-light outline-none hover:bg-tertiary-dark transition-all"
              id={option.value}
              onCheckedChange={() => onChange(option.value)}
              checked={selected.includes(option.value)}
            >
              <Checkbox.Indicator className="text-secondary-light">
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label
              className="pl-3.75 leading-none text-tertiary-light font-light text-base cursor-pointer"
              htmlFor={option.value}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}