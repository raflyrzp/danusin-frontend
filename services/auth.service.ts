import { apiClient } from "@/lib/api-client";
import type {
  User,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "@/types";

export const authService = {
  login: async (data: LoginRequest) => {
    const res = await apiClient.post<AuthResponse>("/auth/login", data);
    if (res.data?.token) apiClient.setToken(res.data.token);
    return res;
  },
  register: async (data: RegisterRequest) => {
    const res = await apiClient.post<AuthResponse>("/auth/register", data);
    if (res.data?.token) apiClient.setToken(res.data.token);
    return res;
  },
  getProfile: () => apiClient.get<{ user: User }>("/auth/me"),
  logout: () => apiClient.clearToken(),
  isAuthenticated: () => !!apiClient.getAuthToken(),
};
