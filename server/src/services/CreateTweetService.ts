import { getCustomRepository } from 'typeorm';

import Tweet from '../models/Tweet';
import TweetRepository from '../repositories/TweetRepository';

interface Request {
  ownerId: String;
  content: String;
}

async function execute({ ownerId, content }: Request): Promise<Tweet> {
  const tweetRepository = getCustomRepository(TweetRepository);

  const tweet = tweetRepository.create({
    ownerId,
    content,
  });

  await tweetRepository.save(tweet);

  return tweet;
}

export default {
  execute,
};
