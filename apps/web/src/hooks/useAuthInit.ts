"use client";

import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export const useAuthInit = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/auth/me", {
          withCredentials: true,
        });

        if (res.data?.user) {
          setAuth(res.data.user, ""); // Store user, access token managed by refresh flow
        }
      } catch (err) {
        console.log("Not authenticated");
      }
    };

    loadUser();
  }, []);
};
