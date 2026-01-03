import type { AppError } from '../../types/api';

interface ErrorMessageProps {
    error: AppError;
    className?: string;
}

export default function ErrorMessage({ error, className }: ErrorMessageProps){
    return (
        <div className={`w-full h-full bg-alert-light p-4 shadow-xl ${className}`}>
            <div className='font-semibold text-lg mb-2'>
                Error - {error.statusCode ? `Status Code: 4${error.statusCode}` : 'Unknown Status Code'}
            </div>
            <p className='font-light text-sm'>{error.message} Please try again later.</p>
        </div>
    )
}