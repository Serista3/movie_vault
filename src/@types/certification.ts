// --- TYPE DEFINATIONS ---
export interface CertificationSummary {
  certifications: Record<string, CertificationDetail[]>;
}

export interface CertificationDetail {
  certification: string;
  meaning: string;
  order: number;
}