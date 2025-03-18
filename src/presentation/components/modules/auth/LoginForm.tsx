"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/userSlice";
import type { RootState, AppDispatch } from "@/store";
import { Button, Input } from "@/presentation/components/common";
import { redirect } from "next/navigation";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isLoggedIn } = useSelector(
    (state: RootState) => state.user
  );
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      redirect("/pokemon");
    }
  }, [isLoggedIn]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  const handleBlurUsername = () => {
    if (!username) {
      setUsernameError("Username required");
    } else {
      setUsernameError("");
    }
  };
  const handleBlurPassword = () => {
    if (!password) {
      setPasswordError("Password required");
    } else {
      setPasswordError("");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 items-center justify-center"
      >
        <Input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={handleBlurUsername}
          error={usernameError}
          required
        />
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handleBlurPassword}
          error={passwordError}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default LoginForm;
