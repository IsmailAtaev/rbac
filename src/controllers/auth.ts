import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { userRepo } from 'src/repo';
import { authSchema, AuthSchema, userSchema } from 'src/schema';
import { Request, Response } from 'express';

const login = async (req: Request, res: Response) => {
    try {
        const parsed = authSchema.login.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: 'Validation error',
                errors: parsed.error.format(),
            });
        }

        const { email, password }: AuthSchema['Login'] = parsed.data;

        const user = await userRepo.getByEmail(email);
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(400).json({ message: 'Wrong password' });

        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role
            },
            process.env.JWT_SECRET!,
            { expiresIn: '1d' }
        );

        return res.json({ token });
    } catch (e: any) {
        throw new Error(e.message);
    }
};

const registration = async (req: Request, res: Response) => {
    try {
        const parsed = userSchema.create.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: 'Validation error',
                errors: parsed.error.format(),
            });
        }

        const user = parsed.data;
        const password = await bcrypt.hash(user.password, 10);
        await userRepo.create({ ...user, password });

        res.status(201).json({ message: 'User created successfully' });
    } catch (e: any) {
        throw new Error(e.message);
    }
};

export const authController = {
    login,
    registration,
};