import { getRepository } from 'typeorm';

import User from '../models/User';

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
    throw new Error('Credentials already in use.');
  }

  const user = userRepository.create({
    name,
    email,
    username,
    password,
  });

  await userRepository.save(user);

  delete user.password;

  return user;
}

export default { execute };
