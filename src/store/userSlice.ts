import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/domain/models/User";
import { UserService } from "@/application/usecases/UserService";
import { UserRepository } from "@/infrastructure/repositories/UserRepository";

// Instantiate UserService with its repository implementation
const userService = new UserService(new UserRepository());

interface UserState {
  currentUser: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "user/login",
  async (
    { username, password }: { username: string; password: string },
    thunkApi
  ) => {
    try {
      const user = await userService.login({ username, password });
      return user;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkApi) => {
    try {
      await userService.logout();
      return;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.isLoggedIn = false;
      });
  },
});

export default userSlice.reducer;
