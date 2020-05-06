import TweetLike from '../models/TweetLike';
import { getRepository } from 'typeorm';
import CustomError from '../utils/customError';

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
    throw new CustomError(404, 'Tweet was not found.');
  }

  if (like.ownerId !== ownerId) {
    throw new CustomError(302, 'Invalid action.');
  }

  await likeRepository.delete({ id: likeId, tweetId });

  return { like };
}

export default {
  execute,
};
