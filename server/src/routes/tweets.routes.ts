import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateTweetService from '../services/CreateTweetService';
import Tweet from '../models/Tweet';

const router = Router();

router.post('/', async (req, res) => {
  const { ownerId, content } = req.body;

  const tweet = await CreateTweetService.execute({ ownerId, content });

  res.status(201).send({ data: tweet });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const tweetRepository = getRepository(Tweet);
  const tweet = await tweetRepository.find({ id });

  res.send({ data: tweet });
});

router.get('/', async (req, res) => {
  const tweetRepository = getRepository(Tweet);
  const tweets = await tweetRepository.find();

  res.send({ data: tweets });
});

export default router;
