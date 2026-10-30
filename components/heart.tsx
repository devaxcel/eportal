"use client";

import { useRef, useState, useEffect } from "react";
import {
  AnimatePresence, motion, useScroll, useSpring, useTransform, type MotionValue,
} from "motion/react";
import {
  Award, Backpack, BookOpen, BookOpenCheck, CalendarCheck, Check, ClipboardCheck, Clock, GraduationCap, MessagesSquare,
  Pencil, PenLine, PhoneOff, ShieldCheck, Sparkles, Trophy, UserPlus, Users, Wallet, Zap,
} from "lucide-react";
import { PhoneFrame } from "./visuals";
import { SectionHead } from "./Section";
import { Reveal } from "./motion";
import { T, type Lang } from "@/lib/i18n";

/* ------------------------------------------------ 1. emotional statement */

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }} className="me-[0.28em] inline-block">{word}</motion.span>;
}

export function EmotionalStatement({ lang, variant = "hub" }: { lang: Lang; variant?: "hub" | "school" }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const text =
    variant === "school"
      ? T(
          lang,
          "Behind every record is a child. Behind every child is a family that trusts you with their future. We built ePortal so your school can give them its full attention.",
          "ہر ریکارڈ کے پیچھے ایک بچہ ہے۔ ہر بچے کے پیچھے ایک خاندان ہے جو اپنا مستقبل آپ کے سپرد کرتا ہے۔ ہم نے ای پورٹل اس لیے بنایا کہ آپ کا اسکول انہیں اپنی پوری توجہ دے سکے۔",
        )
      : T(
          lang,
          "Behind every platform is a person with a goal: a child to teach, a body to strengthen, a patient to care for, a road to learn. We build the tools that help them get there.",
          "ہر پلیٹ فارم کے پیچھے ایک انسان ہے جس کا ایک مقصد ہے: پڑھانے کے لیے ایک بچہ، مضبوط کرنے کے لیے ایک جسم، دیکھ بھال کے لیے ایک مریض، سیکھنے کے لیے ایک سڑک۔ ہم وہ ٹولز بناتے ہیں جو انہیں منزل تک پہنچائیں۔",
        );
  const words = text.split(" ");

  return (
    <section ref={ref} className="bg-hero relative overflow-hidden py-28 text-white sm:py-36">
      <div className="bg-grid absolute inset-0 opacity-60" />
      {[
        [GraduationCap, "start-[8%] top-[18%]", "0s", 44],
        [BookOpen, "end-[10%] top-[26%]", "1.2s", 52],
        [Pencil, "start-[18%] bottom-[16%]", "2.4s", 36],
        [Backpack, "end-[22%] bottom-[20%]", "0.6s", 46],
      ].map(([Ic, pos, delay, size], i) => {
        const Icn = Ic as typeof GraduationCap;
        return <Icn key={i} size={size as number} strokeWidth={1.2} className={`animate-float-slow absolute text-brand-400/30 ${pos}`} style={{ animationDelay: delay as string }} aria-hidden="true" />;
      })}
      <div className="container-x relative">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-brand-300">
          <BookOpen size={14} className="me-2 inline -translate-y-px" />
          {T(lang, "Why we do this", "ہم یہ کیوں کرتے ہیں")}
        </p>
        <p className="mx-auto mt-6 max-w-4xl text-center text-3xl font-extrabold leading-snug tracking-tight sm:text-5xl sm:leading-tight">
          {words.map((w, i) => {
            const start = (i / words.length) * 0.85;
            return <Word key={i} word={w} progress={scrollYProgress} range={[start, Math.min(start + 0.12, 1)]} />;
          })}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------ 2. moments stream */

const moments = (lang: Lang) => [
  { icon: ShieldCheck, t: T(lang, "Ayesha reached school safely", "عائشہ بخیریت اسکول پہنچ گئی"), time: "07:52" },
  { icon: Trophy, t: T(lang, "Ayesha scored 93% in Maths. Be proud!", "عائشہ نے ریاضی میں 93% نمبر لیے۔ فخر کیجیے!"), time: "10:30" },
  { icon: BookOpenCheck, t: T(lang, "Homework added: Urdu essay, due Friday", "ہوم ورک: اردو مضمون، جمعہ تک"), time: "12:10" },
  { icon: Wallet, t: T(lang, "Fee received. Thank you, Mrs. Khan.", "فیس موصول ہو گئی۔ شکریہ، محترمہ خان۔"), time: "14:05" },
  { icon: Award, t: T(lang, "Ayesha won the Science Fair certificate", "عائشہ نے سائنس میلے کا سرٹیفکیٹ جیتا"), time: "16:00" },
];

export function MomentsStream({ lang }: { lang: Lang }) {
  const list = moments(lang);
  const [n, setN] = useState(2);

  useEffect(() => {
    const id = setInterval(() => setN((v) => (v + 1) % list.length), 2800);
    return () => clearInterval(id);
  }, [list.length]);

  const shown = [0, 1, 2].map((k) => list[(n - k + list.length * 3) % list.length]).map((m, k) => ({ ...m, key: (n - k + list.length * 3), k }));

  const lines = [
    { icon: PhoneOff, t: T(lang, "No more worried phone calls at noon.", "دوپہر کو فکرمند فون کالز نہیں۔") },
    { icon: Zap, t: T(lang, "Good news reaches the family the same minute.", "اچھی خبر اسی لمحے گھر والوں تک پہنچتی ہے۔") },
    { icon: Users, t: T(lang, "Parents feel part of their child's day.", "والدین بچے کے دن کا حصہ محسوس کرتے ہیں۔") },
  ];

  return (
    <section className="container-x grid items-center gap-14 py-24 lg:grid-cols-2">
      <Reveal x={-30} y={0}>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{T(lang, "Little moments, big peace of mind", "چھوٹے لمحات، بڑا سکون")}</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {T(lang, "A parent's day, held gently", "والدین کا دن، نرمی سے سنبھالا ہوا")}
        </h2>
        <p className="mt-4 text-lg text-ink-soft">
          {T(lang, "Every message is small. Together they tell a mother her child is safe, learning and loved.", "ہر پیغام چھوٹا ہے۔ مل کر وہ ماں کو بتاتے ہیں کہ اس کا بچہ محفوظ ہے، سیکھ رہا ہے، اور چاہا جا رہا ہے۔")}
        </p>
        <ul className="mt-8 space-y-4">
          {lines.map((l, i) => (
            <Reveal key={i} delay={i * 0.1} y={14}>
              <li className="flex items-center gap-3 text-lg font-medium">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700"><l.icon size={17} /></span>
                {l.t}
              </li>
            </Reveal>
          ))}
        </ul>
      </Reveal>

      <Reveal x={30} y={0} delay={0.1} className="relative">
        <div className="absolute inset-x-10 -bottom-6 top-10 -z-10 rounded-full bg-brand-200/50 blur-3xl" />
        <div className="mx-auto w-64 sm:w-72">
          <PhoneFrame className="!bg-black">
            <div className="flex h-full flex-col bg-gradient-to-b from-brand-800 to-black px-3 pb-4 pt-10 text-white" aria-live="polite">
              <p className="text-center text-4xl font-light" dir="ltr">9:41</p>
              <p className="mb-5 text-center text-[11px] text-white/60">{T(lang, "Today · Mrs. Khan", "آج · محترمہ خان")}</p>
              <div className="relative flex-1">
                <AnimatePresence initial={false} mode="popLayout">
                  {shown.map((m) => (
                    <motion.div
                      layout
                      key={m.key}
                      initial={{ opacity: 0, y: -40, scale: 0.92 }}
                      animate={{ opacity: 1 - m.k * 0.3, y: 0, scale: 1 - m.k * 0.03 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 260, damping: 26 }}
                      className="mb-2.5 flex items-start gap-2.5 rounded-2xl bg-white/12 p-3 backdrop-blur"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-500 text-white"><m.icon size={16} /></span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between text-[10px] text-white/55"><b>ePortal</b><span dir="ltr">{m.time}</span></span>
                        <span className="mt-0.5 block text-[12px] font-medium leading-snug">{m.t}</span>
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <p className="text-center text-[10px] text-white/45">{T(lang, "Sample notifications", "نمونہ اطلاعات")}</p>
            </div>
          </PhoneFrame>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------ 3. a day in the school */

const personas = (lang: Lang) => [
  {
    key: "parent",
    label: T(lang, "Parent", "والدین"),
    icon: Users,
    who: T(lang, "Mrs. Khan, parent", "محترمہ خان، والدہ"),
    steps: [
      ["07:52", T(lang, "A message arrives: Ayesha reached school safely.", "پیغام آتا ہے: عائشہ بخیریت اسکول پہنچ گئی۔")],
      ["11:00", T(lang, "She opens the app and sees yesterday's test result.", "ایپ کھول کر کل کا ٹیسٹ نتیجہ دیکھتی ہیں۔")],
      ["14:00", T(lang, "The fee is paid from her phone, no queue, no lost day.", "فیس فون سے ادا ہو جاتی ہے، نہ قطار، نہ چھٹی۔")],
      ["20:00", T(lang, "Homework is clear, so the evening is for the family.", "ہوم ورک واضح ہے، شام گھر والوں کے لیے رہتی ہے۔")],
    ],
  },
  {
    key: "teacher",
    label: T(lang, "Teacher", "استاد"),
    icon: GraduationCap,
    who: T(lang, "Mr. Raza, teacher", "جناب رضا، استاد"),
    steps: [
      ["08:00", T(lang, "Attendance takes 40 seconds. Absent parents are alerted.", "حاضری 40 سیکنڈ میں لگتی ہے۔ غیر حاضر طلبہ کے والدین کو اطلاع جاتی ہے۔")],
      ["11:30", T(lang, "Marks are entered once. Result cards build themselves.", "نمبر ایک بار درج ہوتے ہیں۔ رزلٹ کارڈ خود بن جاتے ہیں۔")],
      ["13:00", T(lang, "Notes and a recorded lecture go to the whole class.", "نوٹس اور ریکارڈ شدہ لیکچر پوری کلاس کو جاتا ہے۔")],
      ["14:30", T(lang, "He goes home on time, with time left to rest.", "وہ وقت پر گھر جاتا ہے، آرام کا وقت بھی بچتا ہے۔")],
    ],
  },
  {
    key: "principal",
    label: T(lang, "Principal", "پرنسپل"),
    icon: ShieldCheck,
    who: T(lang, "Principal Siddiqui", "پرنسپل صدیقی"),
    steps: [
      ["08:30", T(lang, "One dashboard shows attendance across every branch.", "ایک ڈیش بورڈ پر ہر برانچ کی حاضری نظر آتی ہے۔")],
      ["10:00", T(lang, "Absence alerts are already sent. Nothing to chase.", "غیر حاضری کے الرٹ جا چکے ہیں۔ کچھ دیکھنا باقی نہیں۔")],
      ["12:00", T(lang, "Fee collection is live, with no month-end surprises.", "فیس کی وصولی لائیو ہے، مہینے کے آخر میں حیرت نہیں۔")],
      ["15:00", T(lang, "A student's slipping attendance is flagged, so she calls the family early.", "ایک طالب علم کی گرتی حاضری کی نشاندہی ہوتی ہے، وہ خاندان کو جلد فون کرتی ہیں۔")],
    ],
  },
];

export function DayInSchool({ lang }: { lang: Lang }) {
  const list = personas(lang);
  const [a, setA] = useState(0);
  const p = list[a];

  return (
    <section className="relative overflow-hidden bg-mist py-24">
      <div className="bg-dots pointer-events-none absolute inset-0" />
      <div className="container-x relative">
        <SectionHead
          eyebrow={T(lang, "A day in the life", "ایک دن کی کہانی")}
          title={T(lang, "See your school through their eyes", "ان کی نظر سے اپنا اسکول دیکھیں")}
          sub={T(lang, "An illustrative day for three people who rely on your school.", "تین افراد کا ایک مثالی دن جو آپ کے اسکول پر بھروسا کرتے ہیں۔")}
        />

        <div className="mt-10 flex justify-center gap-2">
          {list.map((x, i) => (
            <button
              key={x.key}
              onClick={() => setA(i)}
              aria-pressed={i === a}
              className={`relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${i === a ? "text-white" : "bg-white text-ink hover:bg-brand-50"}`}
            >
              {i === a && <motion.span layoutId="persona" className="absolute inset-0 rounded-full bg-brand-600" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <x.icon size={16} className="relative" />
              <span className="relative">{x.label}</span>
            </button>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-white p-6 shadow-xl shadow-black/5 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div key={p.key} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              <p className="flex items-center gap-3 text-xl font-extrabold text-brand-600">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-100 text-brand-700"><p.icon size={20} /></span>
                {p.who}
              </p>
              <ol className="relative mt-8 space-y-7 border-s-2 border-dashed border-brand-200 ps-8">
                {p.steps.map(([time, text], i) => (
                  <motion.li key={time} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.12 }} className="relative">
                    <span className="absolute -start-[2.65rem] top-1 grid h-5 w-5 place-items-center rounded-full bg-brand-600 ring-4 ring-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600" dir="ltr"><Clock size={13} />{time}</span>
                    <p className="mt-1 text-lg">{text}</p>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------ 4. a child's journey */

export function ChildJourney({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const top = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  const items = [
    { icon: UserPlus, t: T(lang, "The first day", "پہلا دن"), d: T(lang, "A smooth admission, and a family that feels welcome from the start.", "آسان داخلہ، اور ایسا خاندان جو پہلے دن سے خود کو خوش آمدید محسوس کرے۔") },
    { icon: CalendarCheck, t: T(lang, "Every day counts", "ہر دن اہم ہے"), d: T(lang, "Attendance that quietly notices when a child needs a little more support.", "حاضری جو خاموشی سے جان لیتی ہے کہ بچے کو کب تھوڑی اور مدد چاہیے۔") },
    { icon: ClipboardCheck, t: T(lang, "Proud results", "قابل فخر نتائج"), d: T(lang, "Result cards that celebrate progress, not just marks.", "رزلٹ کارڈ جو صرف نمبروں کی نہیں، پیشرفت کی بھی خوشی مناتے ہیں۔") },
    { icon: MessagesSquare, t: T(lang, "A closer family", "قریب تر خاندان"), d: T(lang, "Teachers and parents talking early, kindly and often.", "اساتذہ اور والدین کا جلد، نرمی سے اور اکثر رابطہ۔") },
    { icon: GraduationCap, t: T(lang, "The graduation day", "گریجویشن کا دن"), d: T(lang, "Certificates ready on time, and a story the whole school helped write.", "سرٹیفکیٹ وقت پر تیار، اور ایسی کہانی جو پورے اسکول نے مل کر لکھی۔") },
  ];

  return (
    <section className="container-x py-24">
      <SectionHead
        eyebrow={T(lang, "Every child's story", "ہر بچے کی کہانی")}
        title={T(lang, "From the first day to graduation, nothing is lost", "پہلے دن سے گریجویشن تک، کچھ ضائع نہیں ہوتا")}
      />
      <div ref={ref} className="relative mx-auto mt-16 max-w-4xl">
        <div className="absolute bottom-0 start-5 top-0 w-0.5 bg-brand-100 md:start-1/2 md:-translate-x-1/2 rtl:md:translate-x-1/2" />
        <motion.div style={{ scaleY, transformOrigin: "top" }} className="absolute bottom-0 start-5 top-0 w-0.5 bg-gradient-to-b from-brand-400 to-brand-600 md:start-1/2 md:-translate-x-1/2 rtl:md:translate-x-1/2" />
        <motion.span style={{ top }} className="absolute start-5 z-10 -ms-2.5 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/40 md:start-1/2" aria-hidden="true">
          <GraduationCap size={11} />
        </motion.span>

        <ol className="space-y-12">
          {items.map((it, i) => (
            <li key={it.t} className="relative grid md:grid-cols-2">
              <Reveal x={i % 2 ? 30 : -30} y={0} className={`ps-14 md:ps-0 ${i % 2 ? "md:col-start-2 md:ps-14" : "md:pe-14 md:text-end"}`}>
                <span className={`mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-600/25 ${i % 2 ? "" : "md:ms-auto"}`}>
                  <it.icon size={22} />
                </span>
                <h3 className="text-xl font-extrabold">{it.t}</h3>
                <p className="mt-1.5 text-ink-soft">{it.d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------ 5. time given back */

export function TimeBack({ lang }: { lang: Lang }) {
  const [teachers, setTeachers] = useState(25);
  const [mins, setMins] = useState(20);
  const hours = Math.round((teachers * mins * 24) / 60);
  const days = Math.round(hours / 8);

  const slider = "h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-brand-400";

  return (
    <section className="bg-hero relative overflow-hidden py-24 text-white">
      <div className="bg-grid absolute inset-0" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
        <Reveal x={-30} y={0}>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-300">{T(lang, "Time is the real gift", "وقت ہی اصل تحفہ ہے")}</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {T(lang, "How much time could your teachers give back to children?", "آپ کے اساتذہ بچوں کو کتنا وقت واپس دے سکتے ہیں؟")}
          </h2>
          <p className="mt-4 text-lg text-white/70">
            {T(lang, "Move the sliders to match your school. This is your own estimate, not a promise.", "سلائیڈر اپنے اسکول کے مطابق ہلائیں۔ یہ آپ کا اپنا اندازہ ہے، وعدہ نہیں۔")}
          </p>
          <div className="mt-8 space-y-7">
            <label className="block">
              <span className="flex justify-between font-semibold"><span>{T(lang, "Teachers in your school", "آپ کے اسکول کے اساتذہ")}</span><b className="text-brand-300" dir="ltr">{teachers}</b></span>
              <input type="range" min={3} max={150} value={teachers} onChange={(e) => setTeachers(+e.target.value)} className={`${slider} mt-3`} />
            </label>
            <label className="block">
              <span className="flex justify-between font-semibold"><span>{T(lang, "Minutes saved per teacher, per day", "فی استاد روزانہ بچنے والے منٹ")}</span><b className="text-brand-300" dir="ltr">{mins}</b></span>
              <input type="range" min={5} max={60} step={5} value={mins} onChange={(e) => setMins(+e.target.value)} className={`${slider} mt-3`} />
            </label>
          </div>
        </Reveal>

        <Reveal x={30} y={0} delay={0.1}>
          <div className="glass relative overflow-hidden rounded-3xl p-8 text-center sm:p-12">
            <Sparkles className="absolute end-6 top-6 text-brand-300/60" size={22} />
            <p className="text-sm text-white/65">{T(lang, "Every month, your teachers get back", "ہر مہینے آپ کے اساتذہ کو واپس ملتے ہیں")}</p>
            <motion.p key={hours} initial={{ scale: 0.9, opacity: 0.4 }} animate={{ scale: 1, opacity: 1 }} className="text-gradient my-3 text-7xl font-extrabold sm:text-8xl" dir="ltr">
              {hours.toLocaleString("en-US")}
            </motion.p>
            <p className="text-xl font-semibold">{T(lang, "hours", "گھنٹے")}</p>
            <div className="mx-auto my-6 h-px w-24 bg-white/20" />
            <p className="text-white/80">
              {T(lang, "That is about {days} full working days of attention, ready to go back to students.", "یہ تقریباً {days} مکمل کام کے دنوں کی توجہ ہے، جو طلبہ کو واپس مل سکتی ہے۔").replace("{days}", String(days))}
            </p>
            <p className="mt-4 text-xs text-white/45">
              {T(lang, "Based on 24 school days a month and 8-hour days.", "ایک ماہ میں 24 اسکول دن اور 8 گھنٹے کے دن کی بنیاد پر۔")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------ 6. a letter to schools */

export function PromiseLetter({ lang }: { lang: Lang }) {
  const promises = [
    T(lang, "We will answer when you call.", "جب آپ فون کریں گے، ہم جواب دیں گے۔"),
    T(lang, "We will never lock your data away.", "ہم آپ کا ڈیٹا کبھی قید نہیں کریں گے۔"),
    T(lang, "We will keep it simple enough for every parent.", "ہم اسے اتنا آسان رکھیں گے کہ ہر والد یا والدہ استعمال کر سکیں۔"),
  ];
  return (
    <section className="container-x py-24">
      <Reveal>
        <div className="relative mx-auto max-w-3xl rounded-[2rem] border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-white p-8 shadow-xl shadow-brand-900/5 sm:p-14">
          <span className="absolute -top-6 start-10 grid h-14 w-14 rotate-[-8deg] place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/30" aria-hidden="true"><PenLine size={26} /></span>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{T(lang, "A note to every school", "ہر اسکول کے نام ایک خط")}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {T(lang, "Your school's time belongs to children, not paperwork.", "آپ کے اسکول کا وقت بچوں کا ہے، کاغذی کارروائی کا نہیں۔")}
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
            <p>{T(lang, "We have sat with principals at the end of a long month, surrounded by registers, and heard the same sentence: \"I became an educator to teach, not to count.\"", "ہم مہینے کے آخر میں رجسٹرز میں گھرے پرنسپلز کے ساتھ بیٹھے ہیں اور وہی جملہ سنا ہے: \"میں تعلیم دینے آیا تھا، گنتی کرنے نہیں۔\"")}</p>
            <p>{T(lang, "ePortal exists to take that weight off your shoulders, so the people who care for children can spend their energy on them.", "ای پورٹل اسی لیے ہے کہ آپ کے کندھوں سے وہ بوجھ ہٹائے، تاکہ بچوں کی فکر کرنے والے اپنی توانائی انہی پر لگا سکیں۔")}</p>
          </div>
          <ul className="mt-8 space-y-3">
            {promises.map((x) => (
              <li key={x} className="flex items-center gap-3 font-semibold">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-600 text-white"><Check size={14} strokeWidth={3} /></span>{x}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-lg font-bold text-brand-600">{T(lang, "With care, the ePortal team · Lahore", "خلوص کے ساتھ، ای پورٹل ٹیم · لاہور")}</p>
        </div>
      </Reveal>
    </section>
  );
}
