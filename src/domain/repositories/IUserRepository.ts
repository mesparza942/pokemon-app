import { User } from "../models/User";

export interface IUserRepository {
  login(username: string, password: string): Promise<User | null>;
  logout(): Promise<void>;
}
