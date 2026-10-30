"use client";

import { useId, type ReactNode } from "react";
import {
  Activity, BarChart3, Bell, BookOpen, Calendar, CalendarCheck, Car, CheckCircle2, ClipboardList, Dumbbell, FileText,
  FolderOpen, GitPullRequestArrow, LayoutDashboard, Mail, MessageSquare, Search, Settings, Stethoscope, Users,
  Workflow, Wallet, Send, Clock, Gauge, UserCog, ListChecks, Bot, Package, ShoppingCart, Target, TrendingUp, type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { AdminDashboardMock, BrowserFrame } from "./visuals";
import { T, type Lang } from "@/lib/i18n";

/* ---------------------------------------------------------------- atoms */

const initials = (n: string) => n.split(" ").map((w) => w[0]).slice(0, 2).join("");

function Shell({ icons, children, title, sub }: { icons: LucideIcon[]; children: ReactNode; title: string; sub: string }) {
  return (
    <div className="flex bg-white text-black" dir="ltr" aria-hidden="true">
      <div className="hidden w-12 shrink-0 flex-col items-center gap-2.5 bg-navy-900 py-3.5 sm:flex">
        <span className="mb-1 grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-sm font-bold text-white">e</span>
        {icons.map((Ic, i) => (
          <span key={i} className={`grid h-8 w-8 place-items-center rounded-lg ${i === 0 ? "bg-white/15 text-white" : "text-white/45"}`}><Ic size={15} /></span>
        ))}
      </div>
      <div className="min-w-0 flex-1 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold">{title}</p>
            <p className="text-[11px] text-ink-soft">{sub}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-[11px] text-ink-soft sm:flex"><Search size={12} /></span>
            <span className="relative grid h-8 w-8 place-items-center rounded-lg border border-line"><Bell size={14} /><i className="absolute end-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-brand-600" /></span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function Kpis({ items }: { items: { l: string; v: string; d?: string; icon: LucideIcon }[] }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
      {items.map((k, i) => (
        <motion.div key={k.l} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 + i * 0.07 }} className="rounded-xl border border-line p-3">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-brand-700"><k.icon size={14} /></span>
          <p className="mt-2 text-base font-extrabold leading-none">{k.v}</p>
          <p className="mt-1 flex items-center justify-between text-[10px] text-ink-soft">{k.l}{k.d && <b className="text-brand-600">{k.d}</b>}</p>
        </motion.div>
      ))}
    </div>
  );
}

function Card({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-line p-3 ${className}`}>
      <p className="text-xs font-bold">{title}</p>
      {children}
    </div>
  );
}

function Area({ d, className = "h-24" }: { d: string; className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 340 90" className={`mt-2 w-full overflow-visible ${className}`}>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3d7766" stopOpacity="0.3" />
          <stop offset="1" stopColor="#3d7766" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path d={`${d} L340,90 L0,90 Z`} fill={`url(#${id})`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.8 }} />
      <motion.path d={d} fill="none" stroke="#3d7766" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut" }} />
    </svg>
  );
}

function Donut({ pct, label }: { pct: number; label: string }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-20 w-20 shrink-0">
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
          <circle cx="40" cy="40" r={r} fill="none" stroke="#e4e8e6" strokeWidth="9" />
          <motion.circle cx="40" cy="40" r={r} fill="none" stroke="#3d7766" strokeWidth="9" strokeLinecap="round" strokeDasharray={c} initial={{ strokeDashoffset: c }} whileInView={{ strokeDashoffset: c * (1 - pct / 100) }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.3 }} />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-sm font-extrabold">{pct}%</span>
      </div>
      <p className="text-[11px] text-ink-soft">{label}</p>
    </div>
  );
}

