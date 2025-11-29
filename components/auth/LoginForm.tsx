"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginSchema, type LoginSchema } from "@/schemas/auth/login.schema";
import { loginAction } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginFormProps {
  className?: string;
}

export function LoginForm({ className }: LoginFormProps) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      credential: "",
      password: "",
      remember: true,
    },
  });

  const handleFormSubmit = (values: LoginSchema) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await loginAction(values);

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(result.success);
        // router.push("/dashboard");
        // router.refresh();
      }
    });
  };

  return (
    <form
      className={`space-y-4 ${className}`}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {/* Alert Error/Success */}
      {error && (
        <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm border border-red-100">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 rounded-md bg-green-50 text-green-600 text-sm border border-green-100">
          {success}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="credential">Email atau NIM</Label>
        <div className="flex items-center rounded-lg border border-[#E5DEC5] bg-white px-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FEBA17] focus-within:ring-offset-1">
          <Mail className="mr-2 h-4 w-4 text-[#B4A98C]" />
          <Input
            id="credential"
            type="text"
            disabled={isPending}
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
            disabled={isPending}
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
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            disabled={isPending}
            className="h-3.5 w-3.5 rounded border border-[#E5DEC5] text-[#FEBA17] focus:ring-[#FEBA17]"
            {...register("remember")}
          />
          <span>Ingat saya</span>
        </label>
        <button
          type="button"
          className="text-[#74512D] hover:underline font-medium"
        >
          Lupa password?
        </button>
      </div>

      <Button
        type="submit"
        size="lg"
        fullWidth
        disabled={isPending}
        className="mt-2"
      >
        {isPending ? "Memproses..." : "Masuk"}
      </Button>
    </form>
  );
}
