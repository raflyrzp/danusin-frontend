import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/ui/star-rating";
import { useCreateReview } from "@/hooks/use-reviews";
import { uploadService } from "@/services/user.service";
import { Loader2, Camera, X } from "lucide-react";
import Image from "next/image";

interface ReviewFormModalProps {
  orderId: number;
  productName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewFormModal({ orderId, productName, isOpen, onClose }: ReviewFormModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const createReview = useCreateReview();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      const urls = await uploadService.uploadImages(files);
      setImages((prev) => [...prev, ...urls].slice(0, 5));
    } catch (error: any) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (rating === 0) return;
    
    await createReview.mutateAsync({
      order_id: orderId,
      rating,
      comment,
      images,
    });
    
    onClose();
    setRating(0);
    setComment("");
    setImages([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-[#F8F4E1]">
        <DialogHeader>
          <DialogTitle className="text-[#4E1F00]">Beri Ulasan Produk</DialogTitle>
          <p className="text-sm text-[#74512D] mt-1">{productName}</p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Rating */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-medium text-[#4E1F00]">Berapa rating produk ini?</p>
            <StarRating 
              rating={rating} 
              onRatingChange={setRating} 
              interactive 
              size="lg" 
            />
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#4E1F00]">Bagikan pengalamanmu</label>
            <Textarea 
              placeholder="Tulis testimoni Anda di sini..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border-[#E3D9BD] min-h-[120px] focus:border-[#FEBA17] focus:ring-[#FEBA17]"
            />
          </div>

          {/* Images */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#4E1F00]">Foto Produk (Opsional)</label>
            <div className="flex flex-wrap gap-2">
              {images.map((url, i) => (
                <div key={i} className="relative w-20 h-20 rounded-md overflow-hidden border border-[#E3D9BD]">
                  <Image src={url} alt="Review" fill className="object-cover" />
                  <button 
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 hover:bg-black/70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              
              {images.length < 5 && (
                <label className="w-20 h-20 rounded-md border-2 border-dashed border-[#E3D9BD] flex flex-col items-center justify-center cursor-pointer hover:bg-[#F0EAD2] transition-colors">
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
                  {isUploading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-[#74512D]" />
                  ) : (
                    <>
                      <Camera className="h-5 w-5 text-[#74512D]" />
                      <span className="text-[10px] text-[#74512D] mt-1">Tambah Foto</span>
                    </>
                  )}
                </label>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-[#E3D9BD]">Batal</Button>
          <Button 
            onClick={handleSubmit} 
            disabled={rating === 0 || createReview.isPending}
            className="bg-[#FEBA17] text-[#4E1F00] hover:bg-[#E5A612]"
          >
            {createReview.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Kirim Ulasan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
