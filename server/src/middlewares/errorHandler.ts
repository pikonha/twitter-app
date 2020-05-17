import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

export default (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).send({
      status: 'error',
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? '🤓' : error.stack,
    });
  }

  res.status(500).send({
    status: 'error',
    message: 'Internal server error',
    stack: process.env.NODE_ENV === 'production' ? '🤓' : error.stack,
  });
};
