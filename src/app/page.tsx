"use client";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { redirect } from "next/navigation";

export default function Home() {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  if (isLoggedIn) {
    redirect("/pokemon");
  } else {
    redirect("/login");
  }
}
