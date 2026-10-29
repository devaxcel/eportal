import type { L } from "./i18n";

export const nav: { key: string; path: string; label: L }[] = [
  { key: "solutions", path: "/solutions", label: { en: "Solutions", ur: "حل" } },
  { key: "pricing", path: "/pricing", label: { en: "Pricing", ur: "قیمتیں" } },
  { key: "about", path: "/about", label: { en: "About", ur: "ہمارے بارے میں" } },
  { key: "contact", path: "/contact", label: { en: "Contact", ur: "رابطہ" } },
];

export const ui = {
  demo: { en: "Request a Demo", ur: "ڈیمو حاصل کریں" },
  seePricing: { en: "See pricing", ur: "قیمتیں دیکھیں" },
  learnMore: { en: "Learn more", ur: "مزید جانیں" },
  language: { en: "اردو", ur: "English" },
  whatsapp: { en: "Chat on WhatsApp", ur: "واٹس ایپ پر بات کریں" },
  newBadge: { en: "New", ur: "نیا" },
  liveBadge: { en: "Live", ur: "دستیاب" },
  perMonth: { en: "/ month", ur: "/ ماہانہ" },
  perYear: { en: "/ year", ur: "/ سالانہ" },
  monthly: { en: "Monthly", ur: "ماہانہ" },
  yearly: { en: "Yearly", ur: "سالانہ" },
  save: { en: "2 months free", ur: "2 ماہ مفت" },
  popular: { en: "Most popular", ur: "سب سے مقبول" },
  getStarted: { en: "Get started", ur: "شروع کریں" },
  contactSales: { en: "Talk to us", ur: "ہم سے بات کریں" },
  explorePortals: { en: "Explore all portals", ur: "تمام پورٹلز دیکھیں" },
  exploreSolutions: { en: "Explore all solutions", ur: "تمام حل دیکھیں" },
  samplePreview: {
    en: "Sample preview. Real answers come from your school's data.",
    ur: "نمونہ پیش نظارہ۔ اصل جوابات آپ کے اسکول کے ڈیٹا سے آتے ہیں۔",
  },
  rights: { en: "All rights reserved.", ur: "جملہ حقوق محفوظ ہیں۔" },
  poweredBy: { en: "Built by", ur: "تیار کردہ" },
  quickLinks: { en: "Explore", ur: "دریافت کریں" },
  contactUs: { en: "Contact", ur: "رابطہ" },
};

export const hero = {
  badge: { en: "AI-powered school management for Pakistan", ur: "پاکستان کے لیے اے آئی سے چلنے والا اسکول مینجمنٹ" },
  titleA: { en: "Run your entire school", ur: "اپنا پورا اسکول" },
  titleB: { en: "from one smart platform", ur: "ایک سمارٹ پلیٹ فارم سے چلائیں" },
  sub: {
    en: "Admissions, attendance, fees, exams, and parent communication, in English and Urdu, with an AI assistant that saves your staff hours every day.",
    ur: "داخلے، حاضری، فیس، امتحانات اور والدین سے رابطہ، اردو اور انگریزی میں، ایک اے آئی اسسٹنٹ کے ساتھ جو آپ کے عملے کے روزانہ کئی گھنٹے بچاتا ہے۔",
  },
  points: [
    { en: "Works on web and Android", ur: "ویب اور اینڈرائیڈ پر کام کرتا ہے" },
    { en: "Urdu and English", ur: "اردو اور انگریزی" },
    { en: "Biometric and SMS ready", ur: "بائیو میٹرک اور ایس ایم ایس تیار" },
  ] as L[],
};

export const stats: { value: string; label: L }[] = [
  { value: "15+", label: { en: "Modules in one system", ur: "ایک سسٹم میں ماڈیولز" } },
  { value: "6", label: { en: "Role-based portals", ur: "کردار پر مبنی پورٹلز" } },
  { value: "5+", label: { en: "Years of experience", ur: "سال کا تجربہ" } },
  { value: "2", label: { en: "Languages, EN & UR", ur: "زبانیں، اردو اور انگریزی" } },
];

