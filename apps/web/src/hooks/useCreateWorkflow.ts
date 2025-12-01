import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";
import { useWorkflowStore } from "@/store/workflow.store";
import { useAuthStore } from "@/store/useAuthStore";

interface CreateWorkflowPayload {
  name: string;
}

interface CreateWorkflowResponse {
  data: {
    id: string;
    name: string;
    createdAt: string;
  };
  message: string;
}

export function useCreateWorkflow(
  options?: UseMutationOptions<CreateWorkflowResponse, any, CreateWorkflowPayload>
) {
  const addWorkflow = useWorkflowStore((s) => s.addWorkflow);
  const token = useAuthStore((s) => s.token);

  return useMutation<CreateWorkflowResponse, any, CreateWorkflowPayload>({
    mutationFn: async (payload) => {
      const doRequest = async (bearer?: string) => {
        const res = await axios.post(
          "http://localhost:3000/api/v1/workflow/create",
          payload,
          {
            withCredentials: true,
            headers: bearer ? { Authorization: `Bearer ${bearer}` } : token ? { Authorization: `Bearer ${token}` } : undefined,
          }
        );
        return res.data as CreateWorkflowResponse;
      };

      try {
        return await doRequest();
      } catch (err: any) {
        const status = err?.response?.status;
        const msg = err?.response?.data?.message;
        const shouldRefresh = status === 401 || msg === "Invalid or expired token";
        if (!shouldRefresh) throw err;

        // Try to refresh access token using refresh cookie
        try {
          const refreshRes = await axios.get(
            "http://localhost:3000/api/v1/auth/refresh",
            { withCredentials: true }
          );
          const newToken: string | undefined = refreshRes?.data?.data?.accessToken ?? refreshRes?.data?.accessToken;
          if (newToken) {
            const current = useAuthStore.getState();
            if (current.user) {
              current.setAuth(current.user, newToken);
            }
            return await doRequest(newToken);
          }
        } catch (_) {
          // fallthrough to throw original error
        }
        throw err;
      }
    },

    ...options,

    onSuccess: (res, variables, context, mutation) => {
      const workflow = (res as any)?.data ?? (res as any);
      if (workflow) addWorkflow(workflow);

      options?.onSuccess?.(res, variables, context, mutation);
    },

    onError: (err, variables, context, mutation) => {
      options?.onError?.(err, variables, context, mutation);
    }
  });
}
