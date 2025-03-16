import { logger } from './logger';

export class AppError extends Error {
  constructor(
    public message: string,
    public code: string,
    public data?: any,
    public context?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class Web3Error extends AppError {
  constructor(message: string, code: string, data?: any) {
    super(message, code, data, 'Web3');
    this.name = 'Web3Error';
  }
}

export class APIError extends AppError {
  constructor(message: string, code: string, data?: any) {
    super(message, code, data, 'API');
    this.name = 'APIError';
  }
}

export const ErrorCodes = {
  WALLET_CONNECTION_FAILED: 'WALLET_CONNECTION_FAILED',
  WRONG_NETWORK: 'WRONG_NETWORK',
  TRANSACTION_FAILED: 'TRANSACTION_FAILED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export const handleError = (error: Error | AppError | unknown, context?: string) => {
  if (error instanceof AppError) {
    logger.error(error.message, {
      code: error.code,
      data: error.data,
      context: error.context || context,
    });
    return error;
  }

  if (error instanceof Error) {
    logger.error(error.message, {
      stack: error.stack,
      context,
    });
    return new AppError(
      error.message,
      ErrorCodes.UNKNOWN_ERROR,
      { originalError: error },
      context
    );
  }

  const message = 'An unknown error occurred';
  logger.error(message, { error, context });
  return new AppError(message, ErrorCodes.UNKNOWN_ERROR, { error }, context);
};

export const createErrorHandler = (context: string) => (error: unknown) => 
  handleError(error, context); 