export const modules: { icon: string; label: L }[] = [
  { icon: "UserPlus", label: { en: "Admission", ur: "داخلہ" } },
  { icon: "CalendarCheck", label: { en: "Attendance", ur: "حاضری" } },
  { icon: "ClipboardList", label: { en: "Examination", ur: "امتحانات" } },
  { icon: "MonitorPlay", label: { en: "Online LMS", ur: "آن لائن لیکچرز" } },
  { icon: "Wallet", label: { en: "Finance & Fees", ur: "مالیات اور فیس" } },
  { icon: "GraduationCap", label: { en: "Students", ur: "طلبہ" } },
  { icon: "Clock", label: { en: "Timetable", ur: "ٹائم ٹیبل" } },
  { icon: "Building2", label: { en: "Administration", ur: "انتظامیہ" } },
  { icon: "Bus", label: { en: "Transport", ur: "ٹرانسپورٹ" } },
  { icon: "BookOpen", label: { en: "Academics", ur: "تعلیمی امور" } },
  { icon: "Banknote", label: { en: "Payroll", ur: "تنخواہ" } },
  { icon: "Network", label: { en: "Multi-campus", ur: "متعدد کیمپس" } },
  { icon: "Users", label: { en: "HR", ur: "ایچ آر" } },
  { icon: "Award", label: { en: "Certificates", ur: "سرٹیفکیٹ" } },
  { icon: "Library", label: { en: "Library", ur: "لائبریری" } },
];

export type Portal = {
  slug: string;
  icon: string;
  name: L;
  tagline: L;
  features: L[];
};

export const portals: Portal[] = [
  {
    slug: "admin",
    icon: "ShieldCheck",
    name: { en: "Admin Portal", ur: "ایڈمن پورٹل" },
    tagline: { en: "Full control of your school in one dashboard", ur: "ایک ڈیش بورڈ میں پورے اسکول پر مکمل کنٹرول" },
    features: [
      { en: "Student and staff records with digital ID cards", ur: "ڈیجیٹل شناختی کارڈ کے ساتھ طلبہ اور عملے کا ریکارڈ" },
      { en: "Admission forms and enquiry tracking", ur: "داخلہ فارم اور انکوائری ٹریکنگ" },
      { en: "Leaving and birth certificates in one click", ur: "ایک کلک میں لیونگ اور برتھ سرٹیفکیٹ" },
      { en: "Role permissions for every staff member", ur: "ہر عملے کے رکن کے لیے اجازتیں" },
      { en: "Live reports on attendance, fees and results", ur: "حاضری، فیس اور نتائج کی لائیو رپورٹس" },
    ],
  },
  {
    slug: "teacher",
    icon: "PenLine",
    name: { en: "Teacher Portal", ur: "ٹیچر پورٹل" },
    tagline: { en: "Less paperwork, more teaching", ur: "کم کاغذی کام، زیادہ تدریس" },
    features: [
      { en: "Mark attendance in seconds from phone or web", ur: "فون یا ویب سے سیکنڈوں میں حاضری لگائیں" },
      { en: "Enter marks and generate result cards", ur: "نمبر درج کریں اور رزلٹ کارڈ بنائیں" },
      { en: "Share homework, notes and online lectures", ur: "ہوم ورک، نوٹس اور آن لائن لیکچرز شیئر کریں" },
      { en: "AI-drafted report card comments", ur: "اے آئی سے تیار کردہ رپورٹ کارڈ تبصرے" },
      { en: "Personal timetable and class lists", ur: "ذاتی ٹائم ٹیبل اور کلاس فہرستیں" },
    ],
  },
  {
    slug: "parent",
    icon: "Users",
    name: { en: "Parent App", ur: "پیرنٹ ایپ" },
    tagline: { en: "Parents stay informed without calling the school", ur: "والدین اسکول کو فون کیے بغیر باخبر رہتے ہیں" },
    features: [
      { en: "Daily attendance calendar for each child", ur: "ہر بچے کا روزانہ حاضری کیلنڈر" },
      { en: "Result cards and performance graphs", ur: "رزلٹ کارڈ اور کارکردگی کے گراف" },
      { en: "Fee challans, dues and payment history", ur: "فیس چالان، بقایاجات اور ادائیگی کی تاریخ" },
      { en: "Instant notices and homework alerts", ur: "فوری نوٹس اور ہوم ورک الرٹس" },
      { en: "AI assistant that answers in Urdu or English", ur: "اے آئی اسسٹنٹ جو اردو یا انگریزی میں جواب دیتا ہے" },
    ],
  },
  {
    slug: "student",
    icon: "Backpack",
    name: { en: "Student Portal", ur: "اسٹوڈنٹ پورٹل" },
    tagline: { en: "Learning, schedules and results in a student's pocket", ur: "سیکھنا، شیڈول اور نتائج طالب علم کی جیب میں" },
    features: [
      { en: "Online lectures and recorded classes", ur: "آن لائن لیکچرز اور ریکارڈ شدہ کلاسیں" },
      { en: "Assignments with deadlines and submissions", ur: "ڈیڈ لائن اور جمع کرانے کے ساتھ اسائنمنٹس" },
      { en: "Timetable, datesheet and results", ur: "ٹائم ٹیبل، ڈیٹ شیٹ اور نتائج" },
      { en: "Library catalogue and borrowed books", ur: "لائبریری کیٹلاگ اور لی گئی کتابیں" },
      { en: "AI study helper for practice questions", ur: "مشقی سوالات کے لیے اے آئی اسٹڈی ہیلپر" },
    ],
  },
  {
    slug: "accounts",
    icon: "Calculator",
    name: { en: "Accounts & Cashier Portal", ur: "اکاؤنٹس اور کیشیئر پورٹل" },
    tagline: { en: "Fees collected, tracked and reconciled automatically", ur: "فیس خودکار طور پر وصول، ٹریک اور حساب میں شامل" },
    features: [
      { en: "Fee challans in bulk with family discounts", ur: "فیملی رعایت کے ساتھ بلک فیس چالان" },
      { en: "Cashier counter with instant receipts", ur: "فوری رسید کے ساتھ کیشیئر کاؤنٹر" },
      { en: "Expense ledger and weekly expense report", ur: "اخراجات کا کھاتہ اور ہفتہ وار رپورٹ" },
      { en: "Defaulter lists with automatic SMS reminders", ur: "نادہندگان کی فہرست اور خودکار ایس ایم ایس یاددہانی" },
      { en: "Payroll and salary slips", ur: "تنخواہ اور سیلری سلپ" },
    ],
  },
  {
    slug: "campus",
    icon: "Network",
    name: { en: "Multi-Campus HQ", ur: "ملٹی کیمپس ہیڈ آفس" },
    tagline: { en: "Every branch, one super admin view", ur: "ہر برانچ، ایک سپر ایڈمن منظر" },
    features: [
      { en: "Compare attendance, fees and results across branches", ur: "برانچوں میں حاضری، فیس اور نتائج کا موازنہ" },
      { en: "Central policies with branch-level control", ur: "برانچ سطح کے کنٹرول کے ساتھ مرکزی پالیسیاں" },
      { en: "Staff transfers between campuses", ur: "کیمپسوں کے درمیان عملے کا تبادلہ" },
      { en: "Consolidated financial statements", ur: "مجموعی مالیاتی گوشوارے" },
      { en: "Branch performance alerts", ur: "برانچ کی کارکردگی کے الرٹس" },
    ],
  },
];

