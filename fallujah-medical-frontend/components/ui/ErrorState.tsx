import Button from "./Button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message = "حدث خطأ أثناء تحميل البيانات", onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center text-center py-14 px-6">
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-danger-500 mb-4">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
          <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
        </svg>
      </div>
      <h3 className="font-display font-bold text-gray-800 text-[16px]">عذراً!</h3>
      <p className="text-[13px] text-gray-500 mt-1.5">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
          إعادة المحاولة
        </Button>
      )}
    </div>
  );
}
