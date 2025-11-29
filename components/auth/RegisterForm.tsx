"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Phone, User } from "lucide-react";
import {
  registerSchema,
  type RegisterSchema,
} from "@/schemas/auth/register.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RegisterFormProps {
  onSubmit?: (values: RegisterSchema) => Promise<void> | void;
  loading?: boolean;
}

export function RegisterForm({ onSubmit, loading }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
  });

  const submitting = loading ?? isSubmitting;

  const handleFormSubmit = async (values: RegisterSchema) => {
    await onSubmit?.(values);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="space-y-1.5">
        <Label htmlFor="name">Nama Lengkap</Label>
        <div className="flex items-center rounded-lg border border-[#E5DEC5] bg-white px-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FEBA17] focus-within:ring-offset-1">
          <User className="mr-2 h-4 w-4 text-[#B4A98C]" />
          <Input
            id="name"
            placeholder="Nama lengkap"
            className="border-0 px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            {...register("name")}
          />
        </div>
        {errors.name && (
          <p className="text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <div className="flex items-center rounded-lg border border-[#E5DEC5] bg-white px-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FEBA17] focus-within:ring-offset-1">
          <Mail className="mr-2 h-4 w-4 text-[#B4A98C]" />
          <Input
            id="email"
            type="email"
            placeholder="contoh@gmail.com"
            className="border-0 px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone">Nomor Telepon</Label>
        <div className="flex items-center rounded-lg border border-[#E5DEC5] bg-white px-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FEBA17] focus-within:ring-offset-1">
          <Phone className="mr-2 h-4 w-4 text-[#B4A98C]" />
          <Input
            id="phone"
            type="tel"
            placeholder="08xxxxxxxxxx"
            className="border-0 px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            {...register("phone")}
          />
        </div>
        {errors.phone && (
          <p className="text-xs text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="flex items-center rounded-lg border border-[#E5DEC5] bg-white px-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FEBA17] focus-within:ring-offset-1">
            <Lock className="mr-2 h-4 w-4 text-[#B4A98C]" />
            <Input
              id="password"
              type="password"
              placeholder="Minimal 8 karakter"
              className="border-0 px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="text-xs text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
          <div className="flex items-center rounded-lg border border-[#E5DEC5] bg-white px-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FEBA17] focus-within:ring-offset-1">
            <Lock className="mr-2 h-4 w-4 text-[#B4A98C]" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Ulangi password"
              className="border-0 px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1 text-xs text-[#7A6848]">
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            className="mt-[3px] h-3.5 w-3.5 rounded border border-[#E5DEC5] text-[#FEBA17]"
            {...register("agree")}
          />
          <span>
            Saya menyetujui{" "}
            <button
              type="button"
              className="font-semibold underline underline-offset-2"
            >
              Syarat &amp; Ketentuan
            </button>{" "}
            dan{" "}
            <button
              type="button"
              className="font-semibold underline underline-offset-2"
            >
              Kebijakan Privasi
            </button>
          </span>
        </label>
        {errors.agree && (
          <p className="text-xs text-red-600">{errors.agree.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        fullWidth
        disabled={submitting}
        className="mt-1"
      >
        {submitting ? "Memproses..." : "Daftar"}
      </Button>
    </form>
  );
}
