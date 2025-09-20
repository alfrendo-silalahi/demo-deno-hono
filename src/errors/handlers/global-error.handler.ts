import { Context } from "@hono/hono";

const globalErrorHandler = (err: Error, c: Context) => {
  return c.json(
    {
      error: {
        message: err.message,
      },
    },
    500,
  );
};

export default globalErrorHandler;
