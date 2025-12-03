"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

export default function Navbar({ compact = false }: { compact?: boolean }) {
  const user = useAuthStore((s) => s.user);
  return (
    <header
      className={
        `${compact ? "h-12 px-4 gap-3" : "h-14 px-6 gap-4"} flex items-center bg-background/95 backdrop-blur`
      }
    >
      <div className={`flex w-full items-center justify-end`}>
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
          <div className="flex items-center gap-2">
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
          </div>
        )}
      </div>

    </header>
  );
}
