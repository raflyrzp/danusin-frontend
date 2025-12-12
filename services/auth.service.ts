import { apiClient } from "@/lib/api-client";
import type { User, AuthResponse, LoginRequest, RegisterRequest } from "@/types";

export const authService = {
  /**
   * Login
   */
  login: async (data: LoginRequest) => {
    const response = await apiClient.post<AuthResponse>("/auth/login", data);
    if (response.data?. token) {
      apiClient.setToken(response.data. token);
    }
    return response;
  },

  /**
   * Register
   */
  register: async (data: RegisterRequest) => {
    const response = await apiClient. post<AuthResponse>("/auth/register", data);
    if (response.data?. token) {
      apiClient.setToken(response.data. token);
    }
    return response;
  },

  /**
   * Get current user profile
   */
  getProfile: async () => {
    return await apiClient.get<{ user: User }>("/auth/profile");
  },

  /**
   * Logout
   */
  logout: () => {
    apiClient.clearToken();
  },

  /**
   * Check if authenticated
   */
  isAuthenticated: () => {
    return !!apiClient. getAuthToken();
  },
};
