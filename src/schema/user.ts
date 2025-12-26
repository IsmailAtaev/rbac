import { z } from 'zod';
import { commonQuery, sortDirection, strBool } from './common';

export const user = z.object({
  id: z.string().uuid(),

  firstName: z.string(),
  lastName: z.string().nullish(),
  middleName: z.string().nullish(),
  birthday: z.string().nullish(),

  email: z.string().email(),
  password: z.string().min(4),
  status: strBool.optional(),
  role: z.enum(['admin', 'user']).default('user'),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullish(),
});

const userSort = user
  .pick({
    id: true,
    firstName: true,
    email: true,
    status: true,
    createdAt: true,
  })
  .keyof();

const sort = z
  .object({
    sortBy: userSort.default('createdAt'),
    sortDirection: sortDirection.default('desc'),
  })
  .partial();

export const userGetAll = user.extend({ text: z.string(), isDeleted: strBool }).partial().merge(sort).merge(commonQuery);
export const userGetAllRes = z.object({
  count: z.number(),
  data: user.omit({
    password: true,
    updatedAt: true,
    deletedAt: true
  }).array(),
});

export const userGetOneRes = user.omit({
  email: true,
  password: true
});

export const create = user.pick({
  firstName: true,
  lastName: true,
  middleName: true,
  birthday: true,
  email: true,
  password: true,
  status: true,
  role: true,
});

export const edit = user
  .pick({
    email: true,
    fio: true,
    role: true,
    birthday: true,
    status: true,
  })
  .partial()
  .refine(data => Object.keys(data).length > 0, { message: 'At least one field must be provided' });
export const userEditRes = user.omit({ password: true });

const changePassword = user.pick({ password: true });
type ChangePassword = z.infer<typeof changePassword>;

export type User = z.infer<typeof user>;
export type UserGetAll = z.infer<typeof userGetAll>;
export type Create = z.infer<typeof create>;
export type UserEdit = z.infer<typeof edit>;

export const userSchema = {
  schema: user,
  getAll: userGetAll,
  getAllRes: userGetAllRes,
  getOneRes: userGetOneRes,
  create,
  edit: edit,
  changePassword,
};

export type UserSchema = {
  Schema: User;
  GetAll: UserGetAll;
  Create: Create;
  Edit: UserEdit;
  ChangePassword: ChangePassword;
};