export type Solution = {
  slug: string;
  icon: string;
  name: L;
  tagline: L;
  description: L;
  features: L[];
  status: "live" | "new";
  url?: string;
  pricingOnSite?: boolean;
  accent: string;
  forWho: L[];
};

// Placeholder product line-up. Edit to match the SaaS platforms you actually offer.
export const solutions: Solution[] = [
  {
    slug: "eschool",
    icon: "School",
    status: "live",
    name: { en: "eSchool", ur: "ای اسکول" },
    tagline: { en: "Complete school management", ur: "مکمل اسکول مینجمنٹ" },
    description: {
      en: "Our flagship platform for schools and colleges: admissions, attendance, exams, fees, timetable and parent communication in one place.",
      ur: "اسکولوں اور کالجوں کے لیے ہمارا بنیادی پلیٹ فارم: داخلے، حاضری، امتحانات، فیس، ٹائم ٹیبل اور والدین سے رابطہ ایک جگہ۔",
    },
    features: [
      { en: "15+ integrated modules", ur: "15 سے زائد مربوط ماڈیولز" },
      { en: "Web portal plus Android apps", ur: "ویب پورٹل اور اینڈرائیڈ ایپس" },
      { en: "Biometric attendance integration", ur: "بائیو میٹرک حاضری انضمام" },
      { en: "Bulk SMS from your own SIM", ur: "اپنی سم سے بلک ایس ایم ایس" },
    ],
    accent: "from-brand-400 to-brand-700",
    forWho: [
      { en: "Private schools and colleges", ur: "نجی اسکول اور کالجز" },
      { en: "Multi-branch education groups", ur: "متعدد برانچ والے تعلیمی گروپ" },
      { en: "Principals who want fewer registers", ur: "وہ پرنسپل جو رجسٹرز کم کرنا چاہتے ہیں" },
    ],
  },
  {
    slug: "formed",
    icon: "Dumbbell",
    status: "live",
    url: "https://formed.fit",
    pricingOnSite: true,
    name: { en: "Formed", ur: "فارمڈ" },
    tagline: { en: "Hire a certified personal trainer", ur: "مستند پرسنل ٹرینر ہائر کریں" },
    description: {
      en: "A trainer-matching platform for people who want results without the gym commute. Clients are matched with certified, vetted trainers for private sessions, with programmes and progress tracked in a client portal.",
      ur: "ان لوگوں کے لیے ٹرینر میچنگ پلیٹ فارم جو جم جائے بغیر نتائج چاہتے ہیں۔ کلائنٹس کو مستند، جانچے گئے ٹرینرز سے نجی سیشنز کے لیے ملایا جاتا ہے، اور پروگرام و پیشرفت کلائنٹ پورٹل میں ٹریک ہوتی ہے۔",
    },
    features: [
      { en: "Certified, background-checked trainers", ur: "مستند اور جانچ شدہ ٹرینرز" },
      { en: "Fast matching with the right trainer", ur: "درست ٹرینر کے ساتھ فوری میچنگ" },
      { en: "Custom programme and session notes", ur: "حسب ضرورت پروگرام اور سیشن نوٹس" },
      { en: "Client portal to book, pause or cancel", ur: "بکنگ، توقف یا منسوخی کے لیے کلائنٹ پورٹل" },
    ],
    accent: "from-rose-400 to-pink-600",
    forWho: [
      { en: "Busy professionals who want to train at home", ur: "مصروف پیشہ ور افراد جو گھر پر ورزش چاہتے ہیں" },
      { en: "Certified trainers looking for clients", ur: "مستند ٹرینرز جو کلائنٹس تلاش کر رہے ہیں" },
      { en: "Anyone who prefers private, one-to-one sessions", ur: "نجی، ون ٹو ون سیشنز پسند کرنے والے افراد" },
    ],
  },
  {
    slug: "data-portal",
    icon: "Database",
    status: "live",
    url: "https://www.primaportal.co.za/login",
    name: { en: "Data Portal", ur: "ڈیٹا پورٹل" },
    tagline: { en: "A safe home for your organisation's datasets", ur: "آپ کے ادارے کے ڈیٹا سیٹس کا محفوظ ٹھکانا" },
    description: {
      en: "Store, organise and share your organisation's datasets in one secure place, so teams stop hunting through email attachments and shared drives.",
      ur: "اپنے ادارے کے ڈیٹا سیٹس ایک محفوظ جگہ پر رکھیں، ترتیب دیں اور شیئر کریں، تاکہ ٹیمیں ای میل اٹیچمنٹس اور شیئرڈ ڈرائیوز میں تلاش نہ کریں۔",
    },
    features: [
      { en: "Central, searchable dataset library", ur: "مرکزی، قابل تلاش ڈیٹا سیٹ لائبریری" },
      { en: "Role-based access and sharing", ur: "کردار پر مبنی رسائی اور شیئرنگ" },
      { en: "Versioning and activity history", ur: "ورژننگ اور سرگرمی کی تاریخ" },
      { en: "Easy upload and export", ur: "آسان اپ لوڈ اور ایکسپورٹ" },
    ],
    accent: "from-sky-400 to-indigo-600",
    forWho: [
      { en: "Organisations with many spreadsheets and files", ur: "بہت سی اسپریڈ شیٹس اور فائلوں والے ادارے" },
      { en: "Research and analytics teams", ur: "تحقیق اور تجزیاتی ٹیمیں" },
      { en: "Managers who need one source of truth", ur: "وہ مینیجرز جنہیں ایک مستند ذریعہ چاہیے" },
    ],
  },
  {
    slug: "proed-medical",
    icon: "Stethoscope",
    status: "live",
    url: "https://proed-coder-ai-eight.vercel.app/",
    name: { en: "ProEd Medical", ur: "پرو ایڈ میڈیکل" },
    tagline: { en: "AI-powered medical coding assistant", ur: "اے آئی سے چلنے والا میڈیکل کوڈنگ اسسٹنٹ" },
    description: {
      en: "MedRecPros MD helps coding and clinical documentation teams with medical coding, policy research and compliant physician query drafting, so the right answer is found in seconds instead of hours.",
      ur: "میڈرک پروز ایم ڈی کوڈنگ اور کلینیکل ڈاکومنٹیشن ٹیموں کی میڈیکل کوڈنگ، پالیسی ریسرچ اور مستند فزیشن کوئری ڈرافٹنگ میں مدد کرتا ہے، تاکہ درست جواب گھنٹوں کے بجائے سیکنڈوں میں ملے۔",
    },
    features: [
      { en: "AI-assisted medical coding", ur: "اے آئی کی مدد سے میڈیکل کوڈنگ" },
      { en: "Policy research in plain language", ur: "سادہ زبان میں پالیسی ریسرچ" },
      { en: "Compliant physician query drafting", ur: "مستند فزیشن کوئری ڈرافٹنگ" },
      { en: "Secure sign-in managed by administrators", ur: "ایڈمنسٹریٹرز کے زیر انتظام محفوظ سائن ان" },
    ],
    accent: "from-cyan-400 to-blue-600",
    forWho: [
      { en: "Medical coders and billing teams", ur: "میڈیکل کوڈرز اور بلنگ ٹیمیں" },
      { en: "Clinical documentation improvement (CDI) teams", ur: "کلینیکل ڈاکومنٹیشن امپروومنٹ (سی ڈی آئی) ٹیمیں" },
      { en: "Clinics, hospitals and staffing firms", ur: "کلینکس، اسپتال اور اسٹاف فرمیں" },
    ],
  },
  {
    slug: "hayroutes",
    icon: "Car",
    status: "live",
    url: "https://hayroutes.com/",
    name: { en: "HayRoutes", ur: "ہے روٹس" },
    tagline: { en: "Driving school platform for learners and instructors", ur: "سیکھنے والوں اور انسٹرکٹرز کے لیے ڈرائیونگ اسکول پلیٹ فارم" },
    description: {
      en: "HayRoutes connects learners with driving instructors and gives driving schools the tools to run everything: lesson booking, scheduling, progress tracking, fleet and billing.",
      ur: "ہے روٹس سیکھنے والوں کو ڈرائیونگ انسٹرکٹرز سے ملاتا ہے اور ڈرائیونگ اسکولوں کو سب کچھ چلانے کے ٹولز دیتا ہے: اسباق کی بکنگ، شیڈولنگ، پیشرفت کی ٹریکنگ، گاڑیاں اور بلنگ۔",
    },
    features: [
      { en: "Learners book lessons and track milestones", ur: "سیکھنے والے اسباق بک کرتے اور سنگ میل ٹریک کرتے ہیں" },
      { en: "Smart instructor scheduling and lesson templates", ur: "انسٹرکٹرز کے لیے سمارٹ شیڈولنگ اور لیسن ٹیمپلیٹس" },
      { en: "Fleet maintenance, licence and insurance tracking", ur: "گاڑیوں کی مینٹیننس، لائسنس اور انشورنس ٹریکنگ" },
      { en: "Admin billing, permissions and reports", ur: "ایڈمن بلنگ، اجازتیں اور رپورٹس" },
    ],
    accent: "from-amber-400 to-orange-600",
    forWho: [
      { en: "Learners preparing for a driving licence", ur: "ڈرائیونگ لائسنس کی تیاری کرنے والے" },
      { en: "Professional driving instructors", ur: "پیشہ ور ڈرائیونگ انسٹرکٹرز" },
      { en: "Driving schools and fleet managers", ur: "ڈرائیونگ اسکول اور فلیٹ مینیجرز" },
    ],
  },
];

