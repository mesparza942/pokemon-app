"use client";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/userSlice";
import type { AppDispatch, RootState } from "@/store";
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
  };

  return (
    <Button type="button" onClick={handleSubmit} btnType="secondary">
      Logout
    </Button>
  );
};

export default LogoutButton;
