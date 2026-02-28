export interface User {
  password: string;
  username: string;
  email: string;
}

export type AppEnv = {
  Variables: {
    user: User;
  };
};
