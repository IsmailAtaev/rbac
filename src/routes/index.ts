import { Router, Request, Response } from 'express';
import { userRouter } from './user';
import { authRouter } from './auth';

export const router = Router();

router.get('/health', (req: Request, res: Response) => res.json({ status: 'OK', message: 'Server is running' }));
router.use('/users', userRouter);
router.use('/auth', authRouter);
