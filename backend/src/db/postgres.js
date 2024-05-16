import pg from "pg";
import EnvConfig from "../config.js";

class PgPool {
  static pgPool = new pg.Pool({
    host: EnvConfig.get('POSTGRES_HOST'),
    port: parseInt(EnvConfig.get('POSTGRES_PORT')),
    user: EnvConfig.get('POSTGRES_USER'),
    password: EnvConfig.get('POSTGRES_PASSWORD'),
    database: EnvConfig.get('POSTGRES_DATABASE'),
    min: 1,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });
  static pgTransactions = async (fn) => {
    await PgPool.pgPool.query('BEGIN;');
    const data = await fn(PgPool.pgPool);
    await PgPool.pgPool.query('COMMIT;');
    return data;
  }
}

export default PgPool;