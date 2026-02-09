// --- IMPORTS ---
import type { CompanySummary, CompanyDetail } from "@/@types";

// --- TYPE GUARD FUNCTIONS ---
export const isCompanySummary = function(data: unknown): data is CompanySummary {
    if(typeof data !== 'object' || data === null) return false
    return 'logo_path' in data && 'name' in data && 'origin_country' in data
}

export const isCompanyDetail = function(data: unknown): data is CompanyDetail {
    if(typeof data !== 'object' || data === null) return false
    return 'description' in data && 'headquarters' in data && 'homepage' in data && 'parent_company' in data
}