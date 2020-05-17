import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface Request {
  username?: string;
  email?: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

async function execute({
  username,
  email,
  password,
}: Request): Promise<Response> {
  if (!username && !email) {
    throw new AppError('Username or email are a required field.');
  }

  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    where: [{ email }, { username }],
  });

  if (!user) {
    throw new AppError('Invalid credentials.');
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError('Invalid credentials.');
  }

  delete user.password;

  const { secret, expiresIn } = authConfig.jwt;

  const token = jwt.sign({ username: user.username }, secret, {
    subject: user.id,
    expiresIn,
  });

  return { user, token };
}

export default {
  execute,
};