export const aiFeatures: { icon: string; title: L; desc: L }[] = [
  {
    icon: "Bot",
    title: { en: "AI Parent Assistant", ur: "اے آئی پیرنٹ اسسٹنٹ" },
    desc: {
      en: "Parents ask about fees, attendance or results in Urdu or English and get an instant, accurate answer from school data.",
      ur: "والدین فیس، حاضری یا نتائج کے بارے میں اردو یا انگریزی میں پوچھیں اور اسکول کے ڈیٹا سے فوری درست جواب پائیں۔",
    },
  },
  {
    icon: "FileText",
    title: { en: "Report Card Comments", ur: "رپورٹ کارڈ تبصرے" },
    desc: {
      en: "Teachers review AI-drafted, personal comments for every student, based on marks and attendance, then edit and approve.",
      ur: "اساتذہ نمبروں اور حاضری کی بنیاد پر ہر طالب علم کے لیے اے آئی سے تیار ذاتی تبصرے دیکھتے، ترمیم کرتے اور منظور کرتے ہیں۔",
    },
  },
  {
    icon: "BellRing",
    title: { en: "Smart Fee Reminders", ur: "سمارٹ فیس یاددہانی" },
    desc: {
      en: "Polite reminders written for each family's situation and sent by SMS or WhatsApp at the right time.",
      ur: "ہر خاندان کی صورتحال کے مطابق مہذب یاددہانی، مناسب وقت پر ایس ایم ایس یا واٹس ایپ کے ذریعے۔",
    },
  },
  {
    icon: "TrendingDown",
    title: { en: "Early Warning Insights", ur: "قبل از وقت انتباہ" },
    desc: {
      en: "Spot students whose attendance or marks are slipping before it becomes a problem, so teachers can step in early.",
      ur: "حاضری یا نمبروں میں کمی والے طلبہ کو مسئلہ بننے سے پہلے پہچانیں تاکہ اساتذہ جلد مدد کر سکیں۔",
    },
  },
];

