export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 text-slate-400 mt-4">
      <div className="max-w-[1400px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-display font-bold text-white text-[15px] mb-2">Fallujah Health Directory</div>
            <p className="text-[13px] leading-relaxed text-slate-500">
              Comprehensive medical directory for Fallujah — verified doctors, pharmacies, labs, and healthcare centers.
            </p>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-3">Emergency</div>
            <ul className="space-y-1.5 text-[13px]">
              {[["Ambulance", "115"], ["Police", "122"], ["Fire", "104"]].map(([l, n]) => (
                <li key={n}>
                  <a href={`tel:${n}`} className="flex justify-between hover:text-white transition-colors py-1">
                    <span>{l}</span><span className="font-mono text-red-400" dir="ltr">{n}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-3">Contact</div>
            <p className="text-[13px] text-slate-500 mb-3">List your facility or report an issue.</p>
            <a href="#contact" className="text-[13px] font-semibold text-primary-400 hover:text-primary-300 transition-colors">
              Send message →
            </a>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-slate-600">
          <span>© {year} Fallujah Medical Directory. All rights reserved.</span>
          <span className="font-mono text-slate-500">v4.0.0</span>
        </div>
      </div>
    </footer>
  );
}
