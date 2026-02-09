// --- IMPORTS ---
import type { User, RequestToken, CreateSession, DeleteSession } from "@/@types";

// --- TYPE GUARD FUNCTIONS ---
export const isUser = function(data: unknown): data is User {
  if(typeof data !== 'object' || data === null) return false;
  return 'username' in data && 'name' in data;
}

export const isRequestToken = function(data: unknown): data is RequestToken {
  if(typeof data !== 'object' || data === null) return false;
  return 'expires_at' in data && 'request_token' in data;
}

export const isCreateSession = function(data: unknown): data is CreateSession {
  if(typeof data !== 'object' || data === null) return false;
  return 'session_id' in data && 'success' in data && data.success === true;
}

export const isDeleteSession = function(data: unknown): data is DeleteSession {
  if(typeof data !== 'object' || data === null) return false;
  return 'success' in data && data.success === false;
}