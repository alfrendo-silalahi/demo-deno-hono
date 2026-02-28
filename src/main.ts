import { Hono } from "@hono/hono";
import * as usersService from "./modules/users/users.service.ts";
import globalErrorHandler from "./errors/handlers/global-error.handler.ts";
import { protect } from "./middlewares/auth.middlware.ts";

const app = new Hono();

app.get("/", (c) => c.text("Welcome to Hono!"));
app.get("/api/users", protect, usersService.getUsers);
app.post("/api/users", protect, usersService.createUser);
app.get("/api/users/:id", protect, usersService.getUser);

app.onError(globalErrorHandler);

Deno.serve(app.fetch);
