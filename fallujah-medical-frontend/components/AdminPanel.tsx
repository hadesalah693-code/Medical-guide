'use client';

import { useEffect, useState } from "react";
import { CATEGORIES } from "@/data/directory";

const ADMIN_KEY = "SORAN2024";

interface Message {
  name: string;
  phone?: string;
  subject?: string;
  message: string;
  time: string;
}
interface ClickEntry { key: string; count: number; }

function totalRecords() {
  return Object.values(CATEGORIES).reduce((s, c) => s + (c.doctors ?? c.items ?? []).length, 0);
}

function readAdminFlag() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("admin") === ADMIN_KEY;
}

export default function AdminPanel() {
  const [isOpen, setIsOpen]   = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [clicks,   setClicks]   = useState<ClickEntry[]>([]);

  useEffect(() => {
    setIsOpen(readAdminFlag());
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    try {
      setMessages(JSON.parse(localStorage.getItem("daleelMessages") || "[]"));
      const raw: Record<string, number> = JSON.parse(localStorage.getItem("daleelClicks") || "{}");
      setClicks(Object.entries(raw).sort((a,b)=>b[1]-a[1]).slice(0,30).map(([key,count])=>({key,count})));
    } catch {}
  }, [isOpen]);

  function clearMessages() { localStorage.removeItem("daleelMessages"); setMessages([]); }
  function clearClicks()   { localStorage.removeItem("daleelClicks");   setClicks([]);   }
  function exportMessages() {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(messages, null, 2)], { type: "application/json" }));
    a.download = `messages-${Date.now()}.json`;
    a.click();
  }

  if (!isOpen) return null;

  const maxClicks = clicks[0]?.count ?? 1;
  const totalCats = Object.keys(CATEGORIES).length;

  const STAT_CARDS = [
    { icon: "📋", value: totalRecords(),                        label: "إجمالي السجلات",  accent: "border-primary-500" },
    { icon: "📬", value: messages.length,                       label: "رسائل واردة",      accent: "border-warning" },
    { icon: "👆", value: clicks.reduce((s,c)=>s+c.count,0),    label: "إجمالي النقرات",   accent: "border-success" },
    { icon: "📁", value: totalCats,                             label: "تخصص طبي",         accent: "border-primary-400" },
  ];

  const ACTION_BTN = "px-3 py-1.5 rounded-lg text-[12.5px] font-bold transition-colors";

  return (
    <div className="fixed inset-0 z-[300] bg-slate-50">

      {/* Header */}
      <div className="sticky top-0 z-10 bg-primary-800 px-6 py-4 flex items-center justify-between flex-wrap gap-3 shadow-lg">
        <h2 className="font-display text-white text-[19px] font-bold">
          ⚙️ لوحة إدارة دليل الفلوجة الطبي
        </h2>
        <button
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-[13px] font-bold transition-colors"
          onClick={() => {
            const u = new URL(window.location.href);
            u.searchParams.delete("admin");
            window.history.replaceState({}, "", u);
            window.location.reload();
          }}
        >
          ✕ إغلاق اللوحة
        </button>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6 flex flex-col gap-5">

        {/* Warning */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[13.5px]">
          ⚠️ هذه اللوحة مخصصة للإدارة فقط. لا تشارك رابطها مع أحد.
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STAT_CARDS.map(({ icon, value, label, accent }) => (
            <div key={label} className={`bg-white rounded-2xl p-4 text-center border-t-4 shadow-sm ${accent}`}>
              <div className="text-3xl mb-1">{icon}</div>
              <div className="font-display text-primary-700 text-3xl font-bold leading-none">{value}</div>
              <div className="text-slate-500 text-[12px] mt-1.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Messages */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="font-display text-slate-800 text-[17px] font-bold">📬 الرسائل الواردة</h3>
            <div className="flex gap-2">
              <button className={`${ACTION_BTN} bg-primary-500 text-white hover:bg-primary-600`} onClick={exportMessages}>⬇️ تصدير</button>
              <button className={`${ACTION_BTN} bg-red-600  text-white hover:bg-red-700`}  onClick={clearMessages}>🗑️ حذف الكل</button>
            </div>
          </div>

          {messages.length === 0 ? (
            <p className="text-center py-8 text-slate-300 text-[13.5px]">لا توجد رسائل بعد.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-100 border-r-4 border-primary-500">
                  <div className="flex items-center justify-between flex-wrap gap-1 mb-2">
                    <span className="font-bold text-slate-800 text-[13.5px]">👤 {msg.name}</span>
                    <span className="text-slate-300 text-[11.5px]">{new Date(msg.time).toLocaleString("ar-IQ")}</span>
                  </div>
                  {msg.subject && (
                    <span className="inline-block mb-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-600">
                      {msg.subject}
                    </span>
                  )}
                  {msg.phone && (
                    <p className="text-slate-500 text-[12.5px] mb-1" dir="ltr">📞 {msg.phone}</p>
                  )}
                  <p className="text-slate-700 text-[13px] leading-relaxed bg-white rounded-lg px-3 py-2 mt-1">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Click analytics */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="font-display text-slate-800 text-[17px] font-bold">📊 إحصائيات النقرات</h3>
            <button className={`${ACTION_BTN} bg-red-600 text-white hover:bg-red-700`} onClick={clearClicks}>
              🗑️ إعادة تعيين
            </button>
          </div>

          {clicks.length === 0 ? (
            <p className="text-center py-8 text-slate-300 text-[13.5px]">لا توجد إحصائيات بعد.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] text-right border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="px-3 py-2 font-bold text-primary-700 rounded-r-lg">السجل</th>
                    <th className="px-3 py-2 font-bold text-primary-700">الإجراء</th>
                    <th className="px-3 py-2 font-bold text-primary-700">النقرات</th>
                    <th className="px-3 py-2 font-bold text-primary-700 rounded-l-lg">النسبة</th>
                  </tr>
                </thead>
                <tbody>
                  {clicks.map(({ key, count }) => {
                    const parts  = key.split(":");
                    const action = parts.pop() ?? "";
                    const name   = parts.slice(1).join(":") || parts[0];
                    const pct    = Math.round((count / maxClicks) * 100);
                    return (
                      <tr key={key} className="border-b border-border hover:bg-slate-100">
                        <td className="px-3 py-2 text-slate-700">{name}</td>
                        <td className="px-3 py-2">
                          {action === "call" ? "📞" : action === "map" ? "📍" : "📋"} {action}
                        </td>
                        <td className="px-3 py-2 font-bold text-primary-700">{count}</td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <div className="h-2 rounded-full bg-primary-500" style={{ width: `${pct}%`, maxWidth: 100 }} />
                            <span className="text-slate-400 text-[11px]">{pct}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
