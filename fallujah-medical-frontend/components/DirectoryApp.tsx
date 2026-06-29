'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import type { FlatRecord } from "@/types";
import { CATEGORIES } from "@/data/directory";
import TopNav from "./TopNav";
import Sidebar from "./Sidebar";
import {
  IconPhone, IconMapPin, IconStar, IconBuilding, IconClock,
  IconStethoscope, IconPill, IconFlask, IconGrid, IconUsers, IconShield, IconX,
} from "./ui/Icons";

const PAGE_SIZE = 30;

const ALL_RECORDS: FlatRecord[] = Object.entries(CATEGORIES).flatMap(([key, cat]) =>
  (cat.doctors ?? cat.items ?? []).map((doc) => ({
    ...doc,
    _category: key,
    _categoryLabel: cat.label,
    _categoryIcon: cat.icon,
  }))
);

const NON_CLINICAL = ["pharmacies", "labs", "medical_complexes"];
const STATS = {
  total:      ALL_RECORDS.length,
  doctors:    ALL_RECORDS.filter((r) => !NON_CLINICAL.includes(r._category)).length,
  pharmacies: ALL_RECORDS.filter((r) => r._category === "pharmacies").length,
  labs:       ALL_RECORDS.filter((r) => r._category === "labs").length,
};

const TABS = [
  { id: "all",               label: "جميع السجلات", Icon: IconGrid },
  { id: "doctors",           label: "الأطباء",      Icon: IconStethoscope },
  { id: "pharmacies",        label: "الصيدليات",    Icon: IconPill },
  { id: "labs",              label: "المختبرات",    Icon: IconFlask },
  { id: "medical_complexes", label: "المراكز الطبية", Icon: IconBuilding },
];

const TAB_CATS: Record<string, string[]> = {
  doctors:           Object.keys(CATEGORIES).filter((k) => !NON_CLINICAL.includes(k)),
  pharmacies:        ["pharmacies"],
  labs:              ["labs"],
  medical_complexes: ["medical_complexes"],
};

function useCounter(target: number, ms = 1200) {
  const [val, setVal] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    let t0: number | null = null;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / ms, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, ms]);
  return val;
}

