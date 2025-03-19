"use client";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/userSlice";
import type { AppDispatch, RootState } from "@/store";
import { persistor } from "@/store";
import { Button } from "@/presentation/components/common";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const LogoutButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!isLoggedIn) {
      redirect("/login");
    }
  }, [isLoggedIn]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(logoutUser());
    persistor.purge(); // Clear 'user' item from localStorage
  };

  return (
    <Button
      type="button"
      onClick={handleSubmit}
      btnType="secondary"
      className="absolute right-4 top-4"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
