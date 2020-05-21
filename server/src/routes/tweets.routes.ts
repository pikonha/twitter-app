import { Router } from 'express';
import { getRepository } from 'typeorm';

import { Auth } from '../middlewares';
import Tweet from '../models/Tweet';
import CreateTweetService from '../services/CreateTweetService';
import DeleteTweetService from '../services/DeleteTweetService';
import LikeRoutes from './likes.routes';

const router = Router();

router.use(Auth);
router.use(LikeRoutes);

router.post('/', async (req, res) => {
  const { content } = req.body;
  const { id: ownerId } = req.user;

  const tweet = await CreateTweetService.execute({
    ownerId,
    content,
  });

  res.status(201).send(tweet);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const tweetRepository = getRepository(Tweet);
  const tweet = await tweetRepository.find({ id });

  res.send(tweet);
});

router.get('/', async (req, res) => {
  const tweetRepository = getRepository(Tweet);
  const tweets = await tweetRepository.find();

  res.send(tweets);
});

router.delete('/:id', async (req, res) => {
  const { id: ownerId } = req.user;
  const { id: tweetId } = req.params;

  const tweet = await DeleteTweetService.execute({
    ownerId,
    tweetId,
  });

  res.send(tweet);
});

export default router;