function Chip({ children, tone = "ok" }: { children: ReactNode; tone?: "ok" | "warn" | "info" }) {
  const c = tone === "ok" ? "bg-brand-100 text-brand-700" : tone === "warn" ? "bg-amber-100 text-amber-800" : "bg-sky-100 text-sky-800";
  return <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${c}`}>{children}</span>;
}

function Row({ lead, title, sub, right }: { lead: ReactNode; title: string; sub?: string; right?: ReactNode }) {
  return (
    <li className="flex items-center justify-between gap-2 text-[11px]">
      <span className="flex min-w-0 items-center gap-2">
        {lead}
        <span className="min-w-0"><b className="block truncate">{title}</b>{sub && <span className="block truncate text-[10px] text-ink-soft">{sub}</span>}</span>
      </span>
      {right}
    </li>
  );
}

const avatar = (n: string) => <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy-800 text-[9px] font-bold text-white">{initials(n)}</span>;
const tile = (Ic: LucideIcon) => <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700"><Ic size={13} /></span>;

const lineA = "M0,70 C30,62 55,44 85,50 C115,56 135,28 170,32 C205,36 225,16 262,20 C292,23 312,10 340,8";
const lineB = "M0,60 C30,64 55,50 90,46 C125,42 145,58 180,40 C215,22 240,34 270,22 C298,12 318,18 340,10";

/* -------------------------------------------------------------- products */

function FormedMock({ lang }: { lang: Lang }) {
  const sessions = [
    ["John Carter", T(lang, "Upper Body Strength", "اپر باڈی اسٹرینتھ"), "10:30"],
    ["Sophia Bennett", T(lang, "HIIT and Core", "ہائٹ اور کور"), "12:00"],
    ["Maria Brown", T(lang, "Full Body Conditioning", "فل باڈی کنڈیشننگ"), "13:30"],
    ["Daniel Evans", T(lang, "Mobility and Recovery", "موبیلٹی اور ریکوری"), "15:00"],
  ];
  return (
    <Shell icons={[LayoutDashboard, Users, Calendar, Dumbbell, MessageSquare, Wallet, Settings]} title={T(lang, "Welcome back, Coach", "خوش آمدید، کوچ")} sub={T(lang, "Here is what is happening today", "آج کا خلاصہ")}>
      <Kpis items={[
        { l: T(lang, "Active clients", "فعال کلائنٹس"), v: "128", d: "+12", icon: Users },
        { l: T(lang, "Sessions this week", "اس ہفتے کے سیشنز"), v: "24", icon: Calendar },
        { l: T(lang, "Completion", "تکمیل"), v: "82%", d: "+6%", icon: CheckCircle2 },
        { l: T(lang, "Monthly revenue", "ماہانہ آمدنی"), v: "$24,850", d: "+10%", icon: Wallet },
      ]} />
      <div className="mt-3 grid gap-3 lg:grid-cols-5">
        <Card title={T(lang, "Upcoming sessions", "آنے والے سیشنز")} className="lg:col-span-3">
          <ul className="mt-2 space-y-2.5">
            {sessions.map(([n, w, t]) => <Row key={n} lead={avatar(n)} title={n} sub={w} right={<span className="text-[10px] font-semibold text-ink-soft">{t}</span>} />)}
          </ul>
        </Card>
        <Card title={T(lang, "Client progress", "کلائنٹس کی پیشرفت")} className="lg:col-span-2"><Area d={lineA} className="h-28" /></Card>
      </div>
    </Shell>
  );
}

function PrimaMock({ lang }: { lang: Lang }) {
  const tasks: [string, string, "ok" | "warn" | "info"][] = [
    [T(lang, "Employee handbook review", "ملازم ہینڈ بک کا جائزہ"), T(lang, "In review", "زیر جائزہ"), "info"],
    [T(lang, "Contract verification", "معاہدے کی تصدیق"), T(lang, "Qualified", "تصدیق شدہ"), "ok"],
    [T(lang, "Policy update approval", "پالیسی اپ ڈیٹ کی منظوری"), T(lang, "New", "نیا"), "warn"],
  ];
  const docs = [["Employee_Handbook.pdf", "HR"], ["Contract_2024.pdf", "Legal"], ["Policy_Update.pdf", "Admin"]];
  return (
    <Shell icons={[LayoutDashboard, Users, FolderOpen, Workflow, ListChecks, BarChart3, GitPullRequestArrow, Settings]} title={T(lang, "Dashboard", "ڈیش بورڈ")} sub={T(lang, "Workflow and management overview", "ورک فلو اور مینجمنٹ کا جائزہ")}>
      <Kpis items={[
        { l: T(lang, "Employees", "ملازمین"), v: "1,248", d: "+16%", icon: Users },
        { l: T(lang, "Pending approvals", "زیر التوا منظوریاں"), v: "32", icon: GitPullRequestArrow },
        { l: T(lang, "Active workflows", "فعال ورک فلو"), v: "18", d: "+10%", icon: Workflow },
        { l: T(lang, "Documents", "دستاویزات"), v: "2,653", d: "+10%", icon: FileText },
      ]} />
      <div className="mt-3 grid gap-3 lg:grid-cols-5">
        <Card title={T(lang, "Task overview", "ٹاسک کا جائزہ")} className="lg:col-span-2">
          <ul className="mt-2 space-y-2.5">{tasks.map(([t, s, tone]) => <Row key={t} lead={tile(ClipboardList)} title={t} right={<Chip tone={tone}>{s}</Chip>} />)}</ul>
        </Card>
        <Card title={T(lang, "Approval flow", "منظوری کا بہاؤ")} className="lg:col-span-1"><div className="mt-3"><Donut pct={68} label={T(lang, "Approved", "منظور")} /></div></Card>
        <Card title={T(lang, "Recent documents", "حالیہ دستاویزات")} className="lg:col-span-2">
          <ul className="mt-2 space-y-2.5">{docs.map(([n, d]) => <Row key={n} lead={tile(FileText)} title={n} sub={d} />)}</ul>
        </Card>
      </div>
    </Shell>
  );
}

function EmailMock({ lang }: { lang: Lang }) {
  const reports = [
    [T(lang, "Sales performance report", "سیلز کارکردگی رپورٹ"), "09:00"],
    [T(lang, "Weekly business report", "ہفتہ وار کاروباری رپورٹ"), "08:00"],
    [T(lang, "Marketing analytics report", "مارکیٹنگ تجزیاتی رپورٹ"), "06:00"],
  ];
  return (
    <Shell icons={[LayoutDashboard, FileText, Mail, Clock, ClipboardList, Users, BarChart3, Settings]} title={T(lang, "Email Report Portal", "ای میل رپورٹ پورٹل")} sub={T(lang, "Overview", "جائزہ")}>
      <Kpis items={[
        { l: T(lang, "Total reports", "کل رپورٹس"), v: "128", d: "+12%", icon: FileText },
        { l: T(lang, "Emails sent", "بھیجی گئی ای میلز"), v: "2,543", d: "+18%", icon: Send },
        { l: T(lang, "Open rate", "کھولنے کی شرح"), v: "68.4%", d: "+5%", icon: Mail },
        { l: T(lang, "Click rate", "کلک کی شرح"), v: "24.7%", d: "+6%", icon: Activity },
      ]} />
      <div className="mt-3 grid gap-3 lg:grid-cols-5">
        <Card title={T(lang, "Report overview", "رپورٹ کا جائزہ")} className="lg:col-span-3"><Area d={lineB} className="h-24" /></Card>
        <Card title={T(lang, "Delivery status", "ترسیل کی حالت")} className="lg:col-span-2"><div className="mt-3"><Donut pct={96} label={T(lang, "Delivered", "پہنچ گئیں")} /></div></Card>
      </div>
      <Card title={T(lang, "Recent reports", "حالیہ رپورٹس")} className="mt-3">
        <ul className="mt-2 space-y-2.5">{reports.map(([n, t]) => <Row key={n} lead={tile(FileText)} title={n} sub={t} right={<Chip>{T(lang, "Delivered", "پہنچ گئی")}</Chip>} />)}</ul>
      </Card>
    </Shell>
  );
}

function ProEdMock({ lang }: { lang: Lang }) {
  return (
    <Shell icons={[LayoutDashboard, Stethoscope, BookOpen, FileText, MessageSquare, Settings]} title="MedRecPros MD" sub={T(lang, "AI-assisted coding and policy research", "اے آئی کی مدد سے کوڈنگ اور پالیسی ریسرچ")}>
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-brand-300 bg-brand-50/60 px-3 py-2.5 text-[11px] text-ink-soft">
        <Search size={13} className="shrink-0 text-brand-600" />
        <span className="truncate">{T(lang, "Acute exacerbation of COPD in a patient who quit smoking", "سگریٹ چھوڑ چکے مریض میں سی او پی ڈی کی شدید شدت")}</span>
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-5">
        <Card title={T(lang, "Suggested codes", "تجویز کردہ کوڈز")} className="lg:col-span-3">
          <ul className="mt-2 space-y-2.5">
            {[["J44.1", T(lang, "COPD with acute exacerbation", "سی او پی ڈی بمع شدید شدت")], ["Z87.891", T(lang, "History of nicotine dependence", "نکوٹین کی عادت کی تاریخ")]].map(([c, d], i) => (
              <motion.li key={c} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.15 }} className="flex items-center justify-between gap-2 rounded-lg bg-mist px-2.5 py-2 text-[11px]">
                <span className="flex min-w-0 items-center gap-2"><b className="rounded bg-navy-900 px-1.5 py-0.5 font-mono text-[10px] text-white">{c}</b><span className="truncate">{d}</span></span>
                <Chip>{T(lang, "Match", "مماثل")}</Chip>
              </motion.li>
            ))}
          </ul>
          <p className="mt-3 text-[9px] text-ink-soft">{T(lang, "Sample data for illustration", "صرف مثال کے لیے نمونہ ڈیٹا")}</p>
        </Card>
        <Card title={T(lang, "Physician query draft", "فزیشن کوئری کا مسودہ")} className="lg:col-span-2">
          <p className="mt-2 text-[10px] leading-relaxed text-ink-soft">{T(lang, "Dr., the record mentions shortness of breath. Please clarify the clinical significance and acuity so the diagnosis can be coded accurately.", "ڈاکٹر صاحب، ریکارڈ میں سانس کی تکلیف کا ذکر ہے۔ براہ کرم طبی اہمیت اور شدت واضح کریں تاکہ تشخیص درست کوڈ ہو سکے۔")}</p>
          <span className="mt-2 inline-block rounded-md bg-brand-600 px-2 py-1 text-[9px] font-semibold text-white">{T(lang, "Compliant draft", "مستند مسودہ")}</span>
        </Card>
      </div>
    </Shell>
  );
}

function HayMock({ lang }: { lang: Lang }) {
  const skills: [string, number][] = [
    [T(lang, "Parking", "پارکنگ"), 80],
    [T(lang, "Roundabouts", "گول چکر"), 60],
    [T(lang, "Highway driving", "ہائی وے ڈرائیونگ"), 35],
  ];
  const days = ["M", "T", "W", "T", "F", "S"];
  const blocks = [[0, 1], [1, 3], [2, 0], [3, 2], [4, 1], [5, 3]];
  return (
    <Shell icons={[LayoutDashboard, CalendarCheck, Car, Users, Gauge, Wallet, UserCog, Settings]} title={T(lang, "Lesson planner", "اسباق کا منصوبہ")} sub={T(lang, "This week", "اس ہفتے")}>
      <Kpis items={[
        { l: T(lang, "Learners", "سیکھنے والے"), v: "86", d: "+9", icon: Users },
        { l: T(lang, "Lessons this week", "اس ہفتے کے اسباق"), v: "42", icon: CalendarCheck },
        { l: T(lang, "Vehicles", "گاڑیاں"), v: "14", icon: Car },
        { l: T(lang, "Pass rate", "کامیابی کی شرح"), v: "91%", d: "+3%", icon: CheckCircle2 },
      ]} />
      <div className="mt-3 grid gap-3 lg:grid-cols-5">
        <Card title={T(lang, "Schedule", "شیڈول")} className="lg:col-span-3">
          <div className="mt-2 grid grid-cols-6 gap-1.5">
            {days.map((d, i) => (
              <div key={i} className="space-y-1.5">
                <p className="text-center text-[9px] font-semibold text-ink-soft">{d}</p>
                {[0, 1, 2, 3].map((r) => {
                  const on = blocks[i][1] === r;
                  return <motion.span key={r} initial={{ scale: 0.6, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.05 }} className={`block h-5 rounded-md ${on ? "bg-brand-600" : "bg-mist"}`} />;
                })}
              </div>
            ))}
          </div>
        </Card>
        <Card title={T(lang, "Learner progress", "سیکھنے والے کی پیشرفت")} className="lg:col-span-2">
          <ul className="mt-2 space-y-2.5">
            {skills.map(([n, v]) => (
              <li key={n} className="text-[10px]">
                <span className="flex justify-between"><b>{n}</b><span className="text-ink-soft">{v}%</span></span>
                <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-mist"><motion.span initial={{ width: 0 }} whileInView={{ width: `${v}%` }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.3 }} className="block h-full rounded-full bg-brand-600" /></span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Shell>
  );
}


function SalesmateMock({ lang }: { lang: Lang }) {
  const leads: [string, string, "ok" | "warn" | "info"][] = [
    ["Ariene McCoy", T(lang, "New", "نیا"), "info"],
    ["Dianne Russell", T(lang, "Contacted", "رابطہ ہوا"), "warn"],
    ["Guy Hawkins", T(lang, "Qualified", "اہل"), "ok"],
  ];
  const flow = [T(lang, "New lead", "نئی لیڈ"), T(lang, "AI score", "اے آئی اسکور"), T(lang, "Follow up", "فالو اپ"), T(lang, "Convert", "کنورٹ")];
  return (
    <Shell icons={[LayoutDashboard, Users, MessageSquare, Workflow, TrendingUp, Settings]} title="Salesmate AI" sub={T(lang, "Sales overview", "سیلز کا جائزہ")}>
      <Kpis items={[
        { l: T(lang, "Total revenue", "کل آمدنی"), v: "$248,560", d: "+16.5%", icon: Wallet },
        { l: T(lang, "Deals in pipeline", "پائپ لائن میں ڈیلز"), v: "156", icon: Target },
        { l: T(lang, "Win rate", "کامیابی کی شرح"), v: "68%", d: "+5%", icon: CheckCircle2 },
        { l: T(lang, "New leads", "نئی لیڈز"), v: "342", d: "+21%", icon: Users },
      ]} />
      <div className="mt-3 grid gap-3 lg:grid-cols-5">
        <Card title={T(lang, "Recent leads", "حالیہ لیڈز")} className="lg:col-span-2">
          <ul className="mt-2 space-y-2.5">{leads.map(([n, st, tone]) => <Row key={n} lead={avatar(n)} title={n} right={<Chip tone={tone}>{st}</Chip>} />)}</ul>
        </Card>
        <Card title={T(lang, "AI assistant", "اے آئی اسسٹنٹ")} className="lg:col-span-3">
          <div className="mt-2 space-y-2 text-[10px]">
            <p className="max-w-[85%] rounded-xl rounded-es-sm bg-mist px-2.5 py-1.5">{T(lang, "Hi! I am your AI sales assistant. How can I help you today?", "السلام علیکم! میں آپ کا اے آئی سیلز اسسٹنٹ ہوں۔ میں آپ کی کیا مدد کر سکتا ہوں؟")}</p>
            <p className="ms-auto max-w-[80%] rounded-xl rounded-ee-sm bg-brand-600 px-2.5 py-1.5 text-white">{T(lang, "Do you have a monthly plan?", "کیا آپ کا کوئی ماہانہ پلان ہے؟")}</p>
            <p className="max-w-[85%] rounded-xl rounded-es-sm bg-mist px-2.5 py-1.5">{T(lang, "Yes! I can share the options and book a demo for you.", "جی ہاں! میں آپ کو آپشنز بتا کر ڈیمو بک کر سکتا ہوں۔")}</p>
          </div>
        </Card>
      </div>
      <Card title={T(lang, "Smart automation", "سمارٹ آٹومیشن")} className="mt-3">
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {flow.map((f, i) => (
            <span key={f} className="flex items-center gap-1.5">
              <span className="rounded-lg bg-brand-50 px-2.5 py-1 text-[10px] font-semibold text-brand-700">{f}</span>
              {i < flow.length - 1 && <span className="text-ink-soft">→</span>}
            </span>
          ))}
        </div>
      </Card>
    </Shell>
  );
}

function PosMock({ lang }: { lang: Lang }) {
  const orders: [string, string, string, "ok" | "warn"][] = [
    ["#X90-00022", "Wireless Headphones", "Rs 320", "ok"],
    ["#X90-00024", "Bluetooth Speaker", "Rs 256", "warn"],
    ["#X90-00123", "Smart Case", "Rs 100", "ok"],
  ];
  const top: [string, number][] = [["Wireless Headphones", 325], ["Bluetooth Speaker", 279], ["Charger Adapter", 189]];
  return (
    <Shell icons={[LayoutDashboard, ShoppingCart, Package, Users, BarChart3, Settings]} title={T(lang, "Dashboard", "ڈیش بورڈ")} sub="AXCEL POS">
      <Kpis items={[
        { l: T(lang, "Today's sales", "آج کی فروخت"), v: "Rs 32,589", d: "+12.2%", icon: Wallet },
        { l: T(lang, "Orders", "آرڈرز"), v: "246", d: "+13.5%", icon: ShoppingCart },
        { l: T(lang, "Customers", "کسٹمرز"), v: "1,245", d: "+18.2%", icon: Users },
        { l: T(lang, "Low stock", "کم اسٹاک"), v: "23", icon: Package },
      ]} />
      <div className="mt-3 grid gap-3 lg:grid-cols-5">
        <Card title={T(lang, "Recent orders", "حالیہ آرڈرز")} className="lg:col-span-3">
          <ul className="mt-2 space-y-2.5">{orders.map(([id, name, amt, tone]) => <Row key={id} lead={tile(ShoppingCart)} title={name} sub={`${id} · ${amt}`} right={<Chip tone={tone}>{tone === "ok" ? T(lang, "Delivered", "ڈیلیور") : T(lang, "Processing", "جاری")}</Chip>} />)}</ul>
        </Card>
        <Card title={T(lang, "Payment methods", "ادائیگی کے طریقے")} className="lg:col-span-2"><div className="mt-3"><Donut pct={62} label={T(lang, "Card payments", "کارڈ ادائیگیاں")} /></div></Card>
      </div>
      <Card title={T(lang, "Top products", "مقبول مصنوعات")} className="mt-3">
        <ul className="mt-2 space-y-2">
          {top.map(([n, v]) => (
            <li key={n} className="text-[10px]">
              <span className="flex justify-between"><b>{n}</b><span className="text-ink-soft">{v}</span></span>
              <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-mist"><motion.span initial={{ width: 0 }} whileInView={{ width: `${(v / 325) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.3 }} className="block h-full rounded-full bg-brand-600" /></span>
            </li>
          ))}
        </ul>
      </Card>
    </Shell>
  );
}

/** Branded dashboard mockup for a product slug. */
export function ProductMock({ slug, lang }: { slug: string; lang: Lang }) {
  const inner =
    slug === "formed" ? <FormedMock lang={lang} /> :
    slug === "prima-portal" ? <PrimaMock lang={lang} /> :
    slug === "email-report-portal" ? <EmailMock lang={lang} /> :
    slug === "proed-medical" ? <ProEdMock lang={lang} /> :
    slug === "hayroutes" ? <HayMock lang={lang} /> :
    slug === "salesmate-ai" ? <SalesmateMock lang={lang} /> :
    slug === "pos" ? <PosMock lang={lang} /> :
    <AdminDashboardMock lang={lang} />;
  // Only real product domains are shown; the rest use an ePortal path.
  const url: Record<string, string> = { eschool: "eportal.pk/solutions/eschool", formed: "formed.fit", "prima-portal": "primaportal.co.za", hayroutes: "hayroutes.com" };
  return <BrowserFrame url={url[slug] ?? `eportal.pk/solutions/${slug}`}>{inner}</BrowserFrame>;
}
