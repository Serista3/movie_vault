import Paragraph from "../common/Paragraph";
import Input from "../common/Input";

interface ReleaseDateFilterProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultGte?: string;
  defaultLte?: string;
}

export default function ReleaseDateFilter({ defaultGte, defaultLte, ...props }: ReleaseDateFilterProps) {
  return (
    <div className="flex flex-col gap-4">
      <Paragraph className="text-base">Release Dates</Paragraph>
      <div className="flex items-center gap-4">
        <Paragraph className="text-base">from</Paragraph>
        <Input 
          type="date" 
          name="primary_release_date.gte" 
          className="border-gray-dark focus:border-gray-light"
          defaultValue={defaultGte}
          {...props}
        />
      </div>
      <div className="flex items-center gap-4">
        <Paragraph className="text-base">to</Paragraph>
        <Input 
          type="date" 
          name="primary_release_date.lte" 
          className="border-gray-dark focus:border-gray-light"
          defaultValue={defaultLte}
          {...props}
        />
      </div>
    </div>
  )
}