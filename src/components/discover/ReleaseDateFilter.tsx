// --- COMPONENTS ---
import Paragraph from "../common/Paragraph";
import Input from "../common/Input";

// --- TYPES ---
import type { MediaType } from "../../types";

// --- TYPES FOR RELEASE DATE FILTER PROPS ---
interface ReleaseDateFilterProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultGte?: string;
  defaultLte?: string;
  mediaType: MediaType;
}

export default function ReleaseDateFilter({ defaultGte, defaultLte, mediaType, ...props }: ReleaseDateFilterProps) {
  return (
    <div className="flex flex-col gap-4">
      <Paragraph className="text-base">Release Dates</Paragraph>

      {/* --- FROM RELEASE DATE FILTER --- */}
      <div className="flex items-center gap-4">
        <Paragraph className="text-base">from</Paragraph>
        <Input 
          type="date" 
          name={mediaType === 'movie' ? "primary_release_date.gte" : "first_air_date.gte"}
          className="border-gray-dark focus:border-gray-light"
          defaultValue={defaultGte}
          {...props}
        />
      </div>

      {/* --- TO RELEASE DATE FILTER --- */}
      <div className="flex items-center gap-4">
        <Paragraph className="text-base">to</Paragraph>
        <Input 
          type="date" 
          name={mediaType === 'movie' ? "primary_release_date.lte" : "first_air_date.lte"} 
          className="border-gray-dark focus:border-gray-light"
          defaultValue={defaultLte}
          {...props}
        />
      </div>
    </div>
  )
}