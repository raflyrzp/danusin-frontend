"use client";

import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProfileImageUploadProps {
  currentImage?:  string | null;
  name?:  string;
  onUpload: (file: File) => Promise<void>;
}

export function ProfileImageUpload({
  currentImage,
  name,
  onUpload,
}: ProfileImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e:  React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (! file) return;

    // Validate file type
    if (! file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }

    // Show preview
    setPreviewUrl(URL. createObjectURL(file));

    setIsUploading(true);
    try {
      await onUpload(file);
    } catch (error) {
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
      if (fileInputRef. current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-32 w-32 border-4 border-[#E3D9BD]">
        <AvatarImage src={previewUrl || currentImage || ""} alt={name || ""} />
        <AvatarFallback className="bg-gray-100 text-gray-400">
          <Camera className="h-8 w-8" />
        </AvatarFallback>
      </Avatar>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <Button
        type="button"
        variant="outline"
        disabled={isUploading}
        onClick={() => fileInputRef. current?.click()}
        className="border-[#E3D9BD] text-[#4E1F00] hover:bg-[#F8F4E1]"
      >
        {isUploading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Mengupload...
          </>
        ) : (
          "Pilih Gambar"
        )}
      </Button>
    </div>
  );
}
