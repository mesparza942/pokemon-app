import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/models/User";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<User> {
    const user = await this.userRepository.login(username, password);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    return user;
  }

  async logout(): Promise<void> {
    return this.userRepository.logout();
  }
}
