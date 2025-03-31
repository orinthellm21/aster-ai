import { User } from './model.types';

export type RegisterResponse = {
  user: User;
  jwt: string;
};
