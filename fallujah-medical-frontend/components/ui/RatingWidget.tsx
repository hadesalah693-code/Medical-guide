import { IconStar } from "./Icons";

interface RatingWidgetProps {
  rating?: number;
  count?: number;
  size?: "sm" | "md";
}

export default function RatingWidget({ rating, count, size = "sm" }: RatingWidgetProps) {
  if (!rating) return null;
  const star = size === "sm" ? 14 : 16;
  const text = size === "sm" ? "text-[12px]" : "text-[13px]";
  return (
    <div className={`inline-flex items-center gap-1 ${text}`}>
      <IconStar size={star} className="text-amber-400" />
      <span className="font-bold text-gray-800">{rating.toFixed(1)}</span>
      {count != null && count > 0 && (
        <span className="text-gray-400 font-normal">({count})</span>
      )}
    </div>
  );
}
