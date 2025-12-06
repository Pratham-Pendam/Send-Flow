import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

interface SignInPayload {
  email: string;
  password: string;
}

interface SignInResponse {
  user: any;
  accessToken: string;
}

export function useSignIn(
  options?: UseMutationOptions<SignInResponse, any, SignInPayload>
) {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation<SignInResponse, any, SignInPayload>({
    mutationFn: async (data) => {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/signin",
        data,
        { withCredentials: true }
      );
      return res.data;
    },
    ...options,
    onSuccess: (res, variables, context, mutation) => {
      const user = (res as any)?.user ?? (res as any)?.data?.user;
      const token = (res as any)?.accessToken ?? (res as any)?.data?.accessToken;
      if (user) {
        setAuth(user, token || "");
      }
      options?.onSuccess?.(res, variables, context, mutation);
    },
    onError: (err, variables, context, mutation) => {
      options?.onError?.(err, variables, context, mutation);
    },
  });
}
