"use client";

import SearchBar from "../ui/SearchBar";
import { IconCross, IconHome, IconSearch, IconCalendar, IconBookmark, IconUser } from "../ui/Icons";
import type { TabId } from "./BottomNav";

const NAV: { id: TabId; label: string; Icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: "home",         label: "الرئيسية", Icon: IconHome },
  { id: "search",       label: "البحث",    Icon: IconSearch },
  { id: "appointments", label: "مواعيدي",  Icon: IconCalendar },
  { id: "favorites",    label: "المفضلة",  Icon: IconBookmark },
  { id: "profile",      label: "حسابي",    Icon: IconUser },
];

interface DesktopNavProps {
  active: TabId;
  onChange: (tab: TabId) => void;
  search: string;
  onSearchChange: (v: string) => void;
  onSearchEnter?: () => void;
}

export default function DesktopNav({ active, onChange, search, onSearchChange, onSearchEnter }: DesktopNavProps) {
  return (
    <header
      className="hidden lg:block sticky top-0 z-40"
      style={{
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(204,251,241,0.9)",
        boxShadow: "0 2px 16px rgba(13,148,136,0.07)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 xl:px-8">
        <div className="flex items-center gap-5 h-[70px]">

          {/* Logo */}
          <button type="button" onClick={() => onChange("home")}
            className="flex items-center gap-2.5 flex-shrink-0 group"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105"
              style={{ background: "linear-gradient(145deg,#0f766e,#0d9488)" }}
            >
              <IconCross size={20} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="leading-none text-right">
              <div className="font-display font-extrabold text-gray-900 text-[15px]">دليل الفلوجة الطبي</div>
              <div className="text-[10px] font-bold tracking-widest mt-0.5" style={{ color: "#0d9488" }}>
                FALLUJAH HEALTH
              </div>
            </div>
          </button>

          {/* Nav */}
          <nav className="flex items-center gap-0.5 mr-2">
            {NAV.map(({ id, label, Icon }) => {
              const isActive = active === id;
              return (
                <button key={id} type="button" onClick={() => onChange(id)}
                  className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200"
                  style={{ color: isActive ? "#0d9488" : "#64748b", background: isActive ? "#f0fdfa" : "transparent" }}
                >
                  <Icon size={16} />
                  {label}
                  {isActive && (
                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-600" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search */}
          <div className="flex-1 max-w-[360px] ms-auto">
            <SearchBar value={search} onChange={onSearchChange} onEnter={onSearchEnter} placeholder="ابحث عن طبيب، تخصص..." />
          </div>

          {/* CTA */}
          <a href="#contact"
            className="flex-shrink-0 px-5 py-2.5 rounded-xl text-white text-[13px] font-extrabold shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg,#0d9488,#0f766e)", boxShadow: "0 4px 14px rgba(13,148,136,0.30)" }}
          >
            + أضف عيادتك
          </a>
        </div>
      </div>
    </header>
  );
}
