export class CustomError extends Error {
  statusCode: number;
  isOperational: boolean;
  path: string | undefined;

  constructor(message: string, statusCode: number, path?: string) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;
    this.name = this.constructor.name;
    this.path = path;

    Error.captureStackTrace(this, this.constructor);
  }
}
