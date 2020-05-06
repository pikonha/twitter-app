import { Router } from 'express';

import TweetRoutes from './tweets.routes';
import UsersRoutes from './users.routes';
import SessionsRoutes from './sessions.routes';

import { ErrorHandler, NotFound } from '../middlewares';

const router = Router();

router.use('/tweets', TweetRoutes);
router.use('/users', UsersRoutes);
router.use('/sessions', SessionsRoutes);

router.use(NotFound);
router.use(ErrorHandler);

export default router;
