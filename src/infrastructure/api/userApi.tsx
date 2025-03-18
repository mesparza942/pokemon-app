import { User } from "@/domain/models/User";

const mockedUser = {
  id: 1,
  name: "Admin User",
  username: "admin",
  password: "admin",
};
export const loginUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<User | null> => {
  if (username === mockedUser.username && password === mockedUser.password) {
    return { id: mockedUser.id, name: mockedUser.name, username };
  }
  return null;
};
