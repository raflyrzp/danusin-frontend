import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { User, LoginRequest, RegisterRequest, AuthResponse } from "@/types";

const isAuthPage = () => typeof window !== "undefined" && ["/login", "/register", "/auth"].some(p => window.location.pathname.startsWith(p));

export function useAuth() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => apiClient.get<User>("/auth/me"),
    retry: false,
    staleTime: 300000,
    enabled: !isAuthPage(),
  });
  return { user: data?.data || null, isLoading: isAuthPage() ? false : isLoading, isAuthenticated: !!data?.data, isError };
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginRequest) => apiClient.post<AuthResponse>("/auth/login", data),
    onSuccess: (res) => {
      if (res.data?.token) apiClient.setToken(res.data.token);
      qc.invalidateQueries({ queryKey: ["auth"] });
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterRequest) => apiClient.post<AuthResponse>("/auth/register", data),
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => apiClient.clearToken(),
    onSuccess: () => {
      qc.clear();
      window.location.href = "/login";
    },
  });
}
