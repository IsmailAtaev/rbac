import { Insertable, Selectable, Updateable } from 'kysely';
import { db, DB } from 'src/infra/db/db';
import { UserSchema as Schema } from 'src/schema';
import { PaginationUtil } from 'src/utils';

type Table = DB['users'];
const table = 'users';
type Filter = Partial<Selectable<Table> & Schema['GetAll']>;
type Insert = Insertable<Table>;
type Edit = Updateable<Table>;

const getAll = async (p: Filter & PaginationUtil['LimitOffset']) => {
  let q = db.selectFrom(table);

  if (p.id) q = q.where('users.id', '=', p.id);
  if (p.status !== undefined) q = q.where('users.status', '=', p.status);
  if (p.role) q = q.where('users.role', '=', p.role);
  if (p.email) q = q.where('users.email', 'ilike', `%${p.email}%`);
  if (p.firstName) q = q.where('users.firstName', 'ilike', `%${p.firstName}%`);
  if (p.lastName) q = q.where('users.lastName', 'ilike', `%${p.lastName}%`);
  if (p.middleName) q = q.where('users.lastName', 'ilike', `%${p.middleName}%`);
  if (p.isDeleted === true) q = q.where('users.deletedAt', 'is not', null);
  if (p.text) {
    q = q.where(o =>
      o.or([
        o('email', 'ilike', `%${p.text}%`),
        o('firstName', 'ilike', `%${p.text}%`),
        o('lastName', 'ilike', `%${p.text}%`),
      ]),
    );
  }

  const c = await q.select(o => o.fn.countAll().as('c')).executeTakeFirst();

  const data = await q
    .select([
      'id',
      'email',
      'role',
      'firstName',
      'lastName',
      'createdAt'
    ])
    .limit(p.limit)
    .offset(p.offset)
    .$if(!!p.sortBy, o => o.clearOrderBy().orderBy(p.sortBy!, p.sortDirection))
    .execute();

  return {
    count: Number(c?.c),
    data
  };
};

const getOne = (id: string) => {
  return db
    .selectFrom(table)
    .where('id', '=', id)
    .select([
      'id',
      'email',
      'role',
      'firstName',
      'lastName',
      'createdAt'
    ])
    .executeTakeFirst();
};

const getByEmail = (email: string) => {
  return db
    .selectFrom(table)
    .where('email', '=', email)
    .selectAll()
    .executeTakeFirst();
};

const findOne = async (p: Filter) => {
  let q = db.selectFrom(table);

  if (p.id) q = q.where('users.id', '=', p.id);
  if (p.email) q = q.where('users.email', '=', p.email);
  if (p.firstName) q = q.where('users.firstName', '=', p.firstName);
  if (p.lastName) q = q.where('users.lastName', '=', p.lastName);
  if (p.role) q = q.where('users.role', '=', p.role);

  return q.selectAll('users').executeTakeFirst();
};

const create = (p: Insert) => {
  return db
    .insertInto(table)
    .values(p)
    .returningAll()
    .executeTakeFirst();
};

const edit = (id: string, p: Edit) => {
  return db
    .updateTable(table)
    .where('id', '=', id)
    .set(p)
    .returningAll()
    .executeTakeFirst();
};

const remove = (id: string) => {
  return db
    .deleteFrom(table)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
};


export const userRepo = {
  getAll,
  getOne,
  findOne,
  create,
  edit,
  getByEmail,
  remove,
};