export const chatDemo: { q: L; a: L }[] = [
  {
    q: { en: "How much fee is due for Ayesha?", ur: "عائشہ کی کتنی فیس باقی ہے؟" },
    a: {
      en: "Ayesha (Class 6-B) has Rs 8,500 due for October. The last date is 10 November. You can pay at the school counter or through your bank app using challan reference 6B-0142.",
      ur: "عائشہ (جماعت 6-بی) کی اکتوبر کی 8,500 روپے فیس باقی ہے۔ آخری تاریخ 10 نومبر ہے۔ آپ اسکول کاؤنٹر پر یا بینک ایپ میں چالان نمبر 6B-0142 سے ادائیگی کر سکتے ہیں۔",
    },
  },
  {
    q: { en: "Was she present this week?", ur: "کیا وہ اس ہفتے حاضر تھی؟" },
    a: {
      en: "Ayesha was present 4 out of 5 days this week. She was absent on Wednesday, and a leave application has not been submitted.",
      ur: "عائشہ اس ہفتے 5 میں سے 4 دن حاضر تھی۔ بدھ کو غیر حاضر تھی اور چھٹی کی درخواست جمع نہیں ہوئی۔",
    },
  },
  {
    q: { en: "How did she do in the monthly test?", ur: "ماہانہ ٹیسٹ میں اس کی کارکردگی کیسی رہی؟" },
    a: {
      en: "She scored 82% overall: Maths 90%, Science 85%, English 78%, Urdu 75%. Her Maths result is her best this term. Extra reading practice may help in Urdu.",
      ur: "اس نے مجموعی طور پر 82% نمبر لیے: ریاضی 90%، سائنس 85%، انگریزی 78%، اردو 75%۔ ریاضی اس ٹرم کا بہترین نتیجہ ہے۔ اردو میں اضافی مطالعہ مفید ہو سکتا ہے۔",
    },
  },
];

