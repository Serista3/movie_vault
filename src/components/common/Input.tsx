import { cn } from "../../utils/helperClassName"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    children?: React.ReactNode;
}

const DEFAULT_INPUT_CLASS = `px-3 py-2 w-full text-tertiary-light border border-primary-light bg-secondary-light
rounded-md focus:outline-none placeholder:font-light`

export default function Input({ id, className, children, ...props }: InputProps){
    return (
        <div className="relative w-full max-w-300 mx-auto">
            <input 
                id={id} 
                className={cn(DEFAULT_INPUT_CLASS, className)} 
                {...props} 
            />
            {children}
        </div>
    )
}