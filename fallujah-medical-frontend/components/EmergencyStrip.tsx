export default function EmergencyStrip() {
  return (
    <div className="bg-danger text-white text-[12px] sm:text-[13px]">
      <div className="max-w-[1320px] mx-auto px-4 py-1.5 flex items-center gap-2 sm:gap-3 flex-wrap">
        <span className="w-2 h-2 rounded-full bg-white flex-shrink-0 animate-pulse-dot" />
        <strong className="font-bold">طوارئ:</strong>
        {[
          { label: "شرطة", phone: "122", icon: "🚔" },
          { label: "إسعاف", phone: "115", icon: "🚑" },
          { label: "إطفاء", phone: "104", icon: "🚒" },
        ].map(({ label, phone, icon }) => (
          <a
            key={phone}
            href={`tel:${phone}`}
            className="px-2 py-0.5 rounded-md bg-white/15 hover:bg-white/25 transition-colors font-medium"
          >
            {icon} {label} {phone}
          </a>
        ))}
        <a
          href="tel:+9640000000"
          className="px-2.5 py-0.5 rounded-md bg-white text-danger font-bold hover:bg-white/90 transition-colors ms-auto text-[11.5px] sm:text-[12px]"
        >
          🏥 مستشفى الفلوجة التعليمي
        </a>
      </div>
    </div>
  );
}
