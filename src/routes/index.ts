import { Router, Request, Response } from 'express';
import { userRouter } from './user';

export const router = Router();

// 1. Маршрут для проверки работоспособности сервера (например, /api/health)
router.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

router.use('/users', userRouter);