import { getRepository } from 'typeorm';
import { Router } from 'express';

import CreateTweetLikeService from '../services/CreateTweetLikeService';
import DeleteTweetLikeService from '../services/DeleteTweetLikeService';
import TweetLike from '../models/TweetLike';

const router = Router();

router.post('/:id/likes', async (req, res, next) => {
  try {
    const { id: ownerId } = req.user;
    const { id: tweetId } = req.params;

    const { like } = await CreateTweetLikeService.execute({
      ownerId,
      tweetId,
    });

    res.status(201).send(like);
  } catch (error) {
    res.status(error.status || 400);

    next(error);
  }
});

router.delete('/:tweetId/likes/:id', async (req, res, next) => {
  try {
    const { tweetId, id } = req.params;
    const { id: ownerId } = req.user;

    const like = await DeleteTweetLikeService.execute({
      likeId: id,
      tweetId,
      ownerId,
    });

    res.send(like);
  } catch (error) {
    res.status(error.status || 400);

    next(error);
  }
});

router.get('/:id/likes', async (req, res, next) => {
  const { id } = req.params;

  const likeRepository = getRepository(TweetLike);
  const likes = await likeRepository.find({
    where: {
      tweetId: id,
    },
  });

  if (!likes.length) {
    return res.status(404).send({ message: 'Tweet not found.' });
  }

  res.send(likes);
});

router.get('/:tweetId/likes/:id', async (req, res, next) => {
  const { tweetId, id } = req.params;

  const likeRepository = getRepository(TweetLike);
  const like = await likeRepository.findOne({
    where: {
      id,
      tweetId,
    },
  });

  if (!like) {
    return res.status(404).send({ message: 'Tweet not found.' });
  }

  res.send(like);
});

export default router;
