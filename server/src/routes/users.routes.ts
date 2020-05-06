import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import { Auth } from '../middlewares';
import CreateUserService from '../services/CreateUserService';

const router = Router();

router.post('/', async (req, res, next) => {
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
    res.status(404);
    next(error);
  }
});

router.use(Auth);

router.get('/', async (req, res) => {
  const userRepository = getRepository(User);
  const usersModels = await userRepository.find();

  const users = usersModels.map(user => {
    delete user.password;
    return user;
  });

  return res.send({ data: users });
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    return res.send({ data: user });
  } catch (error) {
    res.status(404);
    next(error);
  }
});

export default router;
