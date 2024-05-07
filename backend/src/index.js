import { mongoInitialize } from "./db/mongo.js";
import externalServer from "./server.js";

const start = async () => {
  await mongoInitialize();
  await externalServer();
}
start();