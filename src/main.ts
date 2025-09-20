import { Hono } from "@hono/hono";
import * as usersService from "./modules/users/users.service.ts";
import globalErrorHandler from "./errors/handlers/global-error.handler.ts";

const app = new Hono();

app.get("/", (c) => c.text("Welcome to Hono!"));
app.get("/api/users", usersService.getUsers);
app.post("/api/users", usersService.createUser);
app.get("/api/users/:id", usersService.getUser);

app.onError(globalErrorHandler);

Deno.serve(app.fetch);
