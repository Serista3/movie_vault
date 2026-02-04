// --- HELPERS ---
import { cn } from "../../utils/helperClassName";

// --- ICONS ---
import { FaCaretDown } from "react-icons/fa";

// --- TYPES FOR SELECT PROPS ---
interface OptionItem {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  items?: OptionItem[];
  className?: string;
}

const BASE_CLASS = `w-full bg-secondary-light text-tertiary-light py-2 px-3 rounded-[10px]
  border border-gray-dark hover:border-gray-light transition-all duration-300 cursor-pointer
  appearance-none`;

export default function Select({ items, className, ...props }: SelectProps) {
  return (
    <div className="w-full relative">
      {/* --- SELECT CONTROL --- */}
      <select {...props} className={cn(BASE_CLASS, className)}>

        {/* --- OPTIONS --- */}
        {items && items.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <FaCaretDown className="text-tertiary-light size-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}