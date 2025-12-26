import { z } from 'zod';
import { user } from './user';

export const payload = user.pick({ id: true, role: true });
export type Payload = z.infer<typeof payload>;

export const meRes = user.pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true,
});

export const login = user.pick({ email: true, password: true });
export type Login = z.infer<typeof login>;
export const loginRes = meRes;

const forgotPassword = user.pick({ email: true });
type ForgotPassword = z.infer<typeof forgotPassword>;

const forgotPasswordVerify = user
  .pick({ email: true, password: true })
  .extend({ code: z.number().transform(v => String(v)) });

type ForgotPasswordVerify = z.infer<typeof forgotPasswordVerify>;

export const authSchema = {
  payload,
  meRes,
  login,
  loginRes,
  forgotPassword,
  forgotPasswordVerify,
};

export type AuthSchema = {
  Login: Login;
  Payload: Payload;
  ForgotPassword: ForgotPassword;
  ForgotPasswordVerify: ForgotPasswordVerify;
};
