// --- IMPORTS ---
import type { 
  TmdbSuccessResponse, 
  TmdbErrorResponse, 
  AppError, 
  UserDataResponse,
} from "@/@types";

// --- TYPE GUARD FUNCTIONS ---
export const isTmdbSuccessResponse = function(res: unknown): res is TmdbSuccessResponse {
  if(typeof res !== 'object' || res === null) return false;

  const tmdbSuccessResponse = res as Record<string, unknown>
  return tmdbSuccessResponse.success === true;
}

export const isTmdbErrorResponse = function(res: unknown): res is TmdbErrorResponse {
  if(typeof res !== 'object' || res === null) return false;

  const tmdbErrorResponse = res as Record<string, unknown>
  return tmdbErrorResponse.success === false;
}

export const isAppError = function(data: unknown): data is AppError {
  if(typeof data !== 'object' || data === null) return false

  const appError = data as Record<string, unknown>
  return 'isError' in appError;
}

export const isUserDataResponse = function(res: unknown): res is UserDataResponse {
  if(typeof res !== 'object' || res === null) return false

  const userDataResponse = res as Record<string, unknown>
  return 'userData' in userDataResponse;
}