export type Plan = {
  key: string;
  name: L;
  monthly: number | null;
  students: L;
  features: L[];
  popular?: boolean;
};

// Placeholder pricing in PKR. Replace with real prices.
export const plans: Plan[] = [
  {
    key: "starter",
    name: { en: "Starter", ur: "اسٹارٹر" },
    monthly: 5000,
    students: { en: "Up to 200 students", ur: "200 طلبہ تک" },
    features: [
      { en: "Admission, attendance, fees, results", ur: "داخلہ، حاضری، فیس، نتائج" },
      { en: "Admin and teacher portals", ur: "ایڈمن اور ٹیچر پورٹلز" },
      { en: "Parent app", ur: "پیرنٹ ایپ" },
      { en: "500 SMS credits per month", ur: "ماہانہ 500 ایس ایم ایس" },
      { en: "Email and WhatsApp support", ur: "ای میل اور واٹس ایپ سپورٹ" },
    ],
  },
  {
    key: "growth",
    name: { en: "Growth", ur: "گروتھ" },
    monthly: 12000,
    students: { en: "Up to 600 students", ur: "600 طلبہ تک" },
    popular: true,
    features: [
      { en: "Everything in Starter", ur: "اسٹارٹر کی تمام خصوصیات" },
      { en: "Biometric attendance integration", ur: "بائیو میٹرک حاضری انضمام" },
      { en: "Online lectures and assignments", ur: "آن لائن لیکچرز اور اسائنمنٹس" },
      { en: "AI parent assistant", ur: "اے آئی پیرنٹ اسسٹنٹ" },
      { en: "Transport and library modules", ur: "ٹرانسپورٹ اور لائبریری ماڈیولز" },
    ],
  },
  {
    key: "campus",
    name: { en: "Campus", ur: "کیمپس" },
    monthly: 25000,
    students: { en: "Up to 1,500 students", ur: "1,500 طلبہ تک" },
    features: [
      { en: "Everything in Growth", ur: "گروتھ کی تمام خصوصیات" },
      { en: "Payroll and HR", ur: "پے رول اور ایچ آر" },
      { en: "Report card AI comments", ur: "رپورٹ کارڈ اے آئی تبصرے" },
      { en: "Early warning insights", ur: "قبل از وقت انتباہ" },
      { en: "Priority phone support", ur: "ترجیحی فون سپورٹ" },
    ],
  },
  {
    key: "enterprise",
    name: { en: "Enterprise", ur: "انٹرپرائز" },
    monthly: null,
    students: { en: "Multiple campuses", ur: "متعدد کیمپس" },
    features: [
      { en: "Multi-campus HQ portal", ur: "ملٹی کیمپس ہیڈ آفس پورٹل" },
      { en: "Custom integrations", ur: "حسب ضرورت انضمام" },
      { en: "Staff training on site", ur: "عملے کی آن سائٹ تربیت" },
      { en: "Dedicated account manager", ur: "مخصوص اکاؤنٹ منیجر" },
      { en: "Custom pricing", ur: "حسب ضرورت قیمت" },
    ],
  },
];

