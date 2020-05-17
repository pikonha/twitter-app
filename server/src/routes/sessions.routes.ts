import { Router } from 'express';
import CreateSessionService from '../services/CreateSessionService';

const router = Router();

router.post('/', async (req, res) => {
  const { username = '', email = '', password } = req.body;

  const { user, token } = await CreateSessionService.execute({
    username,
    email,
    password,
  });

  return res.send({ user, token });
});

export default router;
