"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { ArrowLeft, Loader2, Upload, X, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateProduct } from "@/hooks/use-products";
import { uploadService } from "@/services/user.service";
import { toast } from "sonner";

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
const LOCATIONS = ["Kampus A", "Kampus B"];
const MAX_IMAGES = 5;

const createProductSchema = z.object({
  name: z.string().min(3, "Nama produk minimal 3 karakter"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  price: z.number().positive("Harga harus lebih dari 0"),
  stock: z.number().int().min(1, "Stok minimal 1"),
  available_days: z.array(z.string()).min(1, "Pilih minimal 1 hari"),
  pickup_locations: z.array(z.string()).min(1, "Pilih minimal 1 lokasi"),
  po_open_date: z.string().min(1, "Tanggal buka PO wajib diisi"),
  po_close_date: z.string().min(1, "Tanggal tutup PO wajib diisi"),
});

type CreateProductFormData = z.infer<typeof createProductSchema>;

interface ImagePreview {
  id: string;
  file: File;
  preview: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const createProduct = useCreateProduct();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFiles, setImageFiles] = useState<ImagePreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      available_days: DAYS,
      pickup_locations: LOCATIONS,
      po_open_date: new Date().toISOString().split("T")[0],
      po_close_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    },
  });

  const selectedDays = watch("available_days") || [];
  const selectedLocations = watch("pickup_locations") || [];

  const handleDayToggle = (day: string) => {
    const updated = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setValue("available_days", updated);
  };

  const handleLocationToggle = (location: string) => {
    const updated = selectedLocations.includes(location)
      ? selectedLocations.filter((l) => l !== location)
      : [...selectedLocations, location];
    setValue("pickup_locations", updated);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = MAX_IMAGES - imageFiles.length;
    if (remainingSlots <= 0) {
      toast.error(`Maksimal ${MAX_IMAGES} foto`);
      return;
    }

    const newFiles = Array.from(files).slice(0, remainingSlots);
    const validFiles: ImagePreview[] = [];

    for (const file of newFiles) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} bukan file gambar`);
        continue;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} terlalu besar (maks 5MB)`);
        continue;
      }

      validFiles.push({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        preview: URL.createObjectURL(file),
      });
    }

    setImageFiles((prev) => [...prev, ...validFiles]);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (id: string) => {
    setImageFiles((prev) => {
      const imageToRemove = prev.find((img) => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const onSubmit = async (data: CreateProductFormData) => {
    try {
      setIsUploading(true);

      // Upload images first
      let uploadedImageUrls: string[] = [];
      if (imageFiles.length > 0) {
        const files = imageFiles.map((img) => img.file);
        uploadedImageUrls = await uploadService.uploadImages(files);
      }

      await createProduct.mutateAsync({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        po_open_date: data.po_open_date,
        po_close_date: data.po_close_date,
        ...(uploadedImageUrls.length > 0 && { images: uploadedImageUrls }),
      });

      // Cleanup preview URLs
      imageFiles.forEach((img) => URL.revokeObjectURL(img.preview));

      toast.success("Produk berhasil ditambahkan!");
      router.push("/store/products");
    } catch (error: any) {
      toast.error("Gagal menambahkan produk", {
        description: error.message,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const isSubmitting = createProduct.isPending || isUploading;

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <Link
        href="/store/products"
        className="inline-flex items-center gap-2 text-sm text-[#74512D] hover:text-[#4E1F00] mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </Link>

      {/* Form */}
      <div className="rounded-xl border border-[#E3D9BD] bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-[#4E1F00] mb-6">
          Tambah Produk Baru
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-[#4E1F00]">
              Foto Produk ({imageFiles.length}/{MAX_IMAGES})
            </Label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Image Previews */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {imageFiles.map((image, index) => (
                <div
                  key={image.id}
                  className="relative aspect-square rounded-lg overflow-hidden border border-[#E3D9BD] group"
                >
                  <SafeImage
                    src={image.preview}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {index === 0 && (
                    <div className="absolute top-1 left-1 bg-[#FEBA17] text-[#4E1F00] text-xs px-1.5 py-0.5 rounded font-medium">
                      Utama
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}

              {/* Add Image Button */}
              {imageFiles.length < MAX_IMAGES && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-lg border-2 border-dashed border-[#E3D9BD] hover:border-[#FEBA17] transition-colors flex flex-col items-center justify-center gap-1 bg-[#FAFAFA] hover:bg-[#F8F4E1]"
                >
                  <ImagePlus className="h-6 w-6 text-[#B4A98C]" />
                  <span className="text-xs text-[#74512D]">Tambah</span>
                </button>
              )}
            </div>

            {imageFiles.length === 0 && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#E3D9BD] rounded-xl p-8 text-center hover:border-[#FEBA17] transition-colors cursor-pointer bg-[#FAFAFA]"
              >
                <Upload className="h-8 w-8 mx-auto text-[#B4A98C] mb-2" />
                <p className="text-sm text-[#74512D]">
                  Klik untuk upload foto produk
                </p>
                <p className="text-xs text-[#B4A98C] mt-1">
                  PNG, JPG max 5MB (Maksimal {MAX_IMAGES} foto)
                </p>
              </div>
            )}
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#4E1F00]">
              Nama Produk <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              {...register("name")}
              className="border-[#E3D9BD]"
              placeholder="Contoh: Risol Mayo"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-[#4E1F00]">
                Harga <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                {...register("price", { valueAsNumber: true })}
                className="border-[#E3D9BD]"
                placeholder="10000"
              />
              {errors.price && (
                <p className="text-xs text-red-500">{errors.price.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock" className="text-[#4E1F00]">
                Stok <span className="text-red-500">*</span>
              </Label>
              <Input
                id="stock"
                type="number"
                {...register("stock", { valueAsNumber: true })}
                className="border-[#E3D9BD]"
                placeholder="50"
              />
              {errors.stock && (
                <p className="text-xs text-red-500">{errors.stock.message}</p>
              )}
            </div>
          </div>

          {/* Available Days */}
          <div className="space-y-2">
            <Label className="text-[#4E1F00]">
              Hari Tersedia <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {DAYS.map((day) => (
                <label
                  key={day}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={selectedDays.includes(day)}
                    onCheckedChange={() => handleDayToggle(day)}
                    className="border-[#E3D9BD] data-[state=checked]:bg-[#FEBA17] data-[state=checked]:border-[#FEBA17]"
                  />
                  <span className="text-sm text-[#4E1F00]">{day}</span>
                </label>
              ))}
            </div>
            {errors.available_days && (
              <p className="text-xs text-red-500">
                {errors.available_days.message}
              </p>
            )}
          </div>

          {/* Pickup Locations */}
          <div className="space-y-2">
            <Label className="text-[#4E1F00]">
              Lokasi Pengambilan <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {LOCATIONS.map((location) => (
                <label
                  key={location}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={selectedLocations.includes(location)}
                    onCheckedChange={() => handleLocationToggle(location)}
                    className="border-[#E3D9BD] data-[state=checked]:bg-[#FEBA17] data-[state=checked]:border-[#FEBA17]"
                  />
                  <span className="text-sm text-[#4E1F00]">{location}</span>
                </label>
              ))}
            </div>
            {errors.pickup_locations && (
              <p className="text-xs text-red-500">
                {errors.pickup_locations.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-[#4E1F00]">
              Deskripsi Produk <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              className="border-[#E3D9BD] min-h-[120px]"
              placeholder="Jelaskan produk Anda dengan detail..."
            />
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* PO Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="po_open_date" className="text-[#4E1F00]">
                Tanggal Buka PO <span className="text-red-500">*</span>
              </Label>
              <Input
                id="po_open_date"
                type="date"
                {...register("po_open_date")}
                className="border-[#E3D9BD]"
              />
              {errors.po_open_date && (
                <p className="text-xs text-red-500">
                  {errors.po_open_date.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="po_close_date" className="text-[#4E1F00]">
                Tanggal Tutup PO <span className="text-red-500">*</span>
              </Label>
              <Input
                id="po_close_date"
                type="date"
                {...register("po_close_date")}
                className="border-[#E3D9BD]"
              />
              {errors.po_close_date && (
                <p className="text-xs text-red-500">
                  {errors.po_close_date.message}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-[#E3D9BD] text-[#4E1F00]"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#FEBA17] text-[#4E1F00] hover:bg-[#e5a612]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isUploading ? "Mengupload..." : "Menyimpan..."}
                </>
              ) : (
                "Simpan Produk"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
