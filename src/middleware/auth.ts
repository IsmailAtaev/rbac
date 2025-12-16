import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'src/types/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).send('No token');

        const token = authHeader.split(' ')[1];

        // const payload = jwt.verify(token, process.env.JWT_SECRET!);
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.user = payload;

        next();
    } catch {
        return res.status(401).send('Invalid token');
    }
};
