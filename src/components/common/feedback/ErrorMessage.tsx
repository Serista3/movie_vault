// --- IMPORTS  ---
import type { AppError } from '@/@types';
import { cn } from '@/utils/helper';
import { Paragraph } from '@/components/common/';

// --- TYPE DEFINATIONS ---
interface ErrorMessageProps {
    error: AppError;
    className?: string;
}

// --- CONSTANTS ---
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