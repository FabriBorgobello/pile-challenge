import { ZodError } from 'zod';

export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Not found') {
    super(message, 404);
  }
}

/**
 * This error is thrown when a Zod validation fails.
 * It is used to return a more user-friendly error message.
 * @example throw new InvalidZodError(safeJson.error);
 */
export class InvalidZodError extends ApiError {
  constructor(err: ZodError) {
    super(err.issues.map((i) => `${i.path}: ${i.message}`).join('. ') || 'Invalid request', 400);
  }
}
