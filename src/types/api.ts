import type { User } from './auth';

export interface TmdbSuccessResponse {
    success: boolean;
}

export interface TmdbErrorResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}

export interface AppError {
    isError: boolean; 
    message: string;
}

export interface UserDataResponse {
  sessionId: string;
  userData: User;
  isAuthenticated: boolean;
}
