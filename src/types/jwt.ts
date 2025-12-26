import { UserSchema } from "src/schema";

export interface JwtPayload {
    userId: string;
    role: UserSchema['Schema']['role'];
};