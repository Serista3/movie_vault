import { optionMethodPost } from "./config";
import { tmdbFetch } from "../utils/api";
import type { User, RequestToken, CreateSession, DeleteSession } from "../types";

export const getCurrentUser = async function(sessionId: string){
  return tmdbFetch<User>(`/account/22551364?session_id=${sessionId}`);
}

export const createRequestToken = async function(){
  return tmdbFetch<RequestToken>(`/authentication/token/new`);
}

export const createSession = async function(requestToken: string){
  return tmdbFetch<CreateSession>(`/authentication/session/new`, {
    ...optionMethodPost,
    body: JSON.stringify({
      request_token: requestToken
    })
  });
}

export const deleteSession = async function(session_id: string){
  return tmdbFetch<DeleteSession>(`/authentication/session`, {
    ...optionMethodPost,
    body: JSON.stringify({
      session_id: session_id
    })
  });
}
