import { getCustomRepository } from 'typeorm';

import User from '../models/User';
import UserRepository from '../repositories/UserRepository';

interface Request {
  name: String;
  username: String;
  password: String;
}

async function execute({ name, username, password }: Request): Promise<User> {
  const userRepository = getCustomRepository(UserRepository);

  const user = userRepository.create({
    name,
    username,
    password,
  });

  await userRepository.save(user);

  return user;
}

export default { execute };
