import { z } from 'zod';

export const commonQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().max(100).default(20),
});

export type CommonQuery = z.infer<typeof commonQuery>;

export const result = z.object({ success: z.boolean() });

export const sortDirection = z.enum(['asc', 'desc']);

export const strBool = z.union([z.enum(['true', 'false']), z.boolean()]).transform(v => v === 'true' || v === true);

export const paramsId = z.object({ id: z.string().uuid() });

export const addFile = z.custom<{ file: any }>();

export const notFound = z.any();

export const commonResDate = z.object({
  createdAt: z.coerce.date().nullish(),
  updatedAt: z.coerce.date().nullish(),
  deleteAt: z.coerce.date().nullish(),
});

export const commonSchema = {
  query: commonQuery,
  resDate: commonResDate,
  result,
  sortDirection,
  strBool,
  paramsId,
  addFile,
  notFound,
};

export type CommonSchema = {
  Query: CommonQuery;
};
