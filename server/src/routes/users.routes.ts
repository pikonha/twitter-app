import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import User from '../models/User';
import { Auth } from '../middlewares';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UploadUserAvatarService from '../services/UploadUserAvatarService';

const router = Router();
const upload = multer(uploadConfig);

router.post('/', async (req, res) => {
  const { name, email, username, password } = req.body;

  const user = await CreateUserService.execute({
    name,
    email,
    username,
    password,
  });

  return res.status(201).send(user);
});

router.use(Auth);

router.get('/', async (req, res) => {
  const userRepository = getRepository(User);
  const usersModels = await userRepository.find();

  const users = usersModels.map(user => {
    delete user.password;
    return user;
  });

  return res.send(users);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ where: { id } });

  delete user?.password;

  return res.send(user);
});

router.patch('/:id', upload.single('avatar'), async (req, res) => {
  const user = await UploadUserAvatarService.execute({
    userId: req.user.id,
    fileName: req.file.filename,
  });

  res.send(user);
});

export default router;
