import { StarRating } from "@/components/ui/star-rating";
import { Review, RatingSummary } from "@/types";
import { User, Calendar } from "lucide-react";
import Image from "next/image";

interface ReviewSectionProps {
  reviews: Review[];
  summary: RatingSummary;
}

export function ReviewSection({ reviews, summary }: ReviewSectionProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-8 mt-12 border-t border-[#E3D9BD] pt-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#4E1F00]">Ulasan Pembeli</h2>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <span className="text-3xl font-bold text-[#4E1F00]">{summary.averageRating.toFixed(1)}</span>
              <span className="text-sm text-[#74512D] mt-2">/ 5.0</span>
            </div>
            <div className="h-8 w-px bg-[#E3D9BD]" />
            <div className="flex flex-col">
              <StarRating rating={Math.round(summary.averageRating)} size="sm" />
              <p className="text-xs text-[#74512D] mt-1">{summary.totalReviews} ulasan</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="bg-[#F8F4E1] rounded-xl p-8 text-center border border-dashed border-[#E3D9BD]">
            <p className="text-[#74512D]">Belum ada ulasan untuk produk ini.</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl p-6 border border-[#E3D9BD] shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#F8F4E1] flex items-center justify-center">
                    <User className="h-6 w-6 text-[#74512D]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#4E1F00]">{review.user_name}</p>
                    <div className="flex items-center gap-2">
                      <StarRating rating={review.rating} size="sm" />
                      <span className="text-[10px] text-[#B4A98C] flex items-center gap-1">
                        <Calendar className="h-3 h-3" />
                        {formatDate(review.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {review.comment && (
                <p className="text-[#4E1F00] text-sm leading-relaxed mb-4">
                  {review.comment}
                </p>
              )}

              {review.images && review.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {review.images.map((url, i) => (
                    <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-[#E3D9BD] cursor-pointer hover:opacity-90 transition-opacity">
                      <Image src={url} alt="Review" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
