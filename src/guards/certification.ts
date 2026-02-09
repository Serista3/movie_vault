// --- IMPORTS ---
import type { CertificationSummary, CertificationDetail } from "@/@types";

// --- TYPE GUARD FUNCTIONS ---
export const isCertificationSummary = function(data: unknown): data is CertificationSummary {
  if(typeof data !== 'object' || data === null) return false;
  return 'certifications' in data;
}

export const isCertificationDetail = function(data: unknown): data is CertificationDetail {
  if(typeof data !== 'object' || data === null) return false;
  return 'certification' in data && 'meaning' in data && 'order' in data;
}