const ADS = [
  {
    title:    "عيادات سوران لطب الأسنان",
    desc:     "تقويم، زراعة، وتجميل — د. أحمد عبيد المحمدي",
    action:   "Book appointment",
    href:     "tel:+9647700000000",
    featured: true,
  },
  {
    title:    "Your ad here",
    desc:     "Promote your clinic to thousands of patients",
    action:   "Contact us",
    href:     "#contact",
    featured: false,
  },
  {
    title:    "Your ad here",
    desc:     "Promote your clinic to thousands of patients",
    action:   "Contact us",
    href:     "#contact",
    featured: false,
  },
];

export default function PaidAdsSection() {
  return (
    <section id="partners" className="max-w-[1400px] mx-auto px-4 py-8 border-t border-border bg-white">
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-[11px] font-semibold text-primary-600 uppercase tracking-widest mb-1">Partners</p>
          <h2 className="font-display text-[18px] font-bold text-slate-900">Featured Providers</h2>
        </div>
        <a href="#contact" className="text-[12.5px] font-semibold text-primary-600 hover:text-primary-700 transition-colors">
          Become a partner →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {ADS.map((ad, i) => (
          <div
            key={i}
            className={[
              "rounded-xl p-5 border flex flex-col gap-3 transition-shadow hover:shadow-[var(--shadow-elevated)]",
              ad.featured
                ? "bg-primary-600 border-primary-500 text-white"
                : "bg-slate-50 border-border text-slate-700",
            ].join(" ")}
          >
            <h3 className={`font-display text-[15px] font-bold ${ad.featured ? "text-white" : "text-slate-900"}`}>{ad.title}</h3>
            <p className={`text-[12.5px] leading-relaxed flex-1 ${ad.featured ? "text-primary-100" : "text-slate-500"}`}>{ad.desc}</p>
            <a
              href={ad.href}
              className={[
                "inline-flex items-center text-[12px] font-semibold px-4 py-2 rounded-lg w-fit transition-colors",
                ad.featured ? "bg-white text-primary-700 hover:bg-primary-50" : "bg-white border border-border text-slate-700 hover:border-primary-300",
              ].join(" ")}
            >
              {ad.action} →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
