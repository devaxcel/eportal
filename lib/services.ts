import type { L } from "./i18n";

/** Made-to-order services. One shared template (components/ServicePage.tsx) renders each of these. */
export type Service = {
  slug: "custom-portal" | "business-website";
  path: string;
  /** Short label used in the menu, emails and the dashboard */
  label: L;
  topic: string;
  eyebrow: L;
  title: L;
  sub: L;
  /** Meta title and description for search results */
  seoTitle: L;
  seoDescription: L;
  keywords: string[];
  icon: "Layers" | "Globe";
  /** Why choose this */
  benefits: { title: L; text: L }[];
  /** What the customer receives */
  included: L[];
  /** Who it suits */
  forWho: L[];
  steps: { title: L; text: L }[];
  faqs: { q: L; a: L }[];
  formTitle: L;
  formSub: L;
};

export const services: Service[] = [
  {
    slug: "custom-portal",
    path: "/custom-portal",
    label: { en: "Custom Portal", ur: "کسٹم پورٹل" },
    topic: "Custom portal",
    eyebrow: { en: "Custom portals", ur: "کسٹم پورٹلز" },
    title: { en: "Request a custom portal for your business", ur: "اپنے کاروبار کے لیے کسٹم پورٹل کی درخواست کریں" },
    sub: {
      en: "Customers, staff, partners or students log in to one secure place built around how your business really works. Tell us what you need and we design, build and support it.",
      ur: "کسٹمرز، عملہ، پارٹنرز یا طلبہ ایک محفوظ جگہ لاگ اِن کرتے ہیں جو آپ کے کاروبار کے اصل طریقہ کار کے مطابق بنی ہو۔ اپنی ضرورت بتائیں، ہم ڈیزائن، تیاری اور سپورٹ کریں گے۔",
    },
    seoTitle: { en: "Custom Business Portal Development in Pakistan", ur: "پاکستان میں کسٹم بزنس پورٹل کی تیاری" },
    seoDescription: {
      en: "Request a custom portal for your business: client, staff, vendor or student portals with logins, approvals, documents, payments and reports. Built in Lahore by ePortal. Free consultation.",
      ur: "اپنے کاروبار کے لیے کسٹم پورٹل کی درخواست کریں: کلائنٹ، اسٹاف، وینڈر یا اسٹوڈنٹ پورٹل، لاگ اِن، منظوریاں، دستاویزات، ادائیگیاں اور رپورٹس۔ لاہور میں ای پورٹل کی تیاری۔ مفت مشاورت۔",
    },
    keywords: ["custom portal development", "client portal", "customer portal", "employee portal", "vendor portal", "student portal", "web portal development Pakistan", "business portal Lahore"],
    icon: "Layers",
    benefits: [
      { title: { en: "Built around your process", ur: "آپ کے طریقہ کار کے مطابق" }, text: { en: "Your forms, approvals, roles and reports, not a generic template you have to bend your business around.", ur: "آپ کے فارم، منظوریاں، کردار اور رپورٹس، نہ کہ کوئی عام ٹیمپلیٹ جس کے مطابق آپ کو اپنا کاروبار ڈھالنا پڑے۔" } },
      { title: { en: "Secure by design", ur: "ڈیزائن ہی سے محفوظ" }, text: { en: "Role based access, an activity log and encrypted connections, so every person sees only what they should.", ur: "کردار کی بنیاد پر رسائی، سرگرمی کا ریکارڈ اور انکرپٹڈ کنکشن، تاکہ ہر شخص صرف وہی دیکھے جو اسے دیکھنا چاہیے۔" } },
      { title: { en: "Works on phone and desktop", ur: "فون اور کمپیوٹر دونوں پر" }, text: { en: "A responsive web portal your people can open from any device, with Urdu and English if you need both.", ur: "ایسا ویب پورٹل جو ہر ڈیوائس پر کھلے، اور ضرورت ہو تو اردو اور انگریزی دونوں کے ساتھ۔" } },
      { title: { en: "Connects to your tools", ur: "آپ کے ٹولز سے منسلک" }, text: { en: "Email, WhatsApp, payment gateways, spreadsheets and your existing systems can plug in.", ur: "ای میل، واٹس ایپ، پیمنٹ گیٹ وے، اسپریڈ شیٹس اور آپ کے موجودہ سسٹم جوڑے جا سکتے ہیں۔" } },
      { title: { en: "You own the result", ur: "نتیجے کے مالک آپ" }, text: { en: "Clear ownership of your data and a plain written quote, with no surprise charges later.", ur: "آپ کے ڈیٹا کی واضح ملکیت اور سادہ تحریری کوٹیشن، بعد میں کوئی غیر متوقع خرچہ نہیں۔" } },
      { title: { en: "Support after launch", ur: "لانچ کے بعد سپورٹ" }, text: { en: "Training for your team, fixes and new features as your business grows.", ur: "آپ کی ٹیم کی تربیت، مسائل کا حل اور کاروبار بڑھنے کے ساتھ نئے فیچرز۔" } },
    ],
    included: [
      { en: "Secure login for each type of user, with roles and permissions", ur: "ہر قسم کے صارف کے لیے محفوظ لاگ اِن، کرداروں اور اجازتوں کے ساتھ" },
      { en: "Online forms, requests and multi step approval workflows", ur: "آن لائن فارم، درخواستیں اور کئی مراحل کی منظوری کے ورک فلو" },
      { en: "Document upload, storage and sharing", ur: "دستاویزات اپ لوڈ، محفوظ اور شیئر کرنے کی سہولت" },
      { en: "Notifications by email and WhatsApp", ur: "ای میل اور واٹس ایپ پر اطلاعات" },
      { en: "Dashboards, reports and data export", ur: "ڈیش بورڈ، رپورٹس اور ڈیٹا ایکسپورٹ" },
      { en: "Online payments and invoices where you need them", ur: "جہاں ضرورت ہو آن لائن ادائیگیاں اور انوائسز" },
      { en: "An admin area to manage users and content yourself", ur: "صارفین اور مواد خود سنبھالنے کے لیے ایڈمن ایریا" },
      { en: "Hosting, backups and ongoing support", ur: "ہوسٹنگ، بیک اپ اور مسلسل سپورٹ" },
    ],
    forWho: [
      { en: "Companies that need a client or customer portal", ur: "وہ کمپنیاں جنہیں کلائنٹ یا کسٹمر پورٹل چاہیے" },
      { en: "Schools, colleges and training centres", ur: "اسکول، کالج اور تربیتی مراکز" },
      { en: "Clinics, labs and healthcare providers", ur: "کلینک، لیبارٹریاں اور صحت کے ادارے" },
      { en: "Distributors, franchises and vendor networks", ur: "ڈسٹری بیوٹرز، فرنچائزز اور وینڈر نیٹ ورک" },
      { en: "Teams replacing spreadsheets, paper forms and WhatsApp groups", ur: "وہ ٹیمیں جو اسپریڈ شیٹس، کاغذی فارم اور واٹس ایپ گروپ سے آگے بڑھنا چاہتی ہیں" },
    ],
    steps: [
      { title: { en: "Tell us what you need", ur: "اپنی ضرورت بتائیں" }, text: { en: "Fill in the short form below or message us on WhatsApp. No technical knowledge needed.", ur: "نیچے مختصر فارم بھریں یا واٹس ایپ پر پیغام بھیجیں۔ تکنیکی معلومات ضروری نہیں۔" } },
      { title: { en: "Free consultation", ur: "مفت مشاورت" }, text: { en: "A short call to understand your process, your users and what success looks like.", ur: "ایک مختصر کال جس میں ہم آپ کا طریقہ کار، صارفین اور مطلوبہ نتیجہ سمجھتے ہیں۔" } },
      { title: { en: "Clear written quote", ur: "واضح تحریری کوٹیشن" }, text: { en: "Scope, price and timeline in plain language before any work starts.", ur: "کام شروع ہونے سے پہلے دائرہ کار، قیمت اور مدت سادہ زبان میں۔" } },
      { title: { en: "Build and review", ur: "تیاری اور جائزہ" }, text: { en: "You see working versions along the way and tell us what to adjust.", ur: "آپ راستے میں کام کرتے ہوئے ورژن دیکھتے ہیں اور تبدیلیاں بتاتے ہیں۔" } },
      { title: { en: "Launch and support", ur: "لانچ اور سپورٹ" }, text: { en: "We go live, train your team and stay available for changes.", ur: "ہم لانچ کرتے ہیں، آپ کی ٹیم کو تربیت دیتے ہیں اور تبدیلیوں کے لیے دستیاب رہتے ہیں۔" } },
    ],
    faqs: [
      { q: { en: "What is a custom portal?", ur: "کسٹم پورٹل کیا ہوتا ہے؟" }, a: { en: "A custom portal is a private website where your customers, staff, partners or students log in to do things such as submit requests, get approvals, share documents, pay invoices and see reports. It is built to match your own process.", ur: "کسٹم پورٹل ایک نجی ویب سائٹ ہے جہاں آپ کے کسٹمرز، عملہ، پارٹنرز یا طلبہ لاگ اِن کر کے درخواستیں بھیجتے، منظوریاں لیتے، دستاویزات شیئر کرتے، ادائیگیاں کرتے اور رپورٹس دیکھتے ہیں۔ یہ آپ کے اپنے طریقہ کار کے مطابق بنایا جاتا ہے۔" } },
      { q: { en: "How much does a custom portal cost?", ur: "کسٹم پورٹل کی لاگت کتنی ہے؟" }, a: { en: "It depends on the number of user types and features. After a free consultation you receive a written quote with the scope, price and timeline, so there are no surprises.", ur: "یہ صارفین کی اقسام اور فیچرز کی تعداد پر منحصر ہے۔ مفت مشاورت کے بعد آپ کو دائرہ کار، قیمت اور مدت کے ساتھ تحریری کوٹیشن ملتی ہے، کوئی غیر متوقع خرچہ نہیں۔" } },
      { q: { en: "How long does it take?", ur: "کتنا وقت لگتا ہے؟" }, a: { en: "A focused portal can be ready in a few weeks. Larger systems are delivered in stages so you can start using the most important parts early.", ur: "ایک مخصوص پورٹل چند ہفتوں میں تیار ہو سکتا ہے۔ بڑے سسٹم مرحلہ وار دیے جاتے ہیں تاکہ آپ اہم حصے جلدی استعمال شروع کر سکیں۔" } },
      { q: { en: "Do you have a ready made option instead?", ur: "کیا آپ کے پاس تیار شدہ حل بھی ہے؟" }, a: { en: "Yes. SchoolDesk, ApproveFlow, LessonBook and our other platforms work out of the box. If one of them fits you, it is faster and cheaper. If not, we build exactly what you need.", ur: "جی ہاں۔ اسکول ڈیسک، اپروو فلو، لیسن بک اور ہمارے دوسرے پلیٹ فارمز فوراً استعمال کے لیے تیار ہیں۔ اگر ان میں سے کوئی آپ کے لیے موزوں ہو تو یہ تیز اور سستا ہے، ورنہ ہم بالکل وہی بناتے ہیں جو آپ کو چاہیے۔" } },
      { q: { en: "Can the portal work in Urdu and English?", ur: "کیا پورٹل اردو اور انگریزی میں چل سکتا ہے؟" }, a: { en: "Yes. We build portals in Urdu, English or both, including right to left layout.", ur: "جی ہاں۔ ہم اردو، انگریزی یا دونوں میں پورٹل بناتے ہیں، دائیں سے بائیں لے آؤٹ سمیت۔" } },
      { q: { en: "Who owns the data?", ur: "ڈیٹا کا مالک کون ہے؟" }, a: { en: "You do. Your data stays yours and you can export it at any time.", ur: "آپ۔ آپ کا ڈیٹا آپ ہی کا رہتا ہے اور آپ اسے کسی بھی وقت ایکسپورٹ کر سکتے ہیں۔" } },
    ],
    formTitle: { en: "Request your custom portal", ur: "اپنے کسٹم پورٹل کی درخواست دیں" },
    formSub: { en: "Describe what you want to build. We reply within one working day with next steps.", ur: "بتائیں کہ آپ کیا بنوانا چاہتے ہیں۔ ہم ایک کاروباری دن میں اگلے مراحل کے ساتھ جواب دیں گے۔" },
  },
  {
    slug: "business-website",
    path: "/business-website",
    label: { en: "Business Website", ur: "بزنس ویب سائٹ" },
    topic: "Business website",
    eyebrow: { en: "Websites", ur: "ویب سائٹس" },
    title: { en: "Get your business website", ur: "اپنے کاروبار کی ویب سائٹ بنوائیں" },
    sub: {
      en: "A fast, modern website that looks professional, shows up on Google and turns visitors into enquiries. Designed, built and launched for you.",
      ur: "تیز، جدید اور پیشہ ورانہ ویب سائٹ جو گوگل پر نظر آئے اور وزیٹرز کو گاہکوں میں بدلے۔ آپ کے لیے ڈیزائن، تیار اور لانچ۔",
    },
    seoTitle: { en: "Business Website Design and Development in Lahore", ur: "لاہور میں بزنس ویب سائٹ ڈیزائن اور تیاری" },
    seoDescription: {
      en: "Get your business website: fast, mobile friendly, SEO ready and easy to update. Domain, hosting, WhatsApp and contact forms included. Built in Lahore by ePortal. Free consultation.",
      ur: "اپنے کاروبار کی ویب سائٹ بنوائیں: تیز، موبائل فرینڈلی، ایس ای او کے لیے تیار اور آسانی سے اپ ڈیٹ ہونے والی۔ ڈومین، ہوسٹنگ، واٹس ایپ اور رابطہ فارم شامل۔ لاہور میں ای پورٹل کی تیاری۔ مفت مشاورت۔",
    },
    keywords: ["business website", "website design Lahore", "website development Pakistan", "company website", "small business website", "SEO friendly website", "website with WhatsApp", "web design Pakistan"],
    icon: "Globe",
    benefits: [
      { title: { en: "Professional first impression", ur: "پیشہ ورانہ پہلا تاثر" }, text: { en: "A clean design with your branding that builds trust the moment a customer lands.", ur: "آپ کی برانڈنگ کے ساتھ صاف ستھرا ڈیزائن جو پہلی نظر میں اعتماد پیدا کرے۔" } },
      { title: { en: "Found on Google", ur: "گوگل پر نظر آئیں" }, text: { en: "Fast pages, proper titles, descriptions and structured data so search engines understand your business.", ur: "تیز صفحات، درست ٹائٹل، تفصیل اور اسٹرکچرڈ ڈیٹا تاکہ سرچ انجن آپ کا کاروبار سمجھ سکیں۔" } },
      { title: { en: "Made for mobile", ur: "موبائل کے لیے بنی" }, text: { en: "Most visitors use a phone. Your site looks and works perfectly on every screen size.", ur: "زیادہ تر وزیٹرز فون استعمال کرتے ہیں۔ آپ کی ویب سائٹ ہر اسکرین پر بہترین چلتی ہے۔" } },
      { title: { en: "Turns visitors into enquiries", ur: "وزیٹرز کو گاہک بنائیں" }, text: { en: "Contact forms, click to call and WhatsApp buttons make it easy to reach you.", ur: "رابطہ فارم، کلک ٹو کال اور واٹس ایپ بٹن آپ تک پہنچنا آسان بناتے ہیں۔" } },
      { title: { en: "Easy to update", ur: "آسانی سے اپ ڈیٹ" }, text: { en: "Change text, photos and offers yourself, or ask us and we do it for you.", ur: "متن، تصاویر اور آفرز خود بدلیں، یا ہمیں کہیں ہم کر دیں گے۔" } },
      { title: { en: "Everything handled", ur: "سب کچھ ہمارے ذمے" }, text: { en: "Domain, hosting, security certificate and email set up, so you do not deal with technical work.", ur: "ڈومین، ہوسٹنگ، سیکیورٹی سرٹیفکیٹ اور ای میل کی سیٹنگ، آپ کو تکنیکی کام نہیں کرنا پڑتا۔" } },
    ],
    included: [
      { en: "Custom design that matches your brand", ur: "آپ کے برانڈ سے مطابقت رکھنے والا کسٹم ڈیزائن" },
      { en: "Pages for home, services, about, contact and more", ur: "ہوم، سروسز، تعارف، رابطہ اور مزید صفحات" },
      { en: "Mobile friendly and fast loading", ur: "موبائل فرینڈلی اور تیز لوڈنگ" },
      { en: "Search engine setup: titles, descriptions, sitemap and structured data", ur: "سرچ انجن سیٹ اپ: ٹائٹل، تفصیل، سائٹ میپ اور اسٹرکچرڈ ڈیٹا" },
      { en: "Contact form, WhatsApp and click to call buttons", ur: "رابطہ فارم، واٹس ایپ اور کلک ٹو کال بٹن" },
      { en: "Google Maps and social media links", ur: "گوگل میپس اور سوشل میڈیا لنکس" },
      { en: "Domain, hosting and SSL security certificate", ur: "ڈومین، ہوسٹنگ اور ایس ایس ایل سیکیورٹی سرٹیفکیٹ" },
      { en: "Optional Urdu and English versions, blog and online booking", ur: "اختیاری اردو اور انگریزی ورژن، بلاگ اور آن لائن بکنگ" },
    ],
    forWho: [
      { en: "Shops, restaurants and local services", ur: "دکانیں، ریسٹورنٹ اور مقامی سروسز" },
      { en: "Schools, academies and clinics", ur: "اسکول، اکیڈمیاں اور کلینک" },
      { en: "Agencies, consultants and freelancers", ur: "ایجنسیاں، کنسلٹنٹس اور فری لانسرز" },
      { en: "Manufacturers, traders and exporters", ur: "مینوفیکچررز، تاجر اور ایکسپورٹرز" },
      { en: "New businesses that need to launch online quickly", ur: "نئے کاروبار جنہیں جلدی آن لائن آنا ہے" },
    ],
    steps: [
      { title: { en: "Tell us about your business", ur: "اپنے کاروبار کے بارے میں بتائیں" }, text: { en: "Share what you do, who your customers are and any sites you like. A short form or a WhatsApp message is enough.", ur: "بتائیں آپ کیا کرتے ہیں، آپ کے گاہک کون ہیں اور کون سی ویب سائٹس پسند ہیں۔ مختصر فارم یا واٹس ایپ پیغام کافی ہے۔" } },
      { title: { en: "Free consultation and quote", ur: "مفت مشاورت اور کوٹیشن" }, text: { en: "We agree the pages and features and send a clear written price and timeline.", ur: "ہم صفحات اور فیچرز طے کرتے ہیں اور واضح تحریری قیمت اور مدت بھیجتے ہیں۔" } },
      { title: { en: "Design preview", ur: "ڈیزائن کا پیش نظارہ" }, text: { en: "You review the design and ask for changes before we build everything.", ur: "مکمل تیاری سے پہلے آپ ڈیزائن دیکھتے اور تبدیلیاں بتاتے ہیں۔" } },
      { title: { en: "Build and content", ur: "تیاری اور مواد" }, text: { en: "We build the site, add your content and set it up for search engines.", ur: "ہم ویب سائٹ بناتے ہیں، آپ کا مواد شامل کرتے ہیں اور اسے سرچ انجن کے لیے تیار کرتے ہیں۔" } },
      { title: { en: "Launch and support", ur: "لانچ اور سپورٹ" }, text: { en: "Your site goes live on your own domain. We stay available for updates and help.", ur: "آپ کی ویب سائٹ آپ کے اپنے ڈومین پر لائیو ہوتی ہے۔ اپ ڈیٹس اور مدد کے لیے ہم دستیاب رہتے ہیں۔" } },
    ],
    faqs: [
      { q: { en: "How much does a business website cost?", ur: "بزنس ویب سائٹ کی لاگت کتنی ہے؟" }, a: { en: "The price depends on the number of pages and features. After a free consultation you receive a clear written quote, with domain and hosting included in the plan.", ur: "قیمت صفحات اور فیچرز کی تعداد پر منحصر ہے۔ مفت مشاورت کے بعد آپ کو واضح تحریری کوٹیشن ملتی ہے، جس میں ڈومین اور ہوسٹنگ شامل ہوتی ہے۔" } },
      { q: { en: "How long does it take to build a website?", ur: "ویب سائٹ بننے میں کتنا وقت لگتا ہے؟" }, a: { en: "A typical business website is ready in one to three weeks, depending on how quickly we receive your content and feedback.", ur: "عام بزنس ویب سائٹ ایک سے تین ہفتوں میں تیار ہو جاتی ہے، یہ اس پر منحصر ہے کہ آپ کا مواد اور رائے کتنی جلدی ملتی ہے۔" } },
      { q: { en: "Will my website appear on Google?", ur: "کیا میری ویب سائٹ گوگل پر نظر آئے گی؟" }, a: { en: "We set up everything search engines need: fast pages, proper titles and descriptions, a sitemap and structured data. Ranking also depends on competition and content, and we can advise on that.", ur: "ہم وہ سب کچھ سیٹ کرتے ہیں جو سرچ انجن کو چاہیے: تیز صفحات، درست ٹائٹل اور تفصیل، سائٹ میپ اور اسٹرکچرڈ ڈیٹا۔ رینکنگ مقابلے اور مواد پر بھی منحصر ہے، اس بارے میں ہم مشورہ دے سکتے ہیں۔" } },
      { q: { en: "Can I update the website myself?", ur: "کیا میں ویب سائٹ خود اپ ڈیٹ کر سکتا ہوں؟" }, a: { en: "Yes. You can edit text, photos and offers yourself, or send us the change and we handle it.", ur: "جی ہاں۔ آپ متن، تصاویر اور آفرز خود بدل سکتے ہیں، یا تبدیلی ہمیں بھیج دیں ہم کر دیں گے۔" } },
      { q: { en: "Do I need to buy a domain and hosting?", ur: "کیا ڈومین اور ہوسٹنگ الگ خریدنی ہوگی؟" }, a: { en: "No. We arrange the domain, hosting and security certificate for you, and the domain is registered in your name.", ur: "نہیں۔ ڈومین، ہوسٹنگ اور سیکیورٹی سرٹیفکیٹ ہم آپ کے لیے انتظام کرتے ہیں، اور ڈومین آپ کے نام پر رجسٹر ہوتا ہے۔" } },
      { q: { en: "Do you build websites in Urdu or with online ordering?", ur: "کیا آپ اردو یا آن لائن آرڈر والی ویب سائٹس بناتے ہیں؟" }, a: { en: "Yes. We can build in Urdu, English or both, and add booking, a shop or a customer login. For larger needs see our custom portals.", ur: "جی ہاں۔ ہم اردو، انگریزی یا دونوں میں بناتے ہیں اور بکنگ، آن لائن دکان یا کسٹمر لاگ اِن شامل کر سکتے ہیں۔ بڑی ضروریات کے لیے ہمارے کسٹم پورٹلز دیکھیں۔" } },
    ],
    formTitle: { en: "Get your business website", ur: "اپنی بزنس ویب سائٹ حاصل کریں" },
    formSub: { en: "Tell us about your business. We reply within one working day with next steps.", ur: "اپنے کاروبار کے بارے میں بتائیں۔ ہم ایک کاروباری دن میں اگلے مراحل کے ساتھ جواب دیں گے۔" },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