export const faqs: { q: L; a: L }[] = [
  {
    q: { en: "Does ePortal work in Urdu?", ur: "کیا ای پورٹل اردو میں کام کرتا ہے؟" },
    a: {
      en: "Yes. Portals, parent app, notices and result cards can be used in Urdu or English, and the AI assistant answers in the language the parent writes in.",
      ur: "جی ہاں۔ پورٹلز، پیرنٹ ایپ، نوٹس اور رزلٹ کارڈ اردو یا انگریزی میں استعمال ہو سکتے ہیں، اور اے آئی اسسٹنٹ اسی زبان میں جواب دیتا ہے جس میں والدین لکھیں۔",
    },
  },
  {
    q: { en: "Can we move our existing student data?", ur: "کیا ہم موجودہ طلبہ کا ڈیٹا منتقل کر سکتے ہیں؟" },
    a: {
      en: "Yes. Send us your Excel sheets and our team imports students, staff and fee records for you during onboarding.",
      ur: "جی ہاں۔ اپنی ایکسل شیٹس بھیجیں اور ہماری ٹیم آن بورڈنگ کے دوران طلبہ، عملے اور فیس کا ریکارڈ آپ کے لیے امپورٹ کر دے گی۔",
    },
  },
  {
    q: { en: "Is our data safe?", ur: "کیا ہمارا ڈیٹا محفوظ ہے؟" },
    a: {
      en: "Data is stored on secured servers with role-based access and regular backups. AI answers only use the school's own records, scoped to the parent or student asking.",
      ur: "ڈیٹا محفوظ سرورز پر کردار پر مبنی رسائی اور باقاعدہ بیک اپ کے ساتھ رکھا جاتا ہے۔ اے آئی جوابات صرف اسکول کے اپنے ریکارڈ سے آتے ہیں اور پوچھنے والے والدین یا طالب علم تک محدود رہتے ہیں۔",
    },
  },
  {
    q: { en: "How long does setup take?", ur: "سیٹ اپ میں کتنا وقت لگتا ہے؟" },
    a: {
      en: "Most schools go live within one to two weeks, including data import and staff training.",
      ur: "زیادہ تر اسکول ڈیٹا امپورٹ اور عملے کی تربیت سمیت ایک سے دو ہفتوں میں چل پڑتے ہیں۔",
    },
  },
  {
    q: { en: "Can we try before we buy?", ur: "کیا خریدنے سے پہلے آزما سکتے ہیں؟" },
    a: {
      en: "Yes. Request a demo and we will walk you through the system with your own school's scenario.",
      ur: "جی ہاں۔ ڈیمو کی درخواست کریں اور ہم آپ کے اپنے اسکول کی مثال کے ساتھ سسٹم دکھائیں گے۔",
    },
  },
];

