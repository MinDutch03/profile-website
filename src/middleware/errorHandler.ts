import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);

  if (req.accepts('html')) {
    res.render('error', {
      message: err.message,
      error: process.env.NODE_ENV === 'development' ? err : {}
    });
  } else {
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
  }
};
