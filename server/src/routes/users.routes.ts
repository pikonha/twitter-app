import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';
import UserRepository from '../repositories/UserRepository';

const router = Router();

router.post('/', async (req, res) => {
  const { name, username, password } = req.body;

  const user = await CreateUserService.execute({ name, username, password });

  return res.status(201).send({ data: user });
});

router.get('/', async (req, res) => {
  const userRepository = getCustomRepository(UserRepository);
  const users = await userRepository.find();

  return res.send({ data: users });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findOne({ where: { id } });

  return res.send({ data: user });
});

export default router;
