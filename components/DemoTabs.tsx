"use client";

import { useState } from "react";
import { CalendarCheck, MessageSquareText } from "lucide-react";
import { BookingPicker } from "./BookingPicker";
import { DemoForm } from "./DemoForm";
import { T, type Lang } from "@/lib/i18n";

/** Demo page: book a time, or send a message. Booking is hidden until an admin switches it on. */
export function DemoTabs({ lang, bookingEnabled }: { lang: Lang; bookingEnabled: boolean }) {
  const [tab, setTab] = useState<"book" | "message">(bookingEnabled ? "book" : "message");
  const tabs = [
    ...(bookingEnabled ? [{ key: "book" as const, icon: CalendarCheck, label: T(lang, "Book a call", "کال بک کریں") }] : []),
    { key: "message" as const, icon: MessageSquareText, label: T(lang, "Send a message", "پیغام بھیجیں") },
  ];
  return (
    <div>
      {tabs.length > 1 && (
        <div className="mb-5 inline-flex rounded-xl border border-line bg-white p-1" role="tablist">
          {tabs.map((t) => (
            <button key={t.key} role="tab" aria-selected={tab === t.key} onClick={() => setTab(t.key)} className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${tab === t.key ? "bg-brand-600 text-white" : "text-ink-soft hover:text-black"}`}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>
      )}
      {tab === "book" && bookingEnabled ? <BookingPicker lang={lang} /> : <DemoForm lang={lang} />}
    </div>
  );
}
