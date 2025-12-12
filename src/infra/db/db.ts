import { Kysely, PostgresDialect } from 'kysely';
import { DB as Database } from './types';
import { getEnv } from '../env/service';
import { Pool } from 'pg';
import { User } from 'src/schema';

const connectionString = getEnv('DATABASE_URL');

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString, max: 10
  }),
});

export type DB = Database & {
  users: Database['users'] & { role: User['role'] };
};

export const db = new Kysely<DB>({ dialect });
