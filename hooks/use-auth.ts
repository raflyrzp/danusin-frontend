import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { User, LoginRequest, RegisterRequest, AuthResponse } from "@/types";

// Helper function to check if we're on an auth page
function isOnAuthPage(): boolean {
  if (typeof window === "undefined") return false;
  const currentPath = window.location.pathname;
  return currentPath.startsWith("/login") ||
         currentPath.startsWith("/register") ||
         currentPath.startsWith("/auth");
}

export function useAuth() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => apiClient.get<User>("/auth/me"),
    retry: false,
    staleTime: 5 * 60 * 1000,
    // Don't fetch on auth pages to prevent redirect loops
    enabled: !isOnAuthPage(),
  });

  return {
    user: data?.data || null,
    isLoading: isOnAuthPage() ? false : isLoading,
    isAuthenticated: !!data?.data,
    isError,
  };
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) =>
      apiClient.post<AuthResponse>("/auth/login", data),
    onSuccess: (response) => {
      if (response.data?.token) {
        apiClient.setToken(response.data.token);
      }
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterRequest) =>
      apiClient.post<AuthResponse>("/auth/register", data),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => Promise.resolve(),
    onSuccess: () => {
      apiClient.clearToken();
      queryClient.clear();
      window.location.href = "/login";
    },
  });
}
