"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Store, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/hooks/use-user";
import { toast } from "sonner";

const createStoreSchema = z.object({
  store_name: z.string().min(3, "Nama toko minimal 3 karakter").max(50, "Nama toko maksimal 50 karakter"),
  description: z.string().max(500, "Deskripsi maksimal 500 karakter").optional(),
  whatsapp: z.string().regex(/^08\d{8,12}$/, "Nomor WhatsApp tidak valid (contoh: 08123456789)"),
});

type CreateStoreFormData = z.infer<typeof createStoreSchema>;

export default function CreateStorePage() {
  const router = useRouter();
  const { user, upgradeToSeller, isLoading: userLoading } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStoreFormData>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      store_name: "",
      description: "",
      whatsapp: user?.whatsapp || "",
    },
  });

  const onSubmit = async (data: CreateStoreFormData) => {
    setIsSubmitting(true);
    try {
      await upgradeToSeller(data.store_name, data.description || "", data.whatsapp);
      toast.success("Toko berhasil dibuat!");
      router.push("/store");
    } catch (error) {
      // Error is handled by the hook
      setIsSubmitting(false);
    }
  };

  // If user is already a seller, redirect to store dashboard
  if (user?.role === "seller") {
    router.push("/store");
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#4E1F00] flex items-center gap-2">
          <Store className="h-6 w-6" />
          Buat Tokomu
        </h1>
        <p className="text-[#74512D] mt-1">
          Mulai jualan makanan danusan di kampusmu
        </p>
      </div>

      <Card className="border-[#E3D9BD] bg-white/80">
        <CardHeader>
          <CardTitle className="text-[#4E1F00]">Informasi Toko</CardTitle>
          <CardDescription className="text-[#74512D]">
            Lengkapi informasi berikut untuk membuat toko Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Store Name */}
            <div className="space-y-2">
              <Label htmlFor="store_name" className="text-[#4E1F00]">
                Nama Toko <span className="text-red-500">*</span>
              </Label>
              <Input
                id="store_name"
                {...register("store_name")}
                placeholder="Contoh: Dapur Bu Ani"
                className="border-[#E3D9BD] focus:border-[#FEBA17] focus:ring-[#FEBA17]"
              />
              {errors.store_name && (
                <p className="text-xs text-red-500">{errors.store_name.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-[#4E1F00]">
                Deskripsi Toko
              </Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Ceritakan tentang toko dan makanan yang kamu jual..."
                className="border-[#E3D9BD] focus:border-[#FEBA17] focus:ring-[#FEBA17] min-h-[100px]"
              />
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* WhatsApp */}
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-[#4E1F00]">
                Nomor WhatsApp <span className="text-red-500">*</span>
              </Label>
              <Input
                id="whatsapp"
                {...register("whatsapp")}
                placeholder="08xxxxxxxxxx"
                className="border-[#E3D9BD] focus:border-[#FEBA17] focus:ring-[#FEBA17]"
              />
              <p className="text-xs text-[#74512D]">
                Nomor ini akan digunakan untuk komunikasi dengan pembeli
              </p>
              {errors.whatsapp && (
                <p className="text-xs text-red-500">{errors.whatsapp.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || userLoading}
              className="w-full bg-[#FEBA17] text-[#4E1F00] hover:bg-[#F5D36B] rounded-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Membuat Toko...
                </>
              ) : (
                <>
                  <Store className="h-4 w-4 mr-2" />
                  Buat Toko Sekarang
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
