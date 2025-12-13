"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateEmailSchema, UpdateEmailFormData } from "@/schemas/user.schema";

interface ChangeEmailDialogProps {
  currentEmail: string;
  onSubmit: (email: string, password: string) => Promise<void>;
}

export function ChangeEmailDialog({
  currentEmail,
  onSubmit,
}: ChangeEmailDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateEmailFormData>({
    resolver: zodResolver(updateEmailSchema),
  });

  const handleFormSubmit = async (data: UpdateEmailFormData) => {
    setIsLoading(true);
    try {
      await onSubmit(data.email, data.password);
      setOpen(false);
      reset();
    } catch {
      // Error handled by parent
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      reset();
    }
  };

  // Mask email for display
  const maskEmail = (email: string): string => {
    const [localPart, domain] = email.split("@");
    if (! domain) return email;
    const maskedLocal = localPart. charAt(0) + "*".repeat(Math.max(localPart.length - 1, 3));
    return `${maskedLocal}@${domain}`;
  };

  return (
    <div className="space-y-2">
      <Label className="text-[#4E1F00]">Email</Label>
      <div className="flex items-center gap-2">
        <Input
          value={maskEmail(currentEmail)}
          disabled
          className="border-[#E3D9BD] bg-gray-50"
        />
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="link"
              className="text-[#FEBA17] hover:text-[#4E1F00] text-sm p-0 h-auto"
            >
              Change
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#F8F4E1] sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[#4E1F00]">Ubah Email</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newEmail" className="text-[#4E1F00]">
                  Email Baru
                </Label>
                <Input
                  id="newEmail"
                  type="email"
                  {...register("email")}
                  className="border-[#E3D9BD]"
                  placeholder="email@example.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors. email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailPassword" className="text-[#4E1F00]">
                  Password untuk Verifikasi
                </Label>
                <Input
                  id="emailPassword"
                  type="password"
                  {... register("password")}
                  className="border-[#E3D9BD]"
                  placeholder="Masukkan password Anda"
                />
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password. message}</p>
                )}
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  className="border-[#E3D9BD]"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#FEBA17] text-[#4E1F00] hover:bg-[#F5D36B]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
