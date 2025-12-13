"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { profileSchema, ProfileFormData } from "@/schemas/user.schema";
import { User } from "@/types";

interface ProfileFormProps {
  user: User;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  isLoading:  boolean;
}

export function ProfileForm({ user, onSubmit, isLoading }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState:  { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues:  {
      name: user.name,
      whatsapp: user.whatsapp,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* NIM (Read only) */}
      <div className="space-y-2">
        <Label className="text-[#4E1F00]">NIM</Label>
        <Input
          value={user.nim}
          disabled
          className="border-[#E3D9BD] bg-gray-50"
        />
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-[#4E1F00]">
          Nama
        </Label>
        <Input
          id="name"
          {...register("name")}
          className="border-[#E3D9BD] focus:border-[#FEBA17] focus:ring-[#FEBA17]"
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Major (Read only) */}
      <div className="space-y-2">
        <Label className="text-[#4E1F00]">Jurusan</Label>
        <Input
          value={user.major}
          disabled
          className="border-[#E3D9BD] bg-gray-50"
        />
      </div>

      {/* Faculty (Read only) */}
      <div className="space-y-2">
        <Label className="text-[#4E1F00]">Fakultas</Label>
        <Input
          value={user.faculty}
          disabled
          className="border-[#E3D9BD] bg-gray-50"
        />
      </div>

      {/* Batch Year (Read only) */}
      <div className="space-y-2">
        <Label className="text-[#4E1F00]">Angkatan</Label>
        <Input
          value={user. batch_year. toString()}
          disabled
          className="border-[#E3D9BD] bg-gray-50"
        />
      </div>

      {/* WhatsApp */}
      <div className="space-y-2">
        <Label htmlFor="whatsapp" className="text-[#4E1F00]">
          WhatsApp
        </Label>
        <Input
          id="whatsapp"
          {...register("whatsapp")}
          placeholder="08xxxxxxxxxx"
          className="border-[#E3D9BD] focus:border-[#FEBA17] focus:ring-[#FEBA17]"
        />
        {errors. whatsapp && (
          <p className="text-xs text-red-500">{errors.whatsapp.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading || !isDirty}
        className="bg-[#FEBA17] text-[#4E1F00] hover:bg-[#F5D36B] rounded-full px-8"
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
    </form>
  );
}
