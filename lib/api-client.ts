import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import type { ApiError, ApiResponse } from "@/types";
import { config } from "./config";

class ApiClient {
  private client: AxiosInstance;
  private static instance: ApiClient;

  private constructor() {
    this.client = axios.create({
      baseURL: config.api.baseUrl,
      timeout: config.api.timeout,
      headers: { "Content-Type": "application/json" },
    });
    this.setupInterceptors();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) ApiClient.instance = new ApiClient();
    return ApiClient.instance;
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.getToken();
        if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (res: AxiosResponse) => res,
      async (err: AxiosError<ApiError>) => {
        if (err.response?.status === 401) {
          this.clearToken();
          if (typeof window !== "undefined") {
            const path = window.location.pathname;
            if (!["/login", "/register", "/auth"].some(p => path.startsWith(p))) {
              window.location.href = "/login";
            }
          }
        }
        const msg = err.response?.data?.message || err.message || "Terjadi kesalahan pada server";
        return Promise.reject({ status: false, message: msg, statusCode: err.response?.status, errors: err.response?.data?.errors });
      }
    );
  }

  private getToken = () => typeof window !== "undefined" ? localStorage.getItem("token") : null;
  public setToken = (token: string) => typeof window !== "undefined" && localStorage.setItem("token", token);
  public clearToken = () => typeof window !== "undefined" && localStorage.removeItem("token");
  public getAuthToken = () => this.getToken();

  async get<T>(url: string, cfg?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return (await this.client.get<ApiResponse<T>>(url, cfg)).data;
  }

  async post<T>(url: string, data?: any, cfg?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return (await this.client.post<ApiResponse<T>>(url, data, cfg)).data;
  }

  async put<T>(url: string, data?: any, cfg?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return (await this.client.put<ApiResponse<T>>(url, data, cfg)).data;
  }

  async patch<T>(url: string, data?: any, cfg?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return (await this.client.patch<ApiResponse<T>>(url, data, cfg)).data;
  }

  async delete<T>(url: string, cfg?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return (await this.client.delete<ApiResponse<T>>(url, cfg)).data;
  }
}

export const apiClient = ApiClient.getInstance();
