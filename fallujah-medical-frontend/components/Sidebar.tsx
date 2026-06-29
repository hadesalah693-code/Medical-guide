const WA_SVG = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.112 1.523 5.843L.046 23.54a.5.5 0 0 0 .614.614l5.697-1.477A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

export default function Sidebar() {
  return (
    <aside className="hidden lg:block lg:sticky lg:top-[120px]">
      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-xl border border-border shadow-[var(--shadow-card)] overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-slate-50">
            <h3 className="font-display text-[13px] font-bold text-slate-800">List Your Facility</h3>
            <p className="text-[11.5px] text-slate-400 mt-0.5">Reach thousands of patients daily</p>
          </div>
          <div className="p-4 flex flex-col gap-3">
            {["Basic", "Standard", "Premium"].map((tier, i) => (
              <div key={tier} className="flex items-center gap-2 text-[12px] text-slate-600">
                <span className={`w-2 h-2 rounded-full ${i === 2 ? "bg-primary-600 ring-2 ring-primary-200" : i === 1 ? "bg-primary-400" : "bg-slate-300"}`} />
                {tier}
              </div>
            ))}
            <a
              href="https://wa.me/9647700000000"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#128C7E] hover:bg-[#0f7a6e] text-white text-[12.5px] font-semibold transition-colors mt-1"
            >
              {WA_SVG} WhatsApp
            </a>
            <p className="text-[11.5px] text-slate-400 text-center" dir="ltr">0770 000 0000</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-4 text-white">
          <h4 className="font-display text-[13px] font-bold mb-3 text-slate-200">Emergency Contacts</h4>
          <ul className="space-y-1">
            {[
              { label: "Ambulance", n: "115" },
              { label: "Police",    n: "122" },
              { label: "Fire",      n: "104" },
            ].map(({ label, n }) => (
              <li key={n}>
                <a href={`tel:${n}`} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 text-[12.5px] transition-colors">
                  <span className="text-slate-400">{label}</span>
                  <span className="font-mono font-bold text-red-400" dir="ltr">{n}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
