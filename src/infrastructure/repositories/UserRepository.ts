import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { User } from "@/domain/models/User";
import { loginUser } from "../api/userApi";

export class UserRepository implements IUserRepository {
  async login(username: string, password: string): Promise<User | null> {
    return loginUser({ username, password });
  }

  async logout(): Promise<void> {
    // We can add more logic here that we want to happen whenever the user logs out
    return Promise.resolve();
  }
}
