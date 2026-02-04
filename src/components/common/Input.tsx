// --- HELPERS ---
import { cn } from "../../utils/helperClassName"

// --- TYPES FOR INPUT PROPS ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    children?: React.ReactNode;
}

const DEFAULT_INPUT_CLASS = `px-3 py-2 w-full text-tertiary-light border border-primary-light bg-secondary-light
rounded-md focus:outline-none placeholder:font-light`

export default function Input({ className, children, ...props }: InputProps){
    // --- COMPUTED CLASS NAMES ---
    const inputClass = cn(DEFAULT_INPUT_CLASS, className);

    return (
        <div className="relative w-full max-w-300 mx-auto">
            <input className={inputClass} {...props} />
            {children}
        </div>
    )
}