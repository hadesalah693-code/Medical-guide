"use client";

import { IconCross, IconSearch, IconAlert } from "./ui/Icons";

interface TopNavProps {
  search: string;
  onSearchChange: (v: string) => void;
}

export default function TopNav({ search, onSearchChange }: TopNavProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      {/* Emergency bar */}
      <div className="bg-slate-900 text-slate-300 text-[11.5px]">
        <div className="max-w-[1400px] mx-auto px-4 py-1.5 flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1.5 text-red-400 font-semibold">
            <IconAlert size={13} />
            طوارئ
          </span>
          {[
            { label: "إسعاف", n: "115" },
            { label: "شرطة", n: "122" },
            { label: "إطفاء", n: "104" },
          ].map(({ label, n }) => (
            <a key={n} href={`tel:${n}`} className="hover:text-white transition-colors">
              {label} <span dir="ltr" className="font-mono text-slate-400">{n}</span>
            </a>
          ))}
          <span className="hidden sm:inline text-slate-600">|</span>
          <a href="tel:+9640000000" className="hidden sm:inline hover:text-white transition-colors truncate">
            مستشفى الفلوجة التعليمي
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-[1400px] mx-auto px-4 h-[60px] flex items-center gap-4">
        <a href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center text-white shadow-sm">
            <IconCross size={18} strokeWidth={2.5} />
          </div>
          <div className="hidden sm:block">
            <div className="font-display font-bold text-slate-900 text-[14px] leading-tight">دليل الفلوجة الطبي</div>
            <div className="text-[10.5px] text-slate-400 font-medium tracking-wide">FALLUJAH HEALTH DIRECTORY</div>
          </div>
        </a>

        <div className="flex-1 max-w-xl hidden md:flex items-center gap-2 bg-slate-50 border border-border rounded-lg px-3 h-10 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
          <IconSearch size={16} className="text-slate-400 flex-shrink-0" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="بحث عن طبيب، تخصص، عيادة..."
            className="flex-1 bg-transparent border-none outline-none text-[13.5px] text-slate-800 placeholder:text-slate-400"
            aria-label="بحث"
          />
        </div>

        <nav className="flex items-center gap-1 ms-auto">
          {[
            { href: "#directory", label: "الدليل" },
            { href: "#partners",  label: "شركاؤنا" },
            { href: "#contact",   label: "تواصل" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="hidden lg:inline-flex px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-primary-700 hover:bg-primary-50 rounded-md transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center px-4 py-2 text-[13px] font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors shadow-sm"
          >
            أضف منشأتك
          </a>
        </nav>
      </div>

      {/* Mobile search */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center gap-2 bg-slate-50 border border-border rounded-lg px-3 h-10">
          <IconSearch size={16} className="text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="بحث..."
            className="flex-1 bg-transparent border-none outline-none text-[13.5px]"
            aria-label="بحث"
          />
        </div>
      </div>
    </header>
  );
}
