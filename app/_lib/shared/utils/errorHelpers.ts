import type { AppError, Result } from "../types/foundation";

/**
 * Create a success Result
 */
export function ok<T>(data: T): Result<T> {
  return { ok: true, data };
}

/**
 * Create an error Result
 */
export function err(error: AppError): Result<never> {
  return { ok: false, error };
}

/**
 * Create an AppError from a message
 */
export function createAppError(
  code: string,
  messageKey: string,
  details?: string,
  httpStatus?: number
): AppError {
  return {
    code,
    messageKey,
    details,
    httpStatus,
    clientTimestamp: new Date().toISOString(),
  };
}

/**
 * Create an AppError from an Error object
 */
export function errorFromException(
  error: Error,
  code: string = "INTERNAL_ERROR",
  httpStatus?: number
): AppError {
  return createAppError(code, error.message, error.message, httpStatus);
}

