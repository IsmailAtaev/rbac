import { Request, Response, NextFunction } from 'express';
import { userRepo } from 'src/repo';
import { UserSchema } from 'src/schema';
import { paginationUtil } from 'src/utils';

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData: UserSchema['Create'] = req.body;

        const createdUser = await userRepo.create(userData);

        // Отправляем ответ 201 Created
        res.status(201).json({
            message: 'User created successfully',
            data: createdUser
        });
    } catch (error) {
        next(error);
    }
};

// GET /users/
const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const queryParams: UserSchema['GetAll'] = req.query;
        const { limit, offset } = paginationUtil.limitOffset({ page: 1, perPage: 10 });
        const result = await userRepo.getAll({ limit, offset });

        // Отправляем ответ 200 OK
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

// GET /users/:id
const getOne = (req: Request, res: Response) => {
    // В реальном приложении здесь будет вызов сервиса getUserById(req.params.id)
    const userId = req.params.id;
    res.json({ message: `Controller: Details for user ID: ${userId}` });
};

export const userController = {
    getAll,
    getOne,
    create,
};