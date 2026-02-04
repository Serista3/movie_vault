// --- TYPES  ---
import type { AppError } from '../../types/api';

// --- HELPERS ---
import { cn } from '../../utils/helperClassName';

// --- COMPONENTS ---
import Paragraph from './Paragraph';

// --- TYPES FOR ERROR MESSAGE PROPS ---
interface ErrorMessageProps {
    error: AppError;
    className?: string;
}

const BASE_CLASS = "w-full h-auto bg-danger-light p-4 shadow-xl";

export default function ErrorMessage({ error, className }: ErrorMessageProps){
    // --- COMPUTED CLASS NAMES ---
    const errorClass = cn(BASE_CLASS, className);

    // --- COMPUTED RENDERED VALUES ---
    const errorHeader = error.statusCode ? `Error - Status Code: ${error.statusCode}` : 'Error - Unknown Status Code';

    return (
        <div className={errorClass}>
            {/* --- Error Header --- */}
            <div className='font-semibold text-lg mb-2'>
                {errorHeader}
            </div>

            {/* --- Error Message --- */}
            <Paragraph>
                {error.message} Please try again later.
            </Paragraph>
        </div>
    )
}