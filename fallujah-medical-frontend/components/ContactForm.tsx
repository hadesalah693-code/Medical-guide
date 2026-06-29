'use client';

import { useState } from "react";
import Button from "./ui/Button";

const SUBJECTS = [
  { value: "",      label: "اختر الموضوع" },
  { value: "add",   label: "إضافة عيادة" },
  { value: "edit",  label: "تصحيح معلومة" },
  { value: "ad",    label: "إعلان" },
  { value: "other", label: "أخرى" },
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", subject: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    const msgs: unknown[] = JSON.parse(localStorage.getItem("daleelMessages") || "[]");
    msgs.unshift({ ...form, time: new Date().toISOString() });
    localStorage.setItem("daleelMessages", JSON.stringify(msgs));
    setSent(true);
  }

  const inputCls = "w-full border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 rounded-xl px-3.5 py-2.5 text-[13.5px] bg-white outline-none transition-all";

  return (
    <section id="contact" className="page-container py-8 lg:py-12 bg-gray-50 lg:bg-white border-t border-gray-200 max-w-3xl">
      <h2 className="font-display text-[18px] font-bold text-gray-900 mb-4">تواصل معنا</h2>
      <div className="bg-white rounded-[var(--radius-card)] border border-gray-100 shadow-[var(--shadow-soft)] p-5">
        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="الاسم *" required className={inputCls} />
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="الهاتف" dir="ltr" className={inputCls} />
            <select name="subject" value={form.subject} onChange={handleChange} className={inputCls}>
              {SUBJECTS.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
            </select>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="رسالتك *" required rows={3} className={inputCls + " resize-none"} />
            <Button full type="submit">إرسال</Button>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-success-50 text-success-600 flex items-center justify-center mx-auto text-xl mb-3">✓</div>
            <p className="font-display font-bold text-gray-900">تم الإرسال!</p>
          </div>
        )}
      </div>
    </section>
  );
}
