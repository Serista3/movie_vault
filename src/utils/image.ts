// --- IMPORTS ---
import { IMAGE_BASE_URL } from "@/services";

// --- TYPE DEFINATIONS ---
export type ImageSize = 'w185' | 'w342' | 'w500' | 'w780' | 'w1280' | 'original';

// --- HELPERS ---
export const getTmdbImage = (path: string, size: ImageSize) => {
  return `${IMAGE_BASE_URL}${size}${path}`;
};