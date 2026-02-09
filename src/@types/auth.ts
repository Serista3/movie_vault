import type { TmdbSuccessResponse } from "./api";

export interface User {
  avatar: {
    gravatar: {
      hash: string;
    },
    tmdb: {
      avatar_path: string;
    }
  },
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

export interface RequestToken extends TmdbSuccessResponse {
  expires_at: string;
  request_token: string;
}

export interface CreateSession extends TmdbSuccessResponse {
  session_id: string;
}

export interface DeleteSession {
  success: boolean;
}
