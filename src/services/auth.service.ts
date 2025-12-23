import { optionMethodPost } from "./config";
import { tmdbFetch } from "../utils/api";
import type { User, RequestToken, CreateSession, DeleteSession, AppError } from "../types";

export const getCurrentUser = async function(sessionId: string): Promise<User | AppError>{
  return tmdbFetch<User>(`/account/22551364?session_id=${sessionId}`);
}

export const createRequestToken = async function(): Promise<RequestToken | AppError>{
  return tmdbFetch<RequestToken>(`/authentication/token/new`);
}

export const createSession = async function(requestToken: string): Promise<CreateSession | AppError>{
  return tmdbFetch<CreateSession>(`/authentication/session/new`, {
    ...optionMethodPost,
    body: JSON.stringify({
      request_token: requestToken
    })
  });
}

export const deleteSession = async function(session_id: string): Promise<DeleteSession | AppError>{
  return tmdbFetch<DeleteSession>(`/authentication/session`, {
    ...optionMethodPost,
    body: JSON.stringify({
      session_id: session_id
    })
  });
}
