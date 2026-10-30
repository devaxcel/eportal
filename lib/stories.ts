import type { L } from "./i18n";

export type Story = {
  statement: L;
  before: L[];
  after: L[];
  faqs: { q: L; a: L }[];
};

/** Content for the shared solution page template. eSchool has its own long page. */
export const stories: Record<string, Story> = {
  formed: {
    statement: {
      en: "Getting fit should not mean fighting your schedule. Formed brings a certified trainer to you, and keeps everything about your progress in one place.",
      ur: "فٹ ہونے کا مطلب اپنے شیڈول سے لڑنا نہیں ہونا چاہیے۔ فارمڈ ایک مستند ٹرینر کو آپ کے پاس لاتا ہے اور آپ کی پیشرفت کی ہر چیز ایک جگہ رکھتا ہے۔",
    },
    before: [
      { en: "Long commutes to a crowded gym", ur: "بھیڑ والے جم تک لمبا سفر" },
      { en: "Guessing which trainer is right for you", ur: "اندازے سے ٹرینر چننا" },
      { en: "Plans and progress scattered across notes and chats", ur: "پلان اور پیشرفت نوٹس اور چیٹس میں بکھری ہوئی" },
    ],
    after: [
      { en: "Private sessions where you already are", ur: "نجی سیشنز وہیں جہاں آپ پہلے سے ہیں" },
      { en: "Matched with a vetted, certified trainer", ur: "جانچے ہوئے مستند ٹرینر سے میچنگ" },
      { en: "Programme, notes and progress in one client portal", ur: "پروگرام، نوٹس اور پیشرفت ایک کلائنٹ پورٹل میں" },
    ],
    faqs: [
      {
        q: { en: "How are trainers matched to me?", ur: "ٹرینرز میرے لیے کیسے چنے جاتے ہیں؟" },
        a: { en: "Tell us your goals and schedule and we match you with a certified, background-checked trainer.", ur: "اپنے مقاصد اور شیڈول بتائیں اور ہم آپ کو مستند اور جانچ شدہ ٹرینر سے ملا دیتے ہیں۔" },
      },
      {
        q: { en: "Can I pause or cancel?", ur: "کیا میں توقف یا منسوخ کر سکتا ہوں؟" },
        a: { en: "Yes. Memberships are month to month, and you can pause or cancel from the client portal.", ur: "جی ہاں۔ رکنیت ماہ بہ ماہ ہے، اور آپ کلائنٹ پورٹل سے توقف یا منسوخی کر سکتے ہیں۔" },
      },
    ],
  },

  "workflow-portal": {
    statement: {
      en: "Work moves at the speed of the slowest approval. Workflow Portal gives every document a clear path and every person a clear role.",
      ur: "کام سب سے سست منظوری کی رفتار سے چلتا ہے۔ ورک فلو پورٹل ہر دستاویز کو واضح راستہ اور ہر فرد کو واضح کردار دیتا ہے۔",
    },
    before: [
      { en: "Documents lost in email threads", ur: "دستاویزات ای میل کی لڑیوں میں گم" },
      { en: "Approvals waiting in someone's inbox", ur: "منظوریاں کسی کے ان باکس میں رکی ہوئی" },
      { en: "No clear record of who approved what", ur: "کس نے کیا منظور کیا، اس کا واضح ریکارڈ نہیں" },
    ],
    after: [
      { en: "Every document stored in one place", ur: "ہر دستاویز ایک ہی جگہ محفوظ" },
      { en: "Approvals routed automatically to the right person", ur: "منظوریاں خودکار طور پر درست فرد تک" },
      { en: "A full trail of every decision", ur: "ہر فیصلے کا مکمل ریکارڈ" },
    ],
    faqs: [
      {
        q: { en: "Can we set different permissions for each team?", ur: "کیا ہم ہر ٹیم کے لیے الگ اجازتیں رکھ سکتے ہیں؟" },
        a: { en: "Yes. Users, roles and permissions are managed centrally, so people only see what they should.", ur: "جی ہاں۔ صارفین، کردار اور اجازتیں مرکزی طور پر منظم ہوتی ہیں، اس لیے لوگ صرف وہی دیکھتے ہیں جو انہیں دیکھنا چاہیے۔" },
      },
      {
        q: { en: "Do people get notified when something needs them?", ur: "کیا کام آنے پر لوگوں کو اطلاع ملتی ہے؟" },
        a: { en: "Yes. Real-time notifications tell people when an approval or task needs their attention.", ur: "جی ہاں۔ فوری اطلاعات بتاتی ہیں کہ کب کسی منظوری یا ٹاسک کو ان کی توجہ چاہیے۔" },
      },
    ],
  },

  "email-report-portal": {
    statement: {
      en: "A report only matters when it reaches the right person. Email Report Portal prepares, protects and delivers it for you.",
      ur: "رپورٹ تبھی اہم ہوتی ہے جب وہ درست شخص تک پہنچے۔ ای میل رپورٹ پورٹل اسے تیار، محفوظ اور ترسیل کرتا ہے۔",
    },
    before: [
      { en: "Reports built and emailed by hand every month", ur: "ہر ماہ رپورٹس ہاتھ سے بنانا اور ای میل کرنا" },
      { en: "Sensitive files sent without protection", ur: "حساس فائلیں بغیر تحفظ کے بھیجنا" },
      { en: "No way to know who opened what", ur: "یہ جاننے کا کوئی طریقہ نہیں کہ کس نے کیا کھولا" },
    ],
    after: [
      { en: "Reports generated in bulk, ready to send", ur: "رپورٹس بڑی تعداد میں تیار اور بھیجنے کے لیے حاضر" },
      { en: "Password-protected PDFs delivered by email", ur: "پاس ورڈ سے محفوظ پی ڈی ایف ای میل سے ترسیل" },
      { en: "Delivery and click analytics with an audit trail", ur: "آڈٹ ٹریل کے ساتھ ترسیل اور کلکس کے تجزیات" },
    ],
    faqs: [
      {
        q: { en: "Are the reports protected?", ur: "کیا رپورٹس محفوظ ہوتی ہیں؟" },
        a: { en: "Yes. Reports can be generated as password-protected PDFs, with role-based access and an audit trail.", ur: "جی ہاں۔ رپورٹس پاس ورڈ سے محفوظ پی ڈی ایف کے طور پر بنائی جا سکتی ہیں، کردار پر مبنی رسائی اور آڈٹ ٹریل کے ساتھ۔" },
      },
      {
        q: { en: "Can we send reports to many clients at once?", ur: "کیا ہم بہت سے کلائنٹس کو ایک ساتھ رپورٹس بھیج سکتے ہیں؟" },
        a: { en: "Yes. Reports are generated in bulk and delivered to each client by email.", ur: "جی ہاں۔ رپورٹس بڑی تعداد میں بنتی ہیں اور ہر کلائنٹ کو ای میل سے پہنچائی جاتی ہیں۔" },
      },
    ],
  },

  "medical-coding-ai": {
    statement: {
      en: "Behind every code is a patient's record and a clinician's time. Medical Coding AI helps teams find the right answer faster.",
      ur: "ہر کوڈ کے پیچھے مریض کا ریکارڈ اور معالج کا وقت ہے۔ میڈیکل کوڈنگ اے آئی ٹیموں کو درست جواب جلد تلاش کرنے میں مدد دیتا ہے۔",
    },
    before: [
      { en: "Searching long policy documents for answers", ur: "جوابات کے لیے طویل پالیسی دستاویزات میں تلاش" },
      { en: "Drafting physician queries from scratch", ur: "فزیشن کوئریز شروع سے لکھنا" },
      { en: "Coding decisions that take hours", ur: "کوڈنگ کے فیصلے جن میں گھنٹے لگتے ہیں" },
    ],
    after: [
      { en: "Policy research in plain language", ur: "سادہ زبان میں پالیسی ریسرچ" },
      { en: "Compliant physician query drafts in seconds", ur: "مستند فزیشن کوئری کے مسودے سیکنڈوں میں" },
      { en: "AI suggestions your coders review and approve", ur: "اے آئی کی تجاویز جنہیں آپ کے کوڈرز جانچ کر منظور کرتے ہیں" },
    ],
    faqs: [
      {
        q: { en: "Does the AI replace our coders?", ur: "کیا اے آئی ہمارے کوڈرز کی جگہ لے لیتا ہے؟" },
        a: { en: "No. It assists your coding and documentation teams, who review and make the final decision.", ur: "نہیں۔ یہ آپ کی کوڈنگ اور ڈاکومنٹیشن ٹیموں کی مدد کرتا ہے، جو جائزہ لے کر آخری فیصلہ کرتی ہیں۔" },
      },
      {
        q: { en: "How do users sign in?", ur: "صارفین سائن ان کیسے کرتے ہیں؟" },
        a: { en: "Accounts are created and managed by administrators, so access stays controlled.", ur: "اکاؤنٹس ایڈمنسٹریٹرز بناتے اور سنبھالتے ہیں، اس لیے رسائی کنٹرول میں رہتی ہے۔" },
      },
    ],
  },

  hayroutes: {
    statement: {
      en: "Learning to drive is a big step. HayRoutes helps learners find the right instructor, and helps schools run every lesson smoothly.",
      ur: "ڈرائیونگ سیکھنا ایک بڑا قدم ہے۔ ہے روٹس سیکھنے والوں کو درست انسٹرکٹر ڈھونڈنے اور اسکولوں کو ہر سبق آسانی سے چلانے میں مدد دیتا ہے۔",
    },
    before: [
      { en: "Calling around to find an instructor", ur: "انسٹرکٹر کی تلاش میں جگہ جگہ فون" },
      { en: "Paper schedules and double bookings", ur: "کاغذی شیڈول اور دہری بکنگ" },
      { en: "Vehicle and licence records kept in different places", ur: "گاڑیوں اور لائسنس کا ریکارڈ الگ الگ جگہوں پر" },
    ],
    after: [
      { en: "Learners book lessons and track milestones", ur: "سیکھنے والے اسباق بک کرتے اور سنگ میل ٹریک کرتے ہیں" },
      { en: "Smart scheduling for instructors", ur: "انسٹرکٹرز کے لیے سمارٹ شیڈولنگ" },
      { en: "Fleet, licence and billing managed in one platform", ur: "گاڑیاں، لائسنس اور بلنگ ایک پلیٹ فارم میں" },
    ],
    faqs: [
      {
        q: { en: "Who can use HayRoutes?", ur: "ہے روٹس کون استعمال کر سکتا ہے؟" },
        a: { en: "Learners, instructors, driving schools and fleet managers each get the tools they need.", ur: "سیکھنے والوں، انسٹرکٹرز، ڈرائیونگ اسکولوں اور فلیٹ مینیجرز میں سے ہر ایک کو اپنی ضرورت کے ٹولز ملتے ہیں۔" },
      },
      {
        q: { en: "Can driving schools manage their vehicles?", ur: "کیا ڈرائیونگ اسکول اپنی گاڑیاں سنبھال سکتے ہیں؟" },
        a: { en: "Yes. You can track maintenance, licences and insurance for every vehicle.", ur: "جی ہاں۔ آپ ہر گاڑی کی مینٹیننس، لائسنس اور انشورنس ٹریک کر سکتے ہیں۔" },
      },
    ],
  },

  "ai-sales-agent": {
    statement: {
      en: "Every visitor to your website is a possible customer. AI Sales Agent answers them straight away and makes sure good leads are never lost.",
      ur: "آپ کی ویب سائٹ کا ہر وزیٹر ممکنہ گاہک ہے۔ اے آئی سیلز ایجنٹ انہیں فوراً جواب دیتا ہے اور اچھی لیڈز ضائع نہیں ہونے دیتا۔",
    },
    before: [
      { en: "Visitors leave without ever getting a reply", ur: "وزیٹرز جواب ملے بغیر چلے جاتے ہیں" },
      { en: "Leads sorted by hand and followed up late", ur: "لیڈز ہاتھ سے چھانٹی جاتی ہیں اور فالو اپ دیر سے" },
      { en: "No clear view of the sales pipeline", ur: "سیلز پائپ لائن کا واضح منظر نہیں" },
    ],
    after: [
      { en: "A chatbot greets and helps visitors instantly", ur: "چیٹ بوٹ وزیٹرز کو فوراً خوش آمدید کہتا اور مدد دیتا ہے" },
      { en: "Leads captured and scored automatically", ur: "لیڈز خودکار طور پر حاصل اور اسکور ہوتی ہیں" },
      { en: "Follow-ups sent for you, pipeline in one dashboard", ur: "فالو اپ آپ کے لیے بھیجے جاتے ہیں، پائپ لائن ایک ڈیش بورڈ میں" },
    ],
    faqs: [
      {
        q: { en: "What does the chatbot do?", ur: "چیٹ بوٹ کیا کرتا ہے؟" },
        a: { en: "It talks to your website visitors, answers their questions, captures their details and scores the lead.", ur: "یہ آپ کی ویب سائٹ کے وزیٹرز سے بات کرتا ہے، ان کے سوالات کے جواب دیتا ہے، ان کی تفصیلات حاصل کرتا ہے اور لیڈ کو اسکور کرتا ہے۔" },
      },
      {
        q: { en: "Can it follow up with leads?", ur: "کیا یہ لیڈز کا فالو اپ کر سکتا ہے؟" },
        a: { en: "Yes. Automated follow-ups keep the conversation moving until the lead is ready to convert.", ur: "جی ہاں۔ خودکار فالو اپ گفتگو کو آگے بڑھاتے رہتے ہیں یہاں تک کہ لیڈ کنورٹ ہونے کے لیے تیار ہو جائے۔" },
      },
    ],
  },

  pos: {
    statement: {
      en: "A shop runs on small moments: a sale, a stock count, a regular customer. AXCEL POS keeps them all connected.",
      ur: "دکان چھوٹے لمحوں پر چلتی ہے: ایک فروخت، اسٹاک کی گنتی، ایک مستقل گاہک۔ ایکسل پی او ایس ان سب کو جوڑے رکھتا ہے۔",
    },
    before: [
      { en: "Stock counted by hand and often wrong", ur: "اسٹاک ہاتھ سے گنا جاتا ہے اور اکثر غلط ہوتا ہے" },
      { en: "Sales totals known only at closing time", ur: "فروخت کا مجموعہ صرف بند کرتے وقت معلوم ہوتا ہے" },
      { en: "Regular customers treated like strangers", ur: "مستقل گاہکوں سے اجنبیوں جیسا سلوک" },
    ],
    after: [
      { en: "Inventory updated in real time with every sale", ur: "ہر فروخت کے ساتھ انوینٹری فوری اپ ڈیٹ" },
      { en: "Live sales analytics through the day", ur: "پورے دن لائیو سیلز تجزیات" },
      { en: "Customer records and orders in one system", ur: "کسٹمر ریکارڈ اور آرڈرز ایک سسٹم میں" },
    ],
    faqs: [
      {
        q: { en: "Can I see sales as they happen?", ur: "کیا میں فروخت ہوتے ہی دیکھ سکتا ہوں؟" },
        a: { en: "Yes. Real-time analytics show today's sales, orders and top products.", ur: "جی ہاں۔ فوری تجزیات آج کی فروخت، آرڈرز اور مقبول مصنوعات دکھاتے ہیں۔" },
      },
      {
        q: { en: "Does it manage inventory?", ur: "کیا یہ انوینٹری سنبھالتا ہے؟" },
        a: { en: "Yes. Inventory updates in real time and low-stock items are flagged.", ur: "جی ہاں۔ انوینٹری فوری اپ ڈیٹ ہوتی ہے اور کم اسٹاک والی اشیاء کی نشاندہی ہوتی ہے۔" },
      },
    ],
  },
};
