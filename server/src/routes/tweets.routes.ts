import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

import CreateTweetService from '../services/CreateTweetService';
import TweetRepository from '../repositories/TweetRepository';

const router = Router();

router.post('/', async (req, res) => {
  const { ownerId, content } = req.body;

  const tweet = await CreateTweetService.execute({ ownerId, content });

  res.status(201).send({ data: tweet });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const tweetRepository = getCustomRepository(TweetRepository);
  const tweet = await tweetRepository.find({ id });

  res.send({ data: tweet });
});

router.get('/', async (req, res) => {
  const tweetRepository = getCustomRepository(TweetRepository);
  const tweets = await tweetRepository.find();

  res.send({ data: tweets });
});

export default router;
