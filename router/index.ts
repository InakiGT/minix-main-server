import { Router, Express } from 'express';

import postsRouter from './posts.router';
import usersRouter from './users.router';
import authRouter from './auth.router';

const router: Router = Router();

const appRouter = (app: Express) => {
    app.use('/api/v1', router);

    router.use('/posts', postsRouter);
    router.use('/users', usersRouter);
    router.use('/login', authRouter)
}

export default appRouter;