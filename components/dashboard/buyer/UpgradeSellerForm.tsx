"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, Loader2, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { upgradeToSellerSchema, UpgradeToSellerFormData } from "@/schemas/user.schema";
import { toast } from "sonner";

interface UpgradeSellerFormProps {
  currentWhatsapp?:  string;
  onSubmit: (whatsapp: string, studentProofFile:  File) => Promise<void>;
}

export function UpgradeSellerForm({
  currentWhatsapp,
  onSubmit,
}:  UpgradeSellerFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [studentProofFile, setStudentProofFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpgradeToSellerFormData>({
    resolver: zodResolver(upgradeToSellerSchema),
    defaultValues: {
      whatsapp: currentWhatsapp || "",
      student_proof_url: "",
    },
  });

  const handleFileChange = (e: React. ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (! file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    if (!allowedTypes.includes(file. type)) {
      toast.error("File harus berupa gambar (JPG, PNG) atau PDF");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }

    setStudentProofFile(file);
    setValue("student_proof_url", file. name);
  };

  const removeFile = () => {
    setStudentProofFile(null);
    setValue("student_proof_url", "");
    if (fileInputRef.current) {
      fileInputRef. current.value = "";
    }
  };

  const handleFormSubmit = async (data: UpgradeToSellerFormData) => {
    if (!studentProofFile) {
      toast.error("Silakan upload bukti mahasiswa");
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(data.whatsapp, studentProofFile);
    } catch {
      // Error handled by parent
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* WhatsApp */}
      <div className="space-y-2">
        <Label htmlFor="whatsapp" className="text-[#4E1F00]">
          Nomor WhatsApp
        </Label>
        <Input
          id="whatsapp"
          {... register("whatsapp")}
          placeholder="08xxxxxxxxxx"
          className="border-[#E3D9BD] focus:border-[#FEBA17] focus:ring-[#FEBA17]"
        />
        <p className="text-xs text-[#74512D]">
          Nomor ini akan digunakan untuk komunikasi dengan pembeli
        </p>
        {errors.whatsapp && (
          <p className="text-xs text-red-500">{errors.whatsapp. message}</p>
        )}
      </div>

      {/* Student Proof Upload */}
      <div className="space-y-2">
        <Label className="text-[#4E1F00]">Bukti Mahasiswa (KTM/KRS)</Label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,. pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {! studentProofFile ?  (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed border-[#E3D9BD] rounded-lg cursor-pointer hover:bg-[#F8F4E1] transition-colors"
          >
            <Upload className="h-8 w-8 text-[#74512D]" />
            <p className="text-sm text-[#74512D] font-medium">
              Klik untuk upload bukti mahasiswa
            </p>
            <p className="text-xs text-[#74512D]/70">
              Format: JPG, PNG, atau PDF (Maks.  5MB)
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 bg-[#F8F4E1] border border-[#E3D9BD] rounded-lg">
            <FileText className="h-8 w-8 text-[#4E1F00]" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#4E1F00] truncate">
                {studentProofFile. name}
              </p>
              <p className="text-xs text-[#74512D]">
                {(studentProofFile. size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={removeFile}
              className="text-[#74512D] hover:text-red-500 hover:bg-red-50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {errors.student_proof_url && (
          <p className="text-xs text-red-500">{errors.student_proof_url.message}</p>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Informasi</h4>
        <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
          <li>Proses verifikasi membutuhkan waktu 1-3 hari kerja</li>
          <li>Pastikan bukti mahasiswa terlihat jelas dan valid</li>
          <li>Anda akan menerima notifikasi setelah akun diverifikasi</li>
        </ul>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#FEBA17] text-[#4E1F00] hover:bg-[#F5D36B] rounded-full"
      >
        {isLoading ?  (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Mengirim Permintaan...
          </>
        ) : (
          "Ajukan Upgrade ke Seller"
        )}
      </Button>
    </form>
  );
}
