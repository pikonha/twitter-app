import { Router } from 'express';

import UsersRoutes from './users.routes';
import TweetRoutes from './tweets.routes';
import SessionsRoutes from './sessions.routes';

const router = Router();

router.use('/users', UsersRoutes);
router.use('/tweets', TweetRoutes);
router.use('/sessions', SessionsRoutes);

export default router;
