import { Router } from 'express';
import CreateSessionService from '../services/CreateSessionService';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { username = '', email = '', password } = req.body;

    const { user, token } = await CreateSessionService.execute({
      username,
      email,
      password,
    });

    return res.send({ user, token });
  } catch (error) {
    res.status(400);
    next(error);
  }
});

export default router;