function KpiCard({ label, value, sub, Icon }: { label: string; value: number; sub: string; Icon: React.ComponentType<{ size?: number; className?: string }> }) {
  const n = useCounter(value);
  return (
    <div className="bg-white rounded-xl border border-border p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[12px] font-medium text-slate-500 uppercase tracking-wide">{label}</p>
          <p className="font-display text-[28px] font-bold text-slate-900 mt-1 tabular-nums leading-none">{n.toLocaleString("ar-EG")}</p>
          <p className="text-[11.5px] text-slate-400 mt-1.5">{sub}</p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

function RecordCard({ record, onOpen }: { record: FlatRecord; onOpen: (r: FlatRecord) => void }) {
  const phone = record.phones?.[0] ?? record.gmap_phone;

  function track(action: string) {
    try {
      const c: Record<string, number> = JSON.parse(localStorage.getItem("daleelClicks") || "{}");
      const k = `${record._category}:${record.name}:${action}`;
      c[k] = (c[k] || 0) + 1;
      localStorage.setItem("daleelClicks", JSON.stringify(c));
    } catch {}
  }

  return (
    <article className="group bg-white rounded-xl border border-border hover:border-primary-200 hover:shadow-[var(--shadow-elevated)] transition-all duration-200 animate-fade-in-up">
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-sm">
            {record.name.replace(/^د\.?\s*/, "").charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-display font-bold text-[15px] text-slate-900 select-text">{record.name}</h3>
              {record.is_featured && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                  <IconShield size={11} /> مميز
                </span>
              )}
            </div>
            <p className="text-[12.5px] font-medium text-primary-700 mb-2">{record._categoryLabel}</p>
            {record.qualifications && (
              <p className="text-[12px] text-slate-500 line-clamp-1 mb-2 select-text">{record.qualifications}</p>
            )}
            <div className="flex flex-col gap-1">
              {record.clinic && (
                <span className="flex items-center gap-2 text-[12px] text-slate-600 select-text">
                  <IconBuilding size={14} className="text-slate-400 flex-shrink-0" />
                  {record.clinic}
                </span>
              )}
              {record.address && (
                <span className="flex items-start gap-2 text-[12px] text-slate-500 select-text">
                  <IconMapPin size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{record.address}</span>
                </span>
              )}
              {record.hours && (
                <span className="flex items-center gap-2 text-[12px] text-slate-400">
                  <IconClock size={14} className="flex-shrink-0" />
                  {record.hours}
                </span>
              )}
            </div>
            {record.gmap_rating && (
              <div className="flex items-center gap-1 mt-2.5 text-star">
                <IconStar size={14} />
                <span className="text-[12.5px] font-bold text-slate-800">{record.gmap_rating}</span>
                {record.gmap_count && (
                  <span className="text-[11px] text-slate-400">({record.gmap_count} تقييم)</span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex sm:flex-col gap-2 sm:w-[130px] flex-shrink-0 border-t sm:border-t-0 sm:border-r border-border pt-3 sm:pt-0 sm:pr-4">
          {phone ? (
            <a
              href={`tel:${phone}`}
              onClick={() => track("call")}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-[12.5px] font-semibold transition-colors"
            >
              <IconPhone size={15} /> اتصال
            </a>
          ) : (
            <span className="flex-1 flex items-center justify-center py-2.5 rounded-lg bg-slate-100 text-slate-300 text-[12.5px] font-semibold cursor-not-allowed">اتصال</span>
          )}
          {record.gps && (
            <a
              href={`https://maps.google.com/?q=${record.gps.lat},${record.gps.lng}`}
              target="_blank" rel="noopener noreferrer"
              onClick={() => track("map")}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-border text-slate-600 text-[12.5px] font-medium hover:bg-slate-50 transition-colors"
            >
              <IconMapPin size={15} /> خريطة
            </a>
          )}
          <button
            onClick={() => { track("details"); onOpen(record); }}
            className="flex-1 py-2.5 px-3 rounded-lg text-[12.5px] font-medium text-slate-600 hover:bg-slate-50 border border-transparent hover:border-border transition-colors"
          >
            التفاصيل
          </button>
        </div>
      </div>
    </article>
  );
}

function RecordModal({ record, onClose }: { record: FlatRecord; onClose: () => void }) {
  const phone = record.phones?.[0] ?? record.gmap_phone;
  const ROWS = [
    { label: "المؤهلات",    val: record.qualifications },
    { label: "الخدمات",     val: record.services },
    { label: "العيادة",     val: record.clinic },
    { label: "العنوان",     val: record.address },
    { label: "الحي",        val: record.neighborhood },
    { label: "الهاتف",      val: record.phones?.join(" | "), dir: "ltr" as const },
    { label: "أيام العمل",  val: record.days },
    { label: "ساعات العمل", val: record.hours },
    { label: "يوم العطلة",  val: record.off },
    { label: "ملاحظات",     val: record.notes },
    { label: "التقييم", val: record.gmap_rating ? `${record.gmap_rating} / 5 (${record.gmap_count?.toLocaleString("ar-EG")} تقييم)` : undefined },
  ].filter((r) => r.val);

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] animate-fade-in" onClick={onClose} />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-[520px] max-h-[90vh] overflow-hidden shadow-[var(--shadow-modal)] animate-slide-up flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h3 className="font-display font-bold text-slate-900 text-[17px] select-text">{record.name}</h3>
            <p className="text-[12px] text-primary-700 font-medium mt-0.5">{record._categoryLabel}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500" aria-label="إغلاق">
            <IconX size={18} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-5">
          <dl className="divide-y divide-border">
            {ROWS.map(({ label, val, dir }) => (
              <div key={label} className="grid grid-cols-[100px_1fr] gap-3 py-3 text-[13px]">
                <dt className="font-semibold text-slate-500">{label}</dt>
                <dd className="text-slate-800 select-text" dir={dir ?? "auto"}>{val}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="p-4 border-t border-border flex gap-2 bg-slate-50">
          {phone && (
            <a href={`tel:${phone}`} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-primary-600 text-white font-semibold text-[13px] hover:bg-primary-700 transition-colors">
              <IconPhone size={16} /> اتصال
            </a>
          )}
          {record.gps && (
            <a href={`https://maps.google.com/?q=${record.gps.lat},${record.gps.lng}`} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-border bg-white text-slate-700 font-semibold text-[13px] hover:bg-slate-50 transition-colors">
              <IconMapPin size={16} /> خريطة
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DirectoryApp() {
  const [search,          setSearch]          = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState<string | null>(null);
  const [activeTab,       setActiveTab]       = useState("all");
  const [page,            setPage]            = useState(1);
  const [modal,           setModal]           = useState<FlatRecord | null>(null);

  const filtered = useMemo(() => {
    let res = ALL_RECORDS;
    if (activeSpecialty) res = res.filter((r) => r._category === activeSpecialty);
    else if (activeTab !== "all") {
      const cats = TAB_CATS[activeTab] ?? [];
      res = res.filter((r) => cats.includes(r._category));
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      res = res.filter((r) =>
        [r.name, r.qualifications, r.services, r.clinic, r.address, r.neighborhood, r._categoryLabel]
          .some((f) => f?.toLowerCase().includes(q))
      );
    }
    return [...res].sort((a, b) => {
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return (a.priority ?? 99) - (b.priority ?? 99);
    });
  }, [search, activeSpecialty, activeTab]);

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  const pickSpecialty = useCallback((key: string) => {
    setActiveSpecialty((p) => (p === key ? null : key));
    setActiveTab("all");
    setPage(1);
  }, []);

  const pickTab = useCallback((id: string) => {
    setActiveTab(id);
    setActiveSpecialty(null);
    setPage(1);
  }, []);

  const handleSearch = useCallback((v: string) => { setSearch(v); setPage(1); }, []);

  return (
    <>
      <TopNav search={search} onSearchChange={handleSearch} />

      <div id="directory" className="max-w-[1400px] mx-auto px-4 py-6">
        {/* Page header */}
        <div className="mb-6">
          <p className="text-[12px] font-medium text-slate-400 mb-1">الرئيسية / الدليل الطبي</p>
          <h1 className="font-display text-[22px] sm:text-[26px] font-bold text-slate-900">دليل المنشآت الصحية — الفلوجة</h1>
          <p className="text-[13.5px] text-slate-500 mt-1">منصة موحّدة للبحث عن مقدمي الرعاية الصحية المعتمدين في المدينة</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <KpiCard label="إجمالي السجلات" value={STATS.total}      sub="سجل طبي موثّق"     Icon={IconGrid} />
          <KpiCard label="الأطباء"        value={STATS.doctors}    sub="طبيب وعيادة"       Icon={IconStethoscope} />
          <KpiCard label="الصيدليات"      value={STATS.pharmacies} sub="صيدلية مرخصة"      Icon={IconPill} />
          <KpiCard label="المختبرات"      value={STATS.labs}       sub="مختبر تشخيصي"      Icon={IconFlask} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_260px] xl:grid-cols-[280px_1fr_280px] gap-5 items-start">
          {/* Filter sidebar */}
          <aside className="bg-white rounded-xl border border-border shadow-[var(--shadow-card)] overflow-hidden lg:sticky lg:top-[120px]">
            <div className="px-4 py-3 border-b border-border bg-slate-50">
              <h2 className="font-display text-[13px] font-bold text-slate-800 uppercase tracking-wide">التخصصات</h2>
            </div>
            <div className="max-h-[420px] overflow-y-auto divide-y divide-border">
              {Object.entries(CATEGORIES).map(([key, cat]) => {
                const count = (cat.doctors ?? cat.items ?? []).length;
                const active = activeSpecialty === key;
                return (
                  <button
                    key={key}
                    onClick={() => pickSpecialty(key)}
                    className={[
                      "w-full flex items-center justify-between px-4 py-2.5 text-[13px] transition-colors text-right",
                      active ? "bg-primary-50 text-primary-800 border-r-[3px] border-r-primary-600" : "text-slate-600 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <span className={`text-[11px] font-bold tabular-nums px-1.5 py-0.5 rounded ${active ? "bg-primary-100 text-primary-700" : "bg-slate-100 text-slate-500"}`}>{count}</span>
                    <span className="font-medium truncate ms-2">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Results */}
          <main className="min-w-0 flex flex-col gap-4">
            {/* Type tabs */}
            <div className="flex gap-1 p-1 bg-white border border-border rounded-xl overflow-x-auto no-scrollbar shadow-[var(--shadow-card)]">
              {TABS.map(({ id, label, Icon }) => {
                const active = activeTab === id && !activeSpecialty;
                return (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => pickTab(id)}
                    className={[
                      "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12.5px] font-semibold whitespace-nowrap transition-all flex-shrink-0",
                      active ? "bg-primary-600 text-white shadow-sm" : "text-slate-500 hover:text-primary-700 hover:bg-primary-50",
                    ].join(" ")}
                  >
                    <Icon size={15} />
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Results meta */}
            <div className="flex items-center justify-between text-[12.5px] px-0.5">
              <span className="font-semibold text-slate-700">
                {filtered.length === 0 ? "لا توجد نتائج" : `${filtered.length.toLocaleString("ar-EG")} سجل`}
                {search && <span className="font-normal text-slate-400 mr-1.5">— &ldquo;{search}&rdquo;</span>}
              </span>
              {activeSpecialty && (
                <button onClick={() => setActiveSpecialty(null)} className="flex items-center gap-1 text-slate-500 hover:text-danger text-[12px] font-medium">
                  {CATEGORIES[activeSpecialty]?.label} <IconX size={14} />
                </button>
              )}
            </div>

            {visible.length === 0 ? (
              <div className="bg-white rounded-xl border border-border py-16 text-center shadow-[var(--shadow-card)]">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <IconUsers size={22} />
                </div>
                <p className="font-display font-bold text-slate-800 text-[15px]">لم يتم العثور على نتائج</p>
                <p className="text-[13px] text-slate-400 mt-1">جرّب تعديل معايير البحث أو الفلتر</p>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2.5">
                  {visible.map((rec, i) => (
                    <RecordCard key={`${rec._category}-${rec.name}-${i}`} record={rec} onOpen={setModal} />
                  ))}
                </div>
                {hasMore && (
                  <div className="text-center pt-2">
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-border bg-white text-[13px] font-semibold text-slate-700 hover:border-primary-300 hover:text-primary-700 shadow-[var(--shadow-card)] transition-all"
                    >
                      عرض المزيد ({filtered.length - visible.length} متبقية)
                    </button>
                  </div>
                )}
              </>
            )}
          </main>

          <Sidebar />
        </div>
      </div>

      {modal && <RecordModal record={modal} onClose={() => setModal(null)} />}
    </>
  );
}
