"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";
import { loginSchema, type LoginSchema } from "@/schemas/auth/login.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginFormProps {
  onSubmit?: (values: LoginSchema) => Promise<void> | void;
  loading?: boolean;
}

export function LoginForm({ onSubmit, loading }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      credential: "",
      password: "",
      remember: true,
    },
  });

  const submitting = loading ?? isSubmitting;

  const handleFormSubmit = async (values: LoginSchema) => {
    await onSubmit?.(values);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="space-y-1.5">
        <Label htmlFor="credential">Email atau NIM</Label>
        <div className="flex items-center rounded-lg border border-[#E5DEC5] bg-white px-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FEBA17] focus-within:ring-offset-1">
          <Mail className="mr-2 h-4 w-4 text-[#B4A98C]" />
          <Input
            id="credential"
            type="text"
            placeholder="contoh@gmail.com atau 2108xxxxxx"
            className="border-0 px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            {...register("credential")}
          />
        </div>
        {errors.credential && (
          <p className="text-xs text-red-600">{errors.credential.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <div className="flex items-center rounded-lg border border-[#E5DEC5] bg-white px-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FEBA17] focus-within:ring-offset-1">
          <Lock className="mr-2 h-4 w-4 text-[#B4A98C]" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="border-0 px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <p className="text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-[#7A6848]">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 rounded border border-[#E5DEC5] text-[#FEBA17]"
            {...register("remember")}
          />
          <span>Ingat saya</span>
        </label>
        <button type="button" className="text-[#74512D] hover:underline">
          Lupa password?
        </button>
      </div>

      <Button
        type="submit"
        size="lg"
        fullWidth
        disabled={submitting}
        className="mt-2"
      >
        {submitting ? "Memproses..." : "Masuk"}
      </Button>
    </form>
  );
}
