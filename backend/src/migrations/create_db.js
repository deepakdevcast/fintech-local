import PgPool from "../db/postgres.js";

export const up = async () => {
  await PgPool.pgPool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  await PgPool.pgPool.query('\
  CREATE TABLE IF NOT EXISTS users (\
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,\
    name VARCHAR(255) NOT NULL,\
    email VARCHAR(255) UNIQUE NOT NULL,\
    password VARCHAR(255) NOT NULL\
  );');
  await PgPool.pgPool.query(`
  CREATE TABLE IF NOT EXISTS accounts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    balance NUMERIC(7,3) NOT NULL,
    CONSTRAINT accounts_users_fk FOREIGN KEY (user_id) REFERENCES users(id)
  );`);
  await PgPool.pgPool.query('\
  CREATE TABLE IF NOT EXISTS transactions (\
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,\
    receiver_id UUID NOT NULL,\
    sender_id UUID NOT NULL,\
    amount NUMERIC(7,3) NOT NULL,\
    CONSTRAINT transactions_users_fk_senders FOREIGN KEY (receiver_id) REFERENCES users(id),\
    CONSTRAINT transactions_users_fk_receivers FOREIGN KEY (sender_id) REFERENCES users(id)\
  );');
};

export const down = async () => {
  await PgPool.pgPool.query('DROP TABLE IF EXISTS users;');
  await PgPool.pgPool.query('DROP TABLE IF EXISTS accounts;');
  await PgPool.pgPool.query('DROP TABLE IF EXISTS transactions;');
};