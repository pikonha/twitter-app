import Tweet from '../models/Tweet';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

interface Request {
  userId: string;
  tweetId: string;
  fileName: string;
}

async function execute({ userId, tweetId, fileName }: Request): Promise<Tweet> {
  const tweetRepository = getRepository(Tweet);

  const tweet = await tweetRepository.findOne({
    where: { id: tweetId, ownerId: userId },
  });

  if (!tweet) {
    throw new AppError('Tweet not found', 404);
  }

  tweet.image = fileName;

  tweetRepository.save(tweet);

  return tweet;
}

export default {
  execute,
};
