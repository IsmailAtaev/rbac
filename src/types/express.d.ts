import 'express';
import { JwtPayload } from './jwt';

declare module 'express-serve-static-core' {
    interface Request {
        user?: JwtPayload;
    }
}
