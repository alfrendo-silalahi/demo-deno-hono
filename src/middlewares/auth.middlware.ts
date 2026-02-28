import { Context, Next } from "@hono/hono";
import { verify } from "@hono/hono/jwt";

const secret = Deno.env.get("JWT_SECRET") || "";

export const protect = async (c: Context, next: Next) => {
  const authorization = c.req.header("Authorization");
  if (authorization === undefined || !authorization.startsWith("Bearer "))
    throw Error("Auhentication failed.");

  const token = authorization.substring(7);

  const payload = await verify(token, secret, "HS256");
  console.log(payload);

  await next();
};
