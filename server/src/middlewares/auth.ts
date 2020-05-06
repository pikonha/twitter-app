import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import config from '../config';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
  username: string;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing.');
  }

  try {
    const [, token] = authHeader.split(' ');

    const decoded = verify(token, config.jwt.secret);
    const { sub, username } = decoded as TokenPayload;

    req.user = {
      id: sub,
      username,
    };

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
};
