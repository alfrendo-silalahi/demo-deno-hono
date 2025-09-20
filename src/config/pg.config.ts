import { Pool } from "@db/postgres";

const POOL_CONNECTIONS = 20;

const pool = new Pool(
  {
    user: Deno.env.get("DATABASE_USERNAME"),
    password: Deno.env.get("DATABASE_PASSWORD"),
    database: Deno.env.get("DATABASE_NAME"),
    hostname: Deno.env.get("DATABASE_HOST"),
    port: Deno.env.get("DATABASE_PORT"),
  },
  POOL_CONNECTIONS,
);

export default pool;
