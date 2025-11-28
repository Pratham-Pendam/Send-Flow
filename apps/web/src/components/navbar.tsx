"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  return (
    <header className="h-14 flex items-center justify-end px-6 bg-background gap-4">
      {user ? (
        <Link href={{ pathname: "/dashboard" }}>
          <div
            className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold cursor-pointer select-none"
            title={user?.userName || user?.email || "Account"}
          >
            {(user?.userName?.[0] || user?.email?.[0] || "U").toUpperCase()}
          </div>
        </Link>
      ) : (
        <>
          <Link href={{ pathname: "/sign-in" }}>
            <Button className="bg-indigo-300 text-md text-black font-semibold px-6 py-3 rounded-lg hover:bg-indigo-400 transition">
              Sign In
            </Button>
          </Link>

          <Link href={{ pathname: "/sign-up" }}>
            <Button className="bg-indigo-300 text-md text-black font-semibold px-6 py-3 rounded-lg hover:bg-indigo-400 transition">
              Sign Up
            </Button>
          </Link>
        </>
      )}

    </header>
  );
}
