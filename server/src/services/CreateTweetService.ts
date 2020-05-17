import { getRepository } from 'typeorm';

import Tweet from '../models/Tweet';

interface Request {
  ownerId: string;
  content: string;
  image?: string;
}

async function execute({ ownerId, content, image }: Request): Promise<Tweet> {
  const tweetRepository = getRepository(Tweet);

  const tweet = tweetRepository.create({
    ownerId,
    content,
    image,
  });

  await tweetRepository.save(tweet);

  return tweet;
}

export default {
  execute,
};
