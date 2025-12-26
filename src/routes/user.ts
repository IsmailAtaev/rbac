import { Router, Request, Response } from 'express';
import { userController } from 'src/controllers';
import { authMiddleware, roleGuard } from 'src/middleware/auth';

export const userRouter = Router();

// GET /users/
userRouter.get('/', authMiddleware, roleGuard(['admin']), userController.getAll);

// GET /users/:id
// userRouter.get('/:id', (req: Request, res: Response) => {
//     const userId = req.params.id;
//     res.json({ message: `Details for user ID: ${userId}` });
// });
userRouter.get('/:id', userController.getOne);

// POST /users/
// userRouter.post('/', (req: Request, res: Response) => {
//     // Предполагается, что данные пользователя находятся в req.body
//     res.status(201).json({ message: 'User created successfully', data: req.body });
// });

userRouter.post('/', userController.create);