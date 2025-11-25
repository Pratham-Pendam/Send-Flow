"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="h-14 flex items-center justify-end px-6 bg-background gap-4">
      
      <Link href={{ pathname: "/signin" }}>
        <Button className="bg-indigo-300 text-md text-black font-semibold px-6 py-3 rounded-lg hover:bg-indigo-400 transition">
          Sign In
        </Button>
      </Link>

      <Link href={{ pathname: "/signup" }}>
        <Button className="bg-indigo-300 text-md text-black font-semibold px-6 py-3 rounded-lg hover:bg-indigo-400 transition">
          Sign Up
        </Button>
      </Link>

    </header>
  );
}
