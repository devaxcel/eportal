import type { Seo } from "./content";

/**
 * Search titles, descriptions and keywords for every solution in all five languages.
 * Titles stay near 60 characters and descriptions near 155 so Google shows them whole.
 * Schema is left empty on purpose: the generated one (software, breadcrumbs, FAQ) is used.
 * Product names stay in Latin letters in Spanish, Dutch and Arabic; Urdu uses its own spelling.
 */
export const seoBySlug: Record<string, Seo> = {
  schooldesk: {
    langs: {
      en: { title: "SchoolDesk: School Management Software for Pakistan | ePortal", description: "Run fees, attendance, results, timetables and parent communication from one school management system, with portals for admin, teachers, parents and students.", keywords: "school management software, school ERP Pakistan, fee management, attendance system, parent app, SchoolDesk" },
      ur: { title: "اسکول ڈیسک: پاکستان کے لیے اسکول مینجمنٹ سافٹ ویئر | ای پورٹل", description: "فیس، حاضری، نتائج، ٹائم ٹیبل اور والدین سے رابطہ ایک ہی اسکول مینجمنٹ سسٹم سے چلائیں، ایڈمن، اساتذہ، والدین اور طلبہ کے پورٹلز کے ساتھ۔", keywords: "اسکول مینجمنٹ سافٹ ویئر, اسکول سسٹم پاکستان, فیس مینجمنٹ, حاضری سسٹم, پیرنٹ ایپ, اسکول ڈیسک" },
      es: { title: "SchoolDesk: software de gestión escolar | ePortal", description: "Gestione cuotas, asistencia, resultados, horarios y comunicación con las familias desde un único sistema, con portales para administración, docentes, familias y alumnos.", keywords: "software de gestión escolar, sistema escolar, gestión de cuotas, control de asistencia, app para padres, SchoolDesk" },
      nl: { title: "SchoolDesk: schoolbeheersoftware | ePortal", description: "Beheer schoolgeld, aanwezigheid, resultaten, roosters en oudercommunicatie vanuit één systeem, met portalen voor beheer, docenten, ouders en leerlingen.", keywords: "schoolbeheersoftware, schooladministratie, schoolgeld beheren, aanwezigheidsregistratie, ouderapp, SchoolDesk" },
      ar: { title: "SchoolDesk: برنامج إدارة المدارس | ePortal", description: "أدِر الرسوم والحضور والنتائج والجداول والتواصل مع أولياء الأمور من نظام واحد، مع بوابات للإدارة والمعلمين وأولياء الأمور والطلاب.", keywords: "برنامج إدارة المدارس, نظام مدرسي, إدارة الرسوم, نظام الحضور, تطبيق أولياء الأمور, SchoolDesk" },
    },
  },
  trainerbook: {
    langs: {
      en: { title: "TrainerBook: Hire a Certified Personal Trainer | ePortal", description: "Book a vetted, certified personal trainer for private sessions where you are, and keep your programme, notes and progress in one client portal.", keywords: "hire personal trainer, certified trainer, home fitness training, fitness booking app, client portal, TrainerBook" },
      ur: { title: "ٹرینر بک: مستند پرسنل ٹرینر ہائر کریں | ای پورٹل", description: "جانچے ہوئے مستند پرسنل ٹرینر کے ساتھ اپنی جگہ پر نجی سیشن بک کریں، اور اپنا پروگرام، نوٹس اور پیشرفت ایک کلائنٹ پورٹل میں رکھیں۔", keywords: "پرسنل ٹرینر ہائر کریں, مستند ٹرینر, گھر پر فٹنس ٹریننگ, فٹنس بکنگ ایپ, ٹرینر بک" },
      es: { title: "TrainerBook: contrate un entrenador personal certificado | ePortal", description: "Reserve un entrenador personal certificado y verificado para sesiones privadas donde usted esté, y guarde programa, notas y progreso en un portal de cliente.", keywords: "contratar entrenador personal, entrenador certificado, entrenamiento en casa, app de reservas fitness, portal de cliente, TrainerBook" },
      nl: { title: "TrainerBook: boek een gecertificeerde personal trainer | ePortal", description: "Boek een gescreende, gecertificeerde personal trainer voor privésessies waar u bent en bewaar uw programma, notities en voortgang in één klantportaal.", keywords: "personal trainer boeken, gecertificeerde trainer, thuis trainen, fitness boekingsapp, klantportaal, TrainerBook" },
      ar: { title: "TrainerBook: استأجر مدربًا شخصيًا معتمدًا | ePortal", description: "احجز مدربًا شخصيًا معتمدًا وموثوقًا لجلسات خاصة في مكانك، واحتفظ ببرنامجك وملاحظاتك وتقدمك في بوابة عميل واحدة.", keywords: "مدرب شخصي, مدرب معتمد, تدريب لياقة في المنزل, تطبيق حجز لياقة, بوابة العميل, TrainerBook" },
    },
  },
  approveflow: {
    langs: {
      en: { title: "ApproveFlow: Workflow and Approval Management Software | ePortal", description: "Route documents and requests through clear approval steps, track every task and employee record, and see what is pending in one workflow dashboard.", keywords: "workflow software, approval workflow, document approval, employee management, task tracking, ApproveFlow" },
      ur: { title: "اپروو فلو: ورک فلو اور منظوری مینجمنٹ سافٹ ویئر | ای پورٹل", description: "دستاویزات اور درخواستیں واضح منظوری کے مراحل سے گزاریں، ہر ٹاسک اور ملازم کا ریکارڈ ٹریک کریں، اور زیر التوا کام ایک ڈیش بورڈ میں دیکھیں۔", keywords: "ورک فلو سافٹ ویئر, منظوری کا نظام, دستاویز کی منظوری, ملازمین کا انتظام, ٹاسک ٹریکنگ, اپروو فلو" },
      es: { title: "ApproveFlow: software de flujos de trabajo y aprobaciones | ePortal", description: "Dirija documentos y solicitudes por pasos de aprobación claros, siga cada tarea y registro de empleados, y vea lo pendiente en un único panel.", keywords: "software de flujos de trabajo, flujo de aprobación, aprobación de documentos, gestión de empleados, seguimiento de tareas, ApproveFlow" },
      nl: { title: "ApproveFlow: software voor workflows en goedkeuringen | ePortal", description: "Leid documenten en aanvragen langs duidelijke goedkeuringsstappen, volg elke taak en elk personeelsdossier en zie in één dashboard wat openstaat.", keywords: "workflowsoftware, goedkeuringsworkflow, documenten goedkeuren, personeelsbeheer, taken volgen, ApproveFlow" },
      ar: { title: "ApproveFlow: برنامج إدارة سير العمل والموافقات | ePortal", description: "مرّر المستندات والطلبات عبر خطوات موافقة واضحة، وتابع كل مهمة وسجل موظف، وشاهد المعلّق في لوحة سير عمل واحدة.", keywords: "برنامج سير العمل, سير عمل الموافقات, الموافقة على المستندات, إدارة الموظفين, متابعة المهام, ApproveFlow" },
    },
  },
  reportrelay: {
    langs: {
      en: { title: "ReportRelay: Automated Email Report Portal | ePortal", description: "Schedule business reports and send them by email on time, every time, and track delivery, opens and clicks from a single dashboard.", keywords: "automated email reports, scheduled reports, report delivery, email analytics, business reporting, ReportRelay" },
      ur: { title: "رپورٹ ریلے: خودکار ای میل رپورٹ پورٹل | ای پورٹل", description: "کاروباری رپورٹس شیڈول کریں اور وقت پر ای میل سے بھیجیں، اور ترسیل، کھولنے اور کلک کی شرح ایک ڈیش بورڈ سے دیکھیں۔", keywords: "خودکار ای میل رپورٹس, شیڈول رپورٹس, رپورٹ کی ترسیل, ای میل تجزیات, کاروباری رپورٹنگ, رپورٹ ریلے" },
      es: { title: "ReportRelay: portal de informes automáticos por correo | ePortal", description: "Programe informes de negocio y envíelos por correo puntualmente; siga entregas, aperturas y clics desde un único panel.", keywords: "informes automáticos por correo, informes programados, envío de informes, analítica de correo, informes de negocio, ReportRelay" },
      nl: { title: "ReportRelay: portaal voor automatische e-mailrapporten | ePortal", description: "Plan bedrijfsrapporten en verstuur ze op tijd per e-mail; volg bezorging, geopende mails en klikken in één dashboard.", keywords: "automatische e-mailrapporten, geplande rapporten, rapportbezorging, e-mailanalyse, bedrijfsrapportage, ReportRelay" },
      ar: { title: "ReportRelay: بوابة تقارير البريد الإلكتروني الآلية | ePortal", description: "جدول تقارير أعمالك وأرسلها بالبريد في موعدها، وتابع التسليم ونسب الفتح والنقر من لوحة واحدة.", keywords: "تقارير بريد إلكتروني آلية, تقارير مجدولة, تسليم التقارير, تحليلات البريد, تقارير الأعمال, ReportRelay" },
    },
  },
  medcodex: {
    langs: {
      en: { title: "MedCodeX: AI Medical Coding and Policy Search | ePortal", description: "Search ICD and procedure codes in plain language, get AI-assisted suggestions with context and draft compliant physician queries faster.", keywords: "medical coding software, AI medical coding, ICD-10 code search, physician query, coding policy research, MedCodeX" },
      ur: { title: "میڈ کوڈ ایکس: اے آئی میڈیکل کوڈنگ اور پالیسی سرچ | ای پورٹل", description: "عام زبان میں آئی سی ڈی اور پروسیجر کوڈ تلاش کریں، سیاق کے ساتھ اے آئی تجاویز پائیں اور فزیشن کوئری کے مستند مسودے تیزی سے بنائیں۔", keywords: "میڈیکل کوڈنگ سافٹ ویئر, اے آئی میڈیکل کوڈنگ, آئی سی ڈی 10 کوڈ سرچ, فزیشن کوئری, میڈ کوڈ ایکس" },
      es: { title: "MedCodeX: codificación médica con IA y búsqueda de políticas | ePortal", description: "Busque códigos CIE y de procedimientos con lenguaje natural, reciba sugerencias con IA y contexto, y redacte consultas al médico conformes más rápido.", keywords: "software de codificación médica, codificación médica con IA, búsqueda CIE-10, consulta al médico, políticas de codificación, MedCodeX" },
      nl: { title: "MedCodeX: medische codering met AI en beleidszoeker | ePortal", description: "Zoek ICD- en verrichtingscodes in gewone taal, krijg AI-suggesties met context en stel sneller conforme vragen aan de arts op.", keywords: "software voor medische codering, medische codering AI, ICD-10 zoeken, vraag aan arts, coderingsbeleid, MedCodeX" },
      ar: { title: "MedCodeX: الترميز الطبي بالذكاء الاصطناعي وبحث السياسات | ePortal", description: "ابحث عن رموز التشخيص والإجراءات بلغة بسيطة، واحصل على اقتراحات بالذكاء الاصطناعي مع السياق، وأعدّ استفسارات الأطباء المطابقة للمعايير بسرعة.", keywords: "برنامج الترميز الطبي, ترميز طبي بالذكاء الاصطناعي, بحث رموز ICD-10, استفسار الطبيب, سياسات الترميز, MedCodeX" },
    },
  },
  lessonbook: {
    langs: {
      en: { title: "LessonBook: Driving School Software and Instructor Booking | ePortal", description: "Learners book lessons and track progress, instructors schedule smarter, and driving schools manage fleet, billing and reports on one platform.", keywords: "driving school software, book driving lessons, driving instructor scheduling, fleet management, learner progress, LessonBook" },
      ur: { title: "لیسن بک: ڈرائیونگ اسکول سافٹ ویئر اور انسٹرکٹر بکنگ | ای پورٹل", description: "سیکھنے والے اسباق بک کرتے اور پیشرفت دیکھتے ہیں، انسٹرکٹرز بہتر شیڈول بناتے ہیں، اور ڈرائیونگ اسکول گاڑیاں، بلنگ اور رپورٹس ایک پلیٹ فارم پر سنبھالتے ہیں۔", keywords: "ڈرائیونگ اسکول سافٹ ویئر, ڈرائیونگ لیسن بکنگ, انسٹرکٹر شیڈولنگ, گاڑیوں کا انتظام, لیسن بک" },
      es: { title: "LessonBook: software para autoescuelas y reserva de instructores | ePortal", description: "Los alumnos reservan clases y siguen su progreso, los instructores organizan mejor su agenda y la autoescuela gestiona flota, facturación e informes en una plataforma.", keywords: "software para autoescuelas, reservar clases de conducir, agenda de instructores, gestión de flota, progreso del alumno, LessonBook" },
      nl: { title: "LessonBook: software voor rijscholen en instructeursboeking | ePortal", description: "Leerlingen boeken lessen en volgen hun voortgang, instructeurs plannen slimmer en rijscholen beheren wagenpark, facturatie en rapporten op één platform.", keywords: "rijschoolsoftware, rijlessen boeken, planning rij-instructeur, wagenparkbeheer, voortgang leerling, LessonBook" },
      ar: { title: "LessonBook: برنامج مدارس تعليم القيادة وحجز المدربين | ePortal", description: "يحجز المتعلمون الدروس ويتابعون تقدمهم، وينظم المدربون جداولهم بذكاء، وتدير المدرسة الأسطول والفواتير والتقارير على منصة واحدة.", keywords: "برنامج مدرسة تعليم القيادة, حجز دروس القيادة, جدولة المدربين, إدارة الأسطول, تقدم المتعلم, LessonBook" },
    },
  },
  leadchat: {
    langs: {
      en: { title: "LeadChat: AI Sales Chatbot That Captures and Scores Leads | ePortal", description: "An AI chatbot agent talks to website visitors, captures and scores leads, follows up automatically and shows your pipeline in one sales dashboard.", keywords: "AI sales chatbot, lead capture, lead scoring, website chatbot, sales pipeline dashboard, LeadChat" },
      ur: { title: "لیڈ چیٹ: لیڈز حاصل اور اسکور کرنے والا اے آئی سیلز چیٹ بوٹ | ای پورٹل", description: "اے آئی چیٹ بوٹ ایجنٹ ویب سائٹ وزیٹرز سے بات کرتا ہے، لیڈز حاصل اور اسکور کرتا ہے، خودکار فالو اپ کرتا ہے اور پائپ لائن ایک سیلز ڈیش بورڈ میں دکھاتا ہے۔", keywords: "اے آئی سیلز چیٹ بوٹ, لیڈ کیپچر, لیڈ اسکورنگ, ویب سائٹ چیٹ بوٹ, سیلز پائپ لائن, لیڈ چیٹ" },
      es: { title: "LeadChat: chatbot de ventas con IA que capta y puntúa leads | ePortal", description: "Un agente de chat con IA atiende a los visitantes de su web, capta y puntúa leads, hace seguimiento automático y muestra su embudo en un panel de ventas.", keywords: "chatbot de ventas con IA, captación de leads, puntuación de leads, chatbot web, embudo de ventas, LeadChat" },
      nl: { title: "LeadChat: AI-salesbot die leads vangt en scoort | ePortal", description: "Een AI-chatbot spreekt websitebezoekers aan, vangt en scoort leads, volgt automatisch op en toont uw pijplijn in één verkoopdashboard.", keywords: "AI-salesbot, leads vangen, leadscoring, website chatbot, verkooppijplijn, LeadChat" },
      ar: { title: "LeadChat: روبوت مبيعات بالذكاء الاصطناعي يجمع العملاء المحتملين ويقيّمهم | ePortal", description: "وكيل دردشة بالذكاء الاصطناعي يحاور زوار موقعك، ويجمع العملاء المحتملين ويقيّمهم، ويتابعهم تلقائيًا، ويعرض مسار المبيعات في لوحة واحدة.", keywords: "روبوت مبيعات بالذكاء الاصطناعي, جمع العملاء المحتملين, تقييم العملاء المحتملين, روبوت دردشة للموقع, مسار المبيعات, LeadChat" },
    },
  },
  saledesk: {
    langs: {
      en: { title: "SaleDesk: Point of Sale and Inventory Software for Retail | ePortal", description: "Sell faster at the counter, track stock in real time and see live sales analytics, orders and customers in one point-of-sale system for retail shops.", keywords: "point of sale software, retail POS, inventory management, sales analytics, POS Pakistan, SaleDesk" },
      ur: { title: "سیل ڈیسک: ریٹیل کے لیے پوائنٹ آف سیل اور انوینٹری سافٹ ویئر | ای پورٹل", description: "کاؤنٹر پر تیزی سے فروخت کریں، اسٹاک فوری ٹریک کریں اور سیلز تجزیات، آرڈرز اور گاہک ایک پوائنٹ آف سیل سسٹم میں دیکھیں۔", keywords: "پوائنٹ آف سیل سافٹ ویئر, ریٹیل پی او ایس, انوینٹری مینجمنٹ, سیلز تجزیات, پاکستان پی او ایس, سیل ڈیسک" },
      es: { title: "SaleDesk: punto de venta e inventario para comercios | ePortal", description: "Venda más rápido en caja, controle el stock en tiempo real y vea ventas, pedidos y clientes en directo en un único sistema de punto de venta.", keywords: "software de punto de venta, TPV para comercios, gestión de inventario, analítica de ventas, SaleDesk" },
      nl: { title: "SaleDesk: kassa- en voorraadsoftware voor winkels | ePortal", description: "Verkoop sneller aan de kassa, volg uw voorraad realtime en zie verkopen, bestellingen en klanten live in één kassasysteem voor winkels.", keywords: "kassasoftware, kassasysteem winkel, voorraadbeheer, verkoopanalyse, SaleDesk" },
      ar: { title: "SaleDesk: نظام نقاط البيع والمخزون لمتاجر التجزئة | ePortal", description: "بِع أسرع عند الصندوق، وتابع المخزون لحظيًا، وشاهد المبيعات والطلبات والعملاء مباشرة في نظام نقاط بيع واحد لمتاجر التجزئة.", keywords: "نظام نقاط البيع, نقاط بيع للتجزئة, إدارة المخزون, تحليلات المبيعات, SaleDesk" },
    },
  },
  smartinvoice: {
    langs: {
      en: { title: "Smart Invoice: Online Invoicing in Multiple Currencies | ePortal", description: "Create professional invoices with automatic numbering, bill clients in PKR, USD, EUR, GBP, AED and more, and track revenue and pending payments on one dashboard.", keywords: "invoice software, online invoicing, multi-currency invoice, invoice generator Pakistan, billing dashboard, Smart Invoice" },
      ur: { title: "سمارٹ انوائس: متعدد کرنسیوں میں آن لائن انوائسنگ | ای پورٹل", description: "خودکار نمبرنگ کے ساتھ پیشہ ورانہ انوائس بنائیں، گاہکوں کو روپے، ڈالر، یورو، پاؤنڈ اور درہم میں بل بھیجیں، اور آمدنی اور زیر التوا ادائیگیاں ایک ڈیش بورڈ میں دیکھیں۔", keywords: "انوائس سافٹ ویئر, آن لائن انوائسنگ, کثیر کرنسی انوائس, پاکستان انوائس جنریٹر, بلنگ ڈیش بورڈ, سمارٹ انوائس" },
      es: { title: "Smart Invoice: facturación online en varias monedas | ePortal", description: "Cree facturas profesionales con numeración automática, facture a clientes en PKR, USD, EUR, GBP, AED y más, y siga ingresos y cobros pendientes en un panel.", keywords: "software de facturación, facturación online, factura multidivisa, generador de facturas, panel de facturación, Smart Invoice" },
      nl: { title: "Smart Invoice: online factureren in meerdere valuta | ePortal", description: "Maak professionele facturen met automatische nummering, factureer klanten in PKR, USD, EUR, GBP, AED en meer en volg omzet en openstaande betalingen in één dashboard.", keywords: "factuursoftware, online factureren, facturen in meerdere valuta, factuurgenerator, factureringsdashboard, Smart Invoice" },
      ar: { title: "Smart Invoice: فوترة إلكترونية بعملات متعددة | ePortal", description: "أنشئ فواتير احترافية بترقيم تلقائي، وحاسب عملاءك بالروبية والدولار واليورو والجنيه والدرهم وغيرها، وتابع الإيرادات والمدفوعات المعلّقة في لوحة واحدة.", keywords: "برنامج فواتير, فوترة إلكترونية, فواتير متعددة العملات, منشئ فواتير, لوحة الفوترة, Smart Invoice" },
    },
  },
};
