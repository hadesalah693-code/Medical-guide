import type { FlatRecord } from "@/types";
import { IconMapPin, IconPhone } from "./Icons";
import RatingWidget from "./RatingWidget";
import { doctorRating, doctorReviewCount, doctorPhone, specialtyColor } from "@/lib/doctors";

interface ClinicCardProps {
  clinic: FlatRecord;
  onOpen?: () => void;
}

export default function ClinicCard({ clinic, onOpen }: ClinicCardProps) {
  const rating  = doctorRating(clinic);
  const reviews = doctorReviewCount(clinic);
  const phone   = doctorPhone(clinic);
  const color   = specialtyColor(clinic._category);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full flex items-center gap-3.5 p-4 bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] text-right transition-all duration-200 active:scale-[0.99] hover:shadow-[var(--shadow-card)]"
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm"
        style={{ background: `${color}15`, color }}
      >
        🏥
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-display font-bold text-[14px] text-gray-900 line-clamp-1">{clinic.name}</p>
        <p className="text-[12px] text-gray-500 line-clamp-1 mt-0.5 flex items-center gap-1">
          <IconMapPin size={12} className="flex-shrink-0 text-gray-400" />
          {clinic.address ?? clinic.clinic ?? "الفلوجة"}
        </p>
        {rating && (
          <div className="mt-1">
            <RatingWidget rating={rating} count={reviews} />
          </div>
        )}
      </div>

      {/* Phone or arrow */}
      {phone ? (
        <div className="w-9 h-9 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
          <IconPhone size={16} />
        </div>
      ) : (
        <span className="text-gray-300 text-xl flex-shrink-0">‹</span>
      )}
    </button>
  );
}
