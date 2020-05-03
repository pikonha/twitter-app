import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';
import User from '../models/User';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    const user = await CreateUserService.execute({
      name,
      email,
      username,
      password,
    });

    return res.status(201).send({ data: user });
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();

  return res.send({ data: users });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ where: { id } });

  return res.send({ data: user });
});

export default router;
