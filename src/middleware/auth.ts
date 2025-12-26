import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'src/types/jwt';
import { UserSchema } from 'src/schema';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).send('No token');

        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.user = payload;

        next();
    } catch {
        return res.status(401).send('Invalid token');
    }
};


export const roleGuard = (roles: UserSchema['Schema']['role'][]) =>
    (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) return res.status(401).send('Unauthorized');

        if (req.user?.role === 'admin') return next();

        if (!req.user || !roles.includes(req.user.role)) {
            res.status(400).json({ message: 'Validation error', });
            throw new Error('invalid role');
        }

        next();
    };