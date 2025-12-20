"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Phone,
  User,
  Building2,
  BookOpen,
  Calendar,
} from "lucide-react";
import {
  registerSchema,
  type RegisterSchema,
} from "@/schemas/auth/register.schema";
import { registerAction } from "@/actions/auth/register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RegisterForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      nim: "",
      email: "",
      whatsapp: "",
      faculty: "",
      major: "",
      password: "",
      confirmPassword: "",
      batch_year: "",
      agree: false,
    },
  });

  const handleFormSubmit = (values: any) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await registerAction(values as RegisterSchema);

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(result.success);
        setTimeout(() => router.push("/login"), 2000);
      }
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
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

      {/* Nama & NIM (Tetap 2 kolom / grid) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Nama Lengkap</Label>
          <div className="flex items-center rounded-lg border border-[#E5DEC5] bg-white px-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FEBA17] focus-within:ring-offset-1">
            <User className="mr-2 h-4 w-4 text-[#B4A98C]" />
            <Input
              id="name"
              disabled={isPending}
              className="border-0 px-0 shadow-none focus-visible:ring-0"
              placeholder="Fulan"
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-600">
              {errors.name.message as string}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="nim">NIM</Label>
          <div className="flex items-center rounded-lg border border-[#E5DEC5] bg-white px-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FEBA17] focus-within:ring-offset-1">
            <span className="mr-2 text-xs font-bold text-[#B4A98C]">#</span>
            <Input
              id="nim"
              disabled={isPending}
              className="border-0 px-0 shadow-none focus-visible:ring-0"
              placeholder="1313xxxx"
              {...register("nim")}
            />
          </div>
          {errors.nim && (
            <p className="text-xs text-red-600">
              {errors.nim.message as string}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <div className="flex items-center rounded-lg border border-[#E5DEC5] bg-white px-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FEBA17] focus-within:ring-offset-1">
          <Mail className="mr-2 h-4 w-4 text-[#B4A98C]" />
          <Input
            id="email"
            type="email"
            disabled={isPending}
            className="border-0 px-0 shadow-none focus-visible:ring-0"
            placeholder="email@example.com"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-red-600">
            {errors.email.message as string}
          </p>
        )}
      </div>

      {/* WhatsApp */}
      <div className="space-y-1.5">
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <div className="flex items-center rounded-lg border border-[#E5DEC5] bg-white px-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FEBA17] focus-within:ring-offset-1">
          <Phone className="mr-2 h-4 w-4 text-[#B4A98C]" />
          <Input
            id="whatsapp"
            type="tel"
            disabled={isPending}
            className="border-0 px-0 shadow-none focus-visible:ring-0"
            placeholder="08xxxxxxxxxx"
            {...register("whatsapp")}
          />
        </div>
        {errors.whatsapp && (
          <p className="text-xs text-red-600">
            {errors.whatsapp.message as string}
          </p>
        )}
      </div>

      {/* --- BAGIAN AKADEMIK (DIUBAH KE SINGLE ROW) --- */}

      {/* Row 1: Fakultas */}
      <div className="space-y-1.5">
        <Label>Fakultas</Label>
        <Select
          onValueChange={(val) => setValue("faculty", val)}
          disabled={isPending}
        >
          <SelectTrigger className="border-[#E5DEC5] bg-white focus:ring-[#FEBA17] w-full">
            <div className="flex items-center">
              <Building2 className="mr-2 h-4 w-4 text-[#B4A98C]" />
              <SelectValue placeholder="Pilih Fakultas" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="FIP" className="hover:bg-[#E5DEC5]">
              Fakultas Ilmu Pendidikan (FIP)
            </SelectItem>
            <SelectItem value="FBS" className="hover:bg-[#E5DEC5]">
              Fakultas Bahasa dan Seni (FBS)
            </SelectItem>
            <SelectItem value="FMIPA" className="hover:bg-[#E5DEC5]">
              Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)
            </SelectItem>
            <SelectItem value="FIS" className="hover:bg-[#E5DEC5]">
              Fakultas Ilmu Sosial dan Hukum (FISH)
            </SelectItem>
            <SelectItem value="FIO" className="hover:bg-[#E5DEC5]">
              Fakultas Ilmu Olahraga (FIO)
            </SelectItem>
            <SelectItem value="FT" className="hover:bg-[#E5DEC5]">
              Fakultas Teknik (FT)
            </SelectItem>
            <SelectItem value="FE" className="hover:bg-[#E5DEC5]">
              Fakultas Ekonomi (FE)
            </SelectItem>
            <SelectItem value="FPPsi" className="hover:bg-[#E5DEC5]">
              Fakultas Pendidikan Psikologi (FPPsi)
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.faculty && (
          <p className="text-xs text-red-600">
            {errors.faculty.message as string}
          </p>
        )}
      </div>

      {/* Row 2: Jurusan */}
      <div className="space-y-1.5">
        <Label>Jurusan</Label>
        <div className="flex items-center rounded-lg border border-[#E5DEC5] bg-white px-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FEBA17]">
          <BookOpen className="mr-2 h-4 w-4 text-[#B4A98C]" />
          <Input
            id="major"
            disabled={isPending}
            className="border-0 px-0 shadow-none focus-visible:ring-0"
            placeholder="Informatika"
            {...register("major")}
          />
        </div>
        {errors.major && (
          <p className="text-xs text-red-600">
            {errors.major.message as string}
          </p>
        )}
      </div>

      {/* Row 3: Angkatan */}
      <div className="space-y-1.5">
        <Label htmlFor="batch_year">Angkatan</Label>
        <div className="flex items-center rounded-lg border border-[#E5DEC5] bg-white px-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FEBA17]">
          <Calendar className="mr-2 h-4 w-4 text-[#B4A98C]" />
          <Input
            id="batch_year"
            type="text"
            disabled={isPending}
            className="border-0 px-0 shadow-none focus-visible:ring-0"
            placeholder="2021"
            {...register("batch_year")}
          />
        </div>
        {errors.batch_year && (
          <p className="text-xs text-red-600">
            {errors.batch_year.message as string}
          </p>
        )}
      </div>

      {/* --- AKHIR BAGIAN AKADEMIK --- */}

      {/* Password (Tetap 2 kolom / grid) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="flex items-center rounded-lg border border-[#E5DEC5] bg-white px-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FEBA17] focus-within:ring-offset-1">
            <Lock className="mr-2 h-4 w-4 text-[#B4A98C]" />
            <Input
              id="password"
              type="password"
              disabled={isPending}
              className="border-0 px-0 shadow-none focus-visible:ring-0"
              placeholder="Min 8 karakter"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="text-xs text-red-600">
              {errors.password.message as string}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Konfirmasi</Label>
          <div className="flex items-center rounded-lg border border-[#E5DEC5] bg-white px-3 shadow-sm focus-within:ring-2 focus-within:ring-[#FEBA17] focus-within:ring-offset-1">
            <Lock className="mr-2 h-4 w-4 text-[#B4A98C]" />
            <Input
              id="confirmPassword"
              type="password"
              disabled={isPending}
              className="border-0 px-0 shadow-none focus-visible:ring-0"
              placeholder="Ulangi password"
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-600">
              {errors.confirmPassword.message as string}
            </p>
          )}
        </div>
      </div>

      {/* Checkbox */}
      <div className="space-y-1 text-xs text-[#7A6848]">
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            className="mt-[3px] h-3.5 w-3.5 rounded border border-[#E5DEC5] text-[#FEBA17]"
            disabled={isPending}
            {...register("agree")}
          />
          <span>
            Saya menyetujui{" "}
            <span className="font-semibold underline">Syarat & Ketentuan</span>
          </span>
        </label>
        {errors.agree && (
          <p className="text-xs text-red-600">
            {errors.agree.message as string}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        fullWidth
        disabled={isPending}
        className="mt-1"
      >
        {isPending ? "Memproses..." : "Daftar"}
      </Button>
    </form>
  );
}
