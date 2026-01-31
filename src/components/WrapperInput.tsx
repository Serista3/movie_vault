import { cn } from "../utils/helperClassName";

interface WrapperInputProps {
    id: string;
    label?: string;
    error?: string;
    className?: string;
    children?: React.ReactNode;
}

const DEFAULT_WRAPPER_CLASS = "flex flex-col gap-1 relative"
const DEFAULT_LABEL_CLASS = "font-medium text-gray-700"

export default function WrapperInput({ id, label, error, className, children }: WrapperInputProps){
    return (
    <div className={cn(DEFAULT_WRAPPER_CLASS, className)}>
        {label && <label className={cn(DEFAULT_LABEL_CLASS)} htmlFor={id}>
            {label}
        </label>}
        {children}
        {error && <p className="text-sm text-danger-light">{error}</p>}
    </div>
    )
}