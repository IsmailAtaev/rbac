import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { userRepo } from 'src/repo';
import { UserSchema } from 'src/schema';
import { Request, Response } from 'express';

const login = async (req: Request, res: Response) => {
    const { email, password }: UserSchema['Login'] = req.body;

    const user = await userRepo.getByEmail(email)
    if (!user) throw new Error('User not found');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Wrong password');

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    );

    return res.json({ token });
};

const registration = async (req: Request, res: Response) => {
    try {
        const userData: UserSchema['Create'] = req.body;

        const passwordHash = await bcrypt.hash(userData.password, 10);

        await userRepo.create({
            ...userData,
            password: passwordHash
        });

        res.status(201).json({ message: 'User created successfully' });
    } catch (e: any) {
        throw new Error(e.message);
    }
};

export const authController = {
    login,
    registration,
};
