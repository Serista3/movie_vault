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
const BASE_CLASS = "w-full h-auto bg-danger-light shadow-xl";

export default function ErrorMessage({ error, className }: ErrorMessageProps){
    // --- COMPUTED CLASS NAMES ---
    const errorClass = cn(BASE_CLASS, className);

    // --- COMPUTED RENDERED VALUES ---
    const errorHeader = error.statusCode ? `Error - Status Code: ${error.statusCode}` : 'Error - Unknown Status Code';

    return (
        <div className={errorClass}>
            <div className='max-w-300 mx-auto p-4'>
                {/* --- Error Header --- */}
                <div className='font-semibold text-lg sm:text-xl mb-2'>
                    {errorHeader}
                </div>

                {/* --- Error Message --- */}
                <Paragraph>
                    {error.message} Please try again later.
                </Paragraph>
            </div>
        </div>
    )
}