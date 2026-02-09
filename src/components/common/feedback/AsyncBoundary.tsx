// --- IMPORTS ---
import { Suspense } from "react"
import { Await } from "react-router";
import { LoadingSpin } from "@/components/skeleton/";

// --- TYPE DEFINATIONS ---
interface AsyncBoundaryProps<T> {
    fallback?: React.ReactNode;
    resolve: Promise<T>;
    errorElement?: React.ReactNode;
    children: (data: T) => React.ReactNode;
}

export default function AsyncBoundary<T>({ fallback = <LoadingSpin />, resolve, errorElement, children }: AsyncBoundaryProps<T>) {
    return (
        <Suspense fallback={fallback}>
            <Await resolve={resolve} errorElement={errorElement}>
                {children}
            </Await>
        </Suspense>
    );
}