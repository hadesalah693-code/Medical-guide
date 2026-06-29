export function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-lg ${className}`} />;
}

export function DoctorCardSkeleton() {
  return (
    <div className="bg-white rounded-[var(--radius-card)] p-4 border border-gray-100 shadow-[var(--shadow-soft)]">
      <div className="flex gap-3">
        <SkeletonLine className="w-[72px] h-[72px] rounded-2xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <SkeletonLine className="h-4 w-3/4" />
          <SkeletonLine className="h-3 w-1/2" />
          <SkeletonLine className="h-3 w-full" />
        </div>
      </div>
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <SkeletonLine className="h-12 w-full rounded-[var(--radius-btn)]" />
      <div className="flex gap-3 overflow-hidden">
        {[1, 2, 3, 4].map((i) => <SkeletonLine key={i} className="w-20 h-24 rounded-[var(--radius-card)] flex-shrink-0" />)}
      </div>
      <DoctorCardSkeleton />
      <DoctorCardSkeleton />
    </div>
  );
}
