// --- IMPORTS ---
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- HELPERS ---
export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
}