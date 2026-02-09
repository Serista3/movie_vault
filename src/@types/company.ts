export interface CompanySummary {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface CompanyDetail extends CompanySummary {
    description: string;
    headquarters: string;
    homepage: string | null;
    parent_company: null | string;
}
