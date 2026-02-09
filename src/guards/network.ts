// --- IMPORTS ---
import type { NetworkSummary } from "@/@types";

// --- TYPE GUARD FUNCTIONS ---
export const isNetworkSummary = function(data: unknown): data is NetworkSummary {
  if(typeof data !== 'object' || data === null) return false
  return 'logo_path' in data && 'name' in data && 'origin_country' in data;
}