import { Hono } from "@hono/hono";
import * as usersService from "./modules/users/users.service.ts";
import globalErrorHandler from "./errors/handlers/global-error.handler.ts";
import { protect } from "./middlewares/auth.middlware.ts";
import { AppEnv } from "./types/types.ts";
import { sign } from "@hono/hono/jwt";

const app = new Hono<AppEnv>();

app.get("/", (c) => c.text("Welcome to Hono!"));
app.get("/token", async (c) => {
  const token = await sign({
    username: "alfrendo-silalahi",
    email: "alfrendosilalahi@mail.com",
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  }, Deno.env.get("JWT_SECRET_KEY") || "");

  return c.json({
    token,
  });
});
app.get("/me", protect, (c) => {
  const user = c.get("user");
  return c.json({
    message: "Hello world",
    me: user,
  });
});
app.get("/api/users", protect, usersService.getUsers);
app.post("/api/users", protect, usersService.createUser);
app.get("/api/users/:id", protect, usersService.getUser);

app.onError(globalErrorHandler);

Deno.serve(app.fetch);
