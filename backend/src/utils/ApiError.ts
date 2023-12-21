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

export class BadRequestError extends ApiError {
  constructor(message: string = 'Invalid request') {
    super(message, 400);
  }
}
