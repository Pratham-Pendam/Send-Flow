"use client";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export function useSignUp(
  options?: UseMutationOptions<any, any, { userName: string; email: string; password: string }>
) {
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: { userName: string; email: string; password: string }) => {
      const res = await axios.post("http://localhost:3000/api/v1/auth/signup", data, {
        withCredentials: true,  // 🔥 important for refresh token cookie
      });
      return res.data; // { message, data: { user, accessToken } }
    },

    ...options,
    onSuccess: (res, variables, context, mutation) => {
      const { user, accessToken } = res;
      setAuth(user, accessToken); // store to zustand
      console.log("Signup success:", user);
      router.push("/dashboard");
      options?.onSuccess?.(res, variables, context, mutation);
    },

    onError: (err: any, variables, context, mutation) => {
      console.error("Signup failed:", err?.response?.data || err.message);
      options?.onError?.(err, variables, context, mutation);
    }
  });
}