export const steps: { title: L; desc: L }[] = [
  {
    title: { en: "Book a demo", ur: "ڈیمو بک کریں" },
    desc: { en: "We show the system using your school's real workflow.", ur: "ہم آپ کے اسکول کے اصل طریقہ کار کے ساتھ سسٹم دکھاتے ہیں۔" },
  },
  {
    title: { en: "We import your data", ur: "ہم آپ کا ڈیٹا منتقل کرتے ہیں" },
    desc: { en: "Students, staff and fees move over from your Excel sheets.", ur: "طلبہ، عملہ اور فیس آپ کی ایکسل شیٹس سے منتقل ہوتی ہے۔" },
  },
  {
    title: { en: "Train your team", ur: "اپنی ٹیم کی تربیت" },
    desc: { en: "Short sessions for admins, teachers and cashiers.", ur: "ایڈمن، اساتذہ اور کیشیئرز کے لیے مختصر سیشنز۔" },
  },
  {
    title: { en: "Go live", ur: "لائیو ہو جائیں" },
    desc: { en: "Parents get the app and you get your time back.", ur: "والدین کو ایپ ملتی ہے اور آپ کو آپ کا وقت واپس۔" },
  },
];

export const hubFaqs: { q: L; a: L }[] = [
  {
    q: { en: "What does ePortal offer?", ur: "ای پورٹل کیا پیش کرتا ہے؟" },
    a: {
      en: "ePortal is a family of platforms built by AXCEL in Lahore: eSchool for schools and colleges, Formed for hiring personal trainers, Data Portal for organisation datasets, ProEd Medical for AI-assisted medical coding, and HayRoutes for driving schools, instructors and learners.",
      ur: "ای پورٹل لاہور میں ایکسل کے بنائے ہوئے پلیٹ فارمز کا خاندان ہے: اسکولوں اور کالجوں کے لیے ای اسکول، پرسنل ٹرینر ہائر کرنے کے لیے فارمڈ، ادارے کے ڈیٹا سیٹس کے لیے ڈیٹا پورٹل، اے آئی کی مدد سے میڈیکل کوڈنگ کے لیے پرو ایڈ میڈیکل، اور ڈرائیونگ اسکولوں، انسٹرکٹرز اور سیکھنے والوں کے لیے ہے روٹس۔",
    },
  },
  {
    q: { en: "Do I need to use more than one platform?", ur: "کیا ایک سے زیادہ پلیٹ فارم استعمال کرنا ضروری ہے؟" },
    a: {
      en: "No. Every platform works on its own. Choose the one that fits your need and add others later if you want.",
      ur: "نہیں۔ ہر پلیٹ فارم الگ سے کام کرتا ہے۔ اپنی ضرورت کے مطابق ایک چنیں اور چاہیں تو بعد میں دوسرے شامل کریں۔",
    },
  },
  {
    q: { en: "Can we see it before we commit?", ur: "کیا ہم پہلے دیکھ سکتے ہیں؟" },
    a: {
      en: "Yes. Request a demo, tell us which solution you are interested in, and we will walk you through it.",
      ur: "جی ہاں۔ ڈیمو کی درخواست کریں، بتائیں کون سا حل چاہیے، اور ہم آپ کو دکھائیں گے۔",
    },
  },
  {
    q: { en: "Which languages are supported?", ur: "کون سی زبانیں دستیاب ہیں؟" },
    a: {
      en: "This website and eSchool work in English and Urdu. Ask us about language support for the other platforms.",
      ur: "یہ ویب سائٹ اور ای اسکول اردو اور انگریزی میں کام کرتے ہیں۔ دوسرے پلیٹ فارمز کی زبانوں کے بارے میں ہم سے پوچھیں۔",
    },
  },
  {
    q: { en: "How is pricing decided?", ur: "قیمت کیسے طے ہوتی ہے؟" },
    a: {
      en: "eSchool has published plans. For the other platforms we quote based on your needs. Request a demo and we will share a clear price.",
      ur: "ای اسکول کے پلانز شائع شدہ ہیں۔ دوسرے پلیٹ فارمز کے لیے ہم آپ کی ضرورت کے مطابق قیمت بتاتے ہیں۔ ڈیمو کی درخواست کریں، ہم واضح قیمت بتائیں گے۔",
    },
  },
];
