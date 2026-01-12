import type { AppError } from '../../types/api';
import { cn } from '../../utils/helperClassName';

interface ErrorMessageProps {
    error: AppError;
    className?: string;
}

const BASE_CLASS = "w-full h-auto bg-danger-light p-4 shadow-xl";

export default function ErrorMessage({ error, className }: ErrorMessageProps){
    return (
        <div className={cn(BASE_CLASS, className)}>
            <div className='font-semibold text-lg mb-2'>
                Error - {error.statusCode ? `Status Code: ${error.statusCode}` : 'Unknown Status Code'}
            </div>
            <p className='font-light text-sm'>{error.message} Please try again later.</p>
        </div>
    )
}
