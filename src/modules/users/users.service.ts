import { Context } from "@hono/hono";
import pool from "../../config/pg.config.ts";

type User = {
  id: number;
  username: string;
  email: string;
  password?: string;
};

const getUsers = async (c: Context) => {
  using client = await pool.connect();

  const result = await client.queryObject(
    "SELECT * FROM users",
  );

  return c.json({
    data: {
      users: result.rows,
    },
  });
};

const getUser = async (c: Context) => {
  const id = c.req.param("id");

  using client = await pool.connect();

  const result = await client.queryObject<User>(
    "SELECT * FROM users WHERE id = $id",
    { id },
  );

  const [user] = result.rows;

  if (!user) {
    throw new Error("User not found");
  }

  return c.json({
    data: {
      user,
    },
  });
};

const createUser = async (c: Context) => {
  const user = await c.req.json<User>();

  using client = await pool.connect();

  const result = await client.queryObject<number>(
    `
    INSERT INTO users (username, email, password)
    VALUES ($username, $email, $password) RETURNING id
    `,
    {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  );
  const [id] = result.rows;
  if (!id) throw new Error("Insert data failed");

  return c.json({
    data: {
      id,
    },
  });
};

export { createUser, getUser, getUsers };
