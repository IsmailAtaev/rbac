import { Kysely, PostgresDialect } from 'kysely';
import { DB as Database } from './types';
import { getEnv } from '../env/service';
import { Pool } from 'pg';

const connectionString = getEnv('DATABASE_URL');

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString,
    max: 10
  }),
});

export type DB = Database;
export const db = new Kysely<DB>({ dialect });
``