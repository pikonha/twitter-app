import { getRepository } from 'typeorm';
import { hash, genSalt } from 'bcryptjs';

import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  username: string;
  password: string;
}

async function execute({
  name,
  email,
  username,
  password,
}: Request): Promise<User> {
  const userRepository = getRepository(User);

  const foundUser = await userRepository.findOne({
    where: [{ email }, { username }],
  });

  if (foundUser) {
    throw new AppError('Credentials already in use.');
  }

  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  const user = userRepository.create({
    name,
    email,
    username,
    password: hashedPassword,
  });

  await userRepository.save(user);

  delete user.password;

  return user;
}

export default { execute };
