"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";

export function useWorkflows() {
  const accessToken = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ["workflows"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/v1/workflows/getAll", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      return res.data.data.workflows; // ⬅️ return array only
    },
    staleTime: 1000 * 60 * 5, // 5 min
    enabled: !!accessToken, // wait until logged-in
  });
}
