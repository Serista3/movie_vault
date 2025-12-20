export interface Author {
    name: string;
    username: string;
    avatar_path: string;
    rating: number | null;
}

export interface ReviewSummary {
    id: string;
    author: string;
    author_details: Author;
    content: string;
    created_at: string;
    updated_at: string;
    url: string;
}

export interface ReviewDetail extends ReviewSummary {
    iso_639_1: string;
    media_id: number;
    media_title: string;
    media_type: string;
}
