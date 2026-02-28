import { Context, Next } from "@hono/hono";
import { verify } from "@hono/hono/jwt";
import { AlgorithmTypes } from "@hono/hono/utils/jwt/jwa";
import pool from "../config/pg.config.ts";
import { JWTPayload } from "@hono/hono/utils/jwt/types";
import { User } from "../types/types.ts";

const secret = Deno.env.get("JWT_SECRET_KEY") || "";

export const protect = async (c: Context, next: Next) => {
  const authorization = c.req.header("Authorization");
  if (authorization === undefined || !authorization.startsWith("Bearer ")) {
    throw Error("Auhentication failed.");
  }

  const token = authorization.substring(7);
  const payload = await verify(
    token,
    secret,
    AlgorithmTypes.HS256,
  ) as CustomJwtPayload;

  console.log({ payload });

  const client = await pool.connect();
  const result = await client.queryObject<
    User
  >(
    `
    SELECT username, email, password
    FROM "user"
    WHERE username = $username
    `,
    {
      username: payload.username,
    },
  );

  const [user] = result.rows;
  if (!user) throw new Error("User not found.");

  c.set("user", user);
  await next();
};

type CustomJwtPayload = JWTPayload & {
  username: string;
};
