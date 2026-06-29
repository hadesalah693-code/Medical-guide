import { FRIENDLY_APPS } from "@/data/directory";

export default function FriendlyApps() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="mb-5">
        <p className="text-[11px] font-semibold text-primary-600 uppercase tracking-widest mb-1">Ecosystem</p>
        <h2 className="font-display text-[18px] font-bold text-slate-900">Integrated Services</h2>
        <p className="text-[13px] text-slate-500 mt-1">Trusted digital platforms from Fallujah</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {FRIENDLY_APPS.map((app, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-border p-5 flex flex-col gap-3 hover:border-primary-200 hover:shadow-[var(--shadow-card)] transition-all animate-fade-in-up"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <span className="text-[10px] font-bold uppercase tracking-wide text-primary-600 bg-primary-50 px-2 py-0.5 rounded w-fit border border-primary-100">
              {app.category}
            </span>
            <h3 className="font-display text-[14px] font-bold text-slate-900">{app.name}</h3>
            <p className="text-[12px] text-slate-500 leading-relaxed flex-1">{app.tagline}</p>
            {app.is_live ? (
              <a href={app.url} target="_blank" rel="noopener noreferrer"
                className="text-[12px] font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                Visit platform →
              </a>
            ) : (
              <span className="text-[12px] font-medium text-slate-400">Coming soon</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
