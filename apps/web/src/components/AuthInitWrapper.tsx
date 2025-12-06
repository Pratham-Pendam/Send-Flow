"use client";

import { useAuthInit } from "@/hooks/useAuthInit";


export default function AuthInitWrapper() {
  useAuthInit();
  return null;
}
