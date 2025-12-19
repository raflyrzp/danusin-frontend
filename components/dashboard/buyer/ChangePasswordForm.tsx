"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePasswordSchema, ChangePasswordFormData } from "@/schemas/user.schema";

interface ChangePasswordFormProps {
  onSubmit: (currentPassword: string, newPassword: string) => Promise<void>;
}

export function ChangePasswordForm({ onSubmit }: ChangePasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const handleFormSubmit = async (data: ChangePasswordFormData) => {
    setIsLoading(true);
    try {
      await onSubmit(data.currentPassword, data.newPassword);
      reset();
    } catch {
      // Error handled by parent
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Current Password */}
      <div className="space-y-2">
        <Label htmlFor="currentPassword" className="text-[#4E1F00]">
          Password Saat Ini
        </Label>
        <div className="relative">
          <Input
            id="currentPassword"
            type={showPasswords.current ? "text" : "password"}
            {...register("currentPassword")}
            className="border-[#E3D9BD] focus:border-[#FEBA17] focus:ring-[#FEBA17] pr-10"
            placeholder="Masukkan password saat ini"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("current")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#74512D] hover:text-[#4E1F00]"
          >
            {showPasswords.current ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.currentPassword && (
          <p className="text-xs text-red-500">{errors.currentPassword.message}</p>
        )}
      </div>

      {/* New Password */}
      <div className="space-y-2">
        <Label htmlFor="newPassword" className="text-[#4E1F00]">
          Password Baru
        </Label>
        <div className="relative">
          <Input
            id="newPassword"
            type={showPasswords.new ? "text" : "password"}
            {...register("newPassword")}
            className="border-[#E3D9BD] focus:border-[#FEBA17] focus:ring-[#FEBA17] pr-10"
            placeholder="Minimal 8 karakter"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("new")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#74512D] hover:text-[#4E1F00]"
          >
            {showPasswords.new ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.newPassword && (
          <p className="text-xs text-red-500">{errors.newPassword.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-[#4E1F00]">
          Konfirmasi Password Baru
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showPasswords.confirm ? "text" : "password"}
            {...register("confirmPassword")}
            className="border-[#E3D9BD] focus:border-[#FEBA17] focus:ring-[#FEBA17] pr-10"
            placeholder="Ulangi password baru"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("confirm")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#74512D] hover:text-[#4E1F00]"
          >
            {showPasswords.confirm ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="bg-[#FEBA17] text-[#4E1F00] hover:bg-[#F5D36B] rounded-full px-8"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Menyimpan...
          </>
        ) : (
          "Ubah Password"
        )}
      </Button>
    </form>
  );
}
