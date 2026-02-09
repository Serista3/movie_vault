// --- IMPORTS ---
import type { Author, ReviewSummary, ReviewDetail } from "@/@types";

// --- TYPE GUARD FUNCTIONS ---
export const isAuthor = function(data: unknown): data is Author {
  if(typeof data !== 'object' || data === null) return false
  return 'avatar_path' in data && 'username' in data;
}

export const isReviewSummary = function(data: unknown): data is ReviewSummary {
  if(typeof data !== 'object' || data === null) return false
  return 'author' in data && 'content' in data;
}

export const isReviewDetail = function(data: unknown): data is ReviewDetail {
  if(typeof data !== 'object' || data === null) return false
  return 'media_title' in data && 'media_type' in data && 'content' in data;
}