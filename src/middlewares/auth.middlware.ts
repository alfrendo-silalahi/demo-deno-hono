import { Context, Next } from "@hono/hono";

export const protect = (_c: Context, next: Next) => {
  console.log("auth middleware");
  next();
};
