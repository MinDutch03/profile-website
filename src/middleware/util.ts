import { Request, Response, NextFunction } from 'express';

/**
 * Helper function to check if request is from Postman or API client
 * @param req Express request object
 * @returns boolean indicating if this is an API request
 */
export const isApiRequest = (req: Request): boolean => {
  // Check if request is from Postman
  if (req.headers['user-agent'] && req.headers['user-agent'].includes('Postman')) {
    return true;
  }

  // Check if request explicitly wants JSON
  if (req.headers['accept'] === 'application/json') {
    return true;
  }

  // Check for typical API-style requests
  if (req.xhr) {
    return true;
  }

  return false;
};

/**
 * Higher-order function to handle async errors in controllers
 * @param fn Controller function that returns a Promise
 * @returns Wrapped controller function with error handling
 */
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.error('Error:', error);
      next(error);
    }
  };
};
