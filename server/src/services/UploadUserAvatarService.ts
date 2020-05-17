import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/User';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface Request {
  userId: string;
  fileName: string;
}

async function execute({ userId, fileName }: Request): Promise<User> {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne(userId);

  if (!user) {
    throw new AppError('Only authenticated users can change avatar.', 401);
  }

  if (user.avatar) {
    const userAvatarFilePath = path.join(uploadConfig.destination, user.avatar);
    const userAvatarileExists = await fs.promises.stat(userAvatarFilePath);

    if (userAvatarileExists) {
      await fs.promises.unlink(userAvatarFilePath);
    }
  }

  user.avatar = fileName;
  userRepository.save(user);

  delete user.password;

  return user;
}

export default {
  execute,
};
