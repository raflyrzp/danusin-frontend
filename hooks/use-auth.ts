import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import type { LoginRequest, RegisterRequest } from "@/types";
import { ROUTES } from "@/constants/routes";

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: profileData, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["auth", "profile"],
    queryFn: () => authService. getProfile(),
    enabled: authService.isAuthenticated(),
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      router.push(ROUTES.HOME);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authService. register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      router.push(ROUTES.HOME);
    },
  });

  const logout = () => {
    authService.logout();
    queryClient.clear();
    router. push(ROUTES. LOGIN);
  };

  return {
    user: profileData?. data?.user,
    isLoading: isLoadingProfile,
    isAuthenticated: authService.isAuthenticated(),
    login: loginMutation. mutateAsync,
    loginError: loginMutation. error,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation. mutateAsync,
    registerError: registerMutation.error,
    isRegistering: registerMutation.isPending,
    logout,
  };
}
