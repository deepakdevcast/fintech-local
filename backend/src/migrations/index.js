import { down, up } from "./create_db.js";

const runMigrations = async () => {
  await up();
}

export default runMigrations;