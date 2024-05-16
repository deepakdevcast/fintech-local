import { mongoInitialize } from "./db/mongo.js";
import PgPool from "./db/postgres.js";
import runMigrations from "./migrations/index.js";
import externalServer from "./server.js";

const start = async () => {
  // await mongoInitialize();
  await PgPool.pgPool.connect();
  await runMigrations();
  await externalServer();
}
start();