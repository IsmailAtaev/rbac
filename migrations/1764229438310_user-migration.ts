import { sql, type Kysely } from 'kysely';

const table = 'users';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable(table)
    .ifNotExists()
    .addColumn('id', 'uuid', c => c.primaryKey().defaultTo(sql`gen_random_uuid()`))
    // .addColumn('id', 'uuid', c => c.primaryKey().defaultTo(sql`uuidv7()`))
    .addColumn('firstName', 'varchar', c => c.notNull())
    .addColumn('lastName', 'varchar')
    .addColumn('middleName', 'varchar')
    .addColumn('birthday', 'date')
    .addColumn('email', 'varchar', c => c.notNull().unique())
    .addColumn('password', 'varchar', c => c.notNull().unique())
    .addColumn('status', 'boolean', c => c.notNull().defaultTo(true))
    .addColumn('role', 'varchar', c => c.notNull())
    .addColumn('createdAt', 'timestamptz', c => c.notNull().defaultTo(sql`now()`))
    .addColumn('updatedAt', 'timestamptz', c => c.notNull().defaultTo(sql`now()`))
    .addColumn('deletedAt', 'timestamptz')
    .execute();

  await db.schema.createIndex('users_email_index').on(table).column('email').execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable(table).ifExists().execute();
}
