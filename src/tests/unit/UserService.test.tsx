// src/tests/unit/LoginUseCase.test.ts
import { UserService } from "@/application/usecases/UserService";
import { IUserRepository } from "@/domain/repositories/IUserRepository";

const dummyUserRepository: IUserRepository = {
  login: async (username: string, password: string) => {
    // Simulate a valid login when correct credentials are provided
    if (username === "admin" && password === "admin") {
      return { id: 1, name: "Admin User", username };
    }
    // Return null if credentials are invalid, which our use case should handle
    return null;
  },
  logout: async () => Promise.resolve(),
};

describe("UserService", () => {
  const userService = new UserService(dummyUserRepository);

  it("should return a user for valid credentials", async () => {
    const user = await userService.login({
      username: "admin",
      password: "admin",
    });
    expect(user).toHaveProperty("id", 1);
    expect(user.name).toBe("Admin User");
  });

  it("should throw an error for invalid credentials", async () => {
    await expect(
      userService.login({
        username: "wrong",
        password: "wrong",
      })
    ).rejects.toThrow("Invalid credentials");
  });
});
