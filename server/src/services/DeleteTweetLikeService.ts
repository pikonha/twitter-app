import TweetLike from '../models/TweetLike';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

interface Request {
  tweetId: string;
  likeId: string;
  ownerId: string;
}

interface Response {
  like: TweetLike;
}

async function execute({
  tweetId,
  likeId,
  ownerId,
}: Request): Promise<Response> {
  const likeRepository = getRepository(TweetLike);

  const like = await likeRepository.findOne({
    where: { id: likeId, tweetId },
  });

  if (!like) {
    throw new AppError('Tweet was not found.', 404);
  }

  if (like.ownerId !== ownerId) {
    throw new AppError('Invalid action.', 302);
  }

  await likeRepository.delete({ id: likeId, tweetId });

  return { like };
}

export default {
  execute,
};
