// --- IMPORTS ---
import { cn } from "@/utils/helper";
import { Paragraph } from "@/components/common/";

// --- TYPE DEFINATIONS ---
interface WrapperInputProps {
    id: string;
    label?: string;
    error?: string;
    className?: string;
    children?: React.ReactNode;
}

// --- CONSTANTS ---
const DEFAULT_WRAPPER_CLASS = "flex flex-col gap-1 relative"
const DEFAULT_LABEL_CLASS = "font-medium text-gray-700"

export default function WrapperInput({ id, label, error, className, children }: WrapperInputProps){
    return (
        <div className={cn(DEFAULT_WRAPPER_CLASS, className)}>
            {label && <label className={cn(DEFAULT_LABEL_CLASS)} htmlFor={id}>
                {label}
            </label>}
            {children}

            {/* --- ERROR MESSAGE --- */}
            {error && <Paragraph className="text-danger-light">{error}</Paragraph>}
        </div>
    )
}