export abstract class AppError extends Error {
  abstract readonly statusCode: number;
  abstract readonly code: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class UserNotFoundError extends AppError {
  readonly statusCode = 404;
  readonly code = 'USER_NOT_FOUND';

  constructor(id: string) {
    super(`User with id ${id} not found`);
  }
}

export class ValidationError extends AppError {
  readonly statusCode = 400;
  readonly code = 'VALIDATION_ERROR';

  constructor(message: string) {
    super(message);
  }
}

export class DatabaseError extends AppError {
  readonly statusCode = 500;
  readonly code = 'DATABASE_ERROR';

  constructor(message: string = 'Database operation failed') {
    super(message);
  }
}

export class DuplicateEmailError extends AppError {
  readonly statusCode = 409;
  readonly code = 'DUPLICATE_EMAIL';

  constructor(email: string) {
    super(`Email ${email} already exists`);
  }
}