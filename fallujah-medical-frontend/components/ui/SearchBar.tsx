import { IconSearch } from "./Icons";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onEnter?: () => void;
  large?: boolean;
}

export default function SearchBar({ value, onChange, placeholder = "ابحث عن طبيب، تخصص، عيادة...", onFocus, onEnter, large }: SearchBarProps) {
  return (
    <div
      className={[
        "flex items-center gap-2.5 bg-white border border-gray-200 rounded-[var(--radius-btn)] transition-all",
        "focus-within:border-primary-400 focus-within:shadow-[var(--shadow-float)] focus-within:border-primary-300",
        large ? "px-4 py-3.5 shadow-[var(--shadow-soft)]" : "px-3.5 py-2.5",
      ].join(" ")}
    >
      <IconSearch size={large ? 20 : 18} className="text-primary-500 flex-shrink-0" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onKeyDown={(e) => { if (e.key === "Enter") onEnter?.(); }}
        placeholder={placeholder}
        className={[
          "flex-1 bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-400",
          large ? "text-[15px]" : "text-[14px]",
        ].join(" ")}
        aria-label="بحث"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-sm flex items-center justify-center hover:bg-gray-200"
          aria-label="مسح"
        >
          ×
        </button>
      )}
    </div>
  );
}
