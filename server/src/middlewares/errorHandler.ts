import { Request, Response, NextFunction, Errback } from 'express';

interface HTTPException {
  status: number;
  message: string;
  stack: string;
}

export default (
  error: HTTPException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.statusCode = statusCode;
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🤓' : error.stack,
  });
};
