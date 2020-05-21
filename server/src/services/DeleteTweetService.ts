import { getRepository } from 'typeorm';

import Tweet from '../models/Tweet';
import AppError from '../errors/AppError';

interface Request {
  ownerId: string;
  tweetId: string;
}

async function execute({ ownerId, tweetId }: Request) {
  const tweetRepository = getRepository(Tweet);

  const tweet = await tweetRepository.findOne(tweetId);

  if (!tweet) {
    throw new AppError('Tweet not found.', 404);
  }

  if (tweet.ownerId !== ownerId) {
    throw new AppError('Unauthorized operation.', 403);
  }

  await tweetRepository.delete(tweetId);

  return tweet;
}

export default {
  execute,
};
