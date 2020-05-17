import { getRepository } from 'typeorm';

import User from '../models/User';
import Tweet from '../models/Tweet';
import TweetLike from '../models/TweetLike';
import AppError from '../errors/AppError';

interface Request {
  tweetId: string;
  ownerId: string;
}

interface Response {
  like: TweetLike;
}

async function execute({ tweetId, ownerId }: Request): Promise<Response> {
  const likeRepository = getRepository(TweetLike);
  const tweetRepository = getRepository(Tweet);
  const userRepository = getRepository(User);

  const tweet = await tweetRepository.findOne({
    where: { id: tweetId },
    join: {
      alias: 'tweets',
      leftJoinAndSelect: {
        likes: 'tweets.likes',
        likeOwner: 'likes.owner',
        owner: 'tweets.owner',
      },
    },
  });

  if (!tweet) {
    throw new AppError('Tweet was not found.', 404);
  }

  if (tweet.likes.some(like => like.owner.id === ownerId)) {
    throw new AppError('Invalid action.', 302);
  }

  const user = await userRepository.findOne({ where: { id: ownerId } });

  const like = likeRepository.create({
    tweet,
    owner: user,
  });

  delete like.owner;
  delete like.tweet;

  await likeRepository.save(like);

  return { like };
}

export default {
  execute,
};
