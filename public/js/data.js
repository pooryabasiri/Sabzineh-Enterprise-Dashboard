/* سبزینه — Default Data & Constants */

const STORAGE_KEY = "sabzineh_state_v2";

const categoryMeta = {
  grocery:  { label: "مواد غذایی",       color: "#7b8f3b", soft: "rgba(123,143,59,0.14)",  mark: "غذ", gradient: "from-emerald-500 to-lime-600"   },
  beverage: { label: "نوشیدنی",          color: "#d28b45", soft: "rgba(210,139,69,0.14)",  mark: "نو",  gradient: "from-amber-500 to-orange-500"   },
  care:     { label: "سلامت و مراقبت",   color: "#5f7f68", soft: "rgba(95,127,104,0.14)", mark: "مر",  gradient: "from-teal-500 to-emerald-500"   },
  home:     { label: "خانه و آشپزخانه", color: "#9a7757", soft: "rgba(154,119,87,0.14)",  mark: "خا",  gradient: "from-stone-500 to-amber-700"    },
};

const pagesMeta = [
  { id: "dashboard",  label: "داشبورد",           group: "main" },
  { id: "analytics",  label: "تحلیل‌ها و رشد",    group: "main" },
  { id: "orders",     label: "سفارشات",            group: "main" },
  { id: "products",   label: "محصولات و انبار",    group: "main" },
  { id: "customers",  label: "مشتریان و وفاداری",  group: "main" },
  { id: "messages",   label: "پیام‌ها و پشتیبانی", group: "ops"  },
  { id: "reports",    label: "گزارشات و خروجی",    group: "ops"  },
  { id: "calendar",   label: "تقویم عملیاتی",      group: "ops"  },
  { id: "settings",   label: "تنظیمات سیستم",      group: "ops"  },
];

const monthlyRevenue = [82, 88, 95, 104, 112, 126, 131, 139, 147, 156, 164, 178];
const monthlyTarget  = [78, 84, 90, 98, 108, 118, 126, 134, 140, 150, 160, 170];
const visitorTrend   = [4200, 5100, 4980, 5620, 6180, 5900, 6740];
const trafficSources = [
  { label: "جستجوی ارگانیک (Google)",       value: 38, color: "#7b8f3b" },
  { label: "شبکه‌های اجتماعی",              value: 24, color: "#d28b45" },
  { label: "کمپین ایمیل مارکتینگ",          value: 17, color: "#5f7f68" },
  { label: "همکاری در فروش (Affiliate)",    value: 12, color: "#9a7757" },
  { label: "ورود مستقیم کاربر",             value: 9,  color: "#c2ad8a" },
];

const defaultProducts = [
  { id: "P-101", title: "روغن زیتون فرابکر ارگانیک طلایی",          category: "grocery",  price: 689000,  stock: 82,  rating: 4.9, sales: 420, badge: "پرفروش‌ترین",      mark: "زیت", gradient: "from-emerald-500 to-lime-600"   },
  { id: "P-102", title: "چای سبز کوهستان با عصاره یاس",             category: "beverage", price: 249000,  stock: 128, rating: 4.8, sales: 318, badge: "محبوب مشتریان",   mark: "چای", gradient: "from-teal-500 to-emerald-500"   },
  { id: "P-103", title: "سرم مراقبت پوست گیاهی حاوی هیالورونیک",   category: "care",     price: 829000,  stock: 44,  rating: 4.7, sales: 276, badge: "حاشیه سود بالا",  mark: "سرم", gradient: "from-sky-500 to-cyan-500"       },
  { id: "P-104", title: "ظرف سرو سرامیکی دست‌ساز مینیمال",         category: "home",     price: 559000,  stock: 36,  rating: 4.6, sales: 188, badge: "جدید",            mark: "ظرف", gradient: "from-amber-500 to-orange-500"   },
  { id: "P-105", title: "عسل طبیعی آویشن کوهستان البرز",            category: "grocery",  price: 379000,  stock: 95,  rating: 4.9, sales: 342, badge: "رضایت ۹۹٪",      mark: "عسل", gradient: "from-yellow-500 to-amber-600"  },
  { id: "P-106", title: "دمنوش آرامش شبانه بابونه و سنبل‌الطیب",   category: "beverage", price: 189000,  stock: 140, rating: 4.5, sales: 214, badge: "پیشنهاد ویژه",   mark: "دمن", gradient: "from-indigo-500 to-violet-600"  },
  { id: "P-107", title: "کرم مرطوب‌کننده دست و صورت عصاره زیتون",  category: "care",     price: 319000,  stock: 72,  rating: 4.6, sales: 231, badge: "موجودی پایدار",  mark: "کرم", gradient: "from-rose-500 to-pink-500"      },
  { id: "P-108", title: "ست ادویه‌جات شیشه‌ای با درپوش چوبی",      category: "home",     price: 469000,  stock: 51,  rating: 4.4, sales: 165, badge: "تکرار خرید",     mark: "ادو", gradient: "from-stone-500 to-amber-700"   },
  { id: "P-109", title: "قهوه‌ساز دستی سفری استیل ضد زنگ",         category: "home",     price: 1190000, stock: 18,  rating: 4.8, sales: 142, badge: "موجودی کم",      mark: "قهو", gradient: "from-zinc-600 to-stone-500"    },
  { id: "P-110", title: "آبمیوه سردفشار زردآلو و هلو ارگانیک",      category: "beverage", price: 149000,  stock: 174, rating: 4.3, sales: 257, badge: "فصلی",           mark: "آبم", gradient: "from-orange-500 to-yellow-500" },
  { id: "P-111", title: "گرانولا پروتئینی جو دوسر و مغزها",         category: "grocery",  price: 299000,  stock: 87,  rating: 4.7, sales: 205, badge: "ترند هفته",      mark: "گرا", gradient: "from-lime-500 to-green-600"    },
  { id: "P-112", title: "اسپری پاک‌کننده سطوح با عصاره مرکبات",    category: "care",     price: 219000,  stock: 110, rating: 4.5, sales: 169, badge: "اقتصادی",        mark: "اسپ", gradient: "from-cyan-500 to-blue-600"     },
];

const defaultCustomers = [
  { id: "C-201", name: "مریم حسینی",   email: "maryam.h@sabzineh.ir",  phone: "0912 110 2481", city: "تهران",  segment: "وفادار",       status: "فعال",      totalSpent: 24800000, orders: 19, initials: "مح", gradient: "from-emerald-500 to-lime-600",  lastSeen: "۱۲ دقیقه پیش" },
  { id: "C-202", name: "علی نیک‌زاد", email: "ali.nikzad@sabzineh.ir", phone: "0935 441 9903", city: "اصفهان", segment: "ارزشمند",       status: "فعال",      totalSpent: 18600000, orders: 14, initials: "عن", gradient: "from-orange-500 to-amber-500",  lastSeen: "۴۵ دقیقه پیش" },
  { id: "C-203", name: "نگار شریفی",   email: "negar.sh@sabzineh.ir",  phone: "0917 501 3032", city: "شیراز",  segment: "در حال رشد",   status: "فعال",      totalSpent: 12900000, orders: 10, initials: "نش", gradient: "from-sky-500 to-cyan-500",     lastSeen: "۱ ساعت پیش"   },
  { id: "C-204", name: "پارسا احمدی",  email: "parsa.a@sabzineh.ir",   phone: "0930 280 7721", city: "مشهد",   segment: "جدید",         status: "فعال",      totalSpent: 6900000,  orders: 6,  initials: "پا", gradient: "from-violet-500 to-fuchsia-500", lastSeen: "۲ ساعت پیش"   },
  { id: "C-205", name: "یلدا بهرامی",  email: "yalda.b@sabzineh.ir",   phone: "0910 928 7710", city: "تبریز",  segment: "وفادار",       status: "فعال",      totalSpent: 21200000, orders: 17, initials: "یب", gradient: "from-rose-500 to-pink-500",    lastSeen: "امروز"         },
  { id: "C-206", name: "کیان رحمانی",  email: "kian.r@sabzineh.ir",    phone: "0921 707 1671", city: "رشت",    segment: "نیازمند توجه", status: "کم‌تعامل", totalSpent: 4800000,  orders: 4,  initials: "کر", gradient: "from-zinc-600 to-stone-500",   lastSeen: "دیروز"         },
  { id: "C-207", name: "ریحانه سلیمی", email: "reyhaneh@sabzineh.ir",  phone: "0911 219 6543", city: "ساری",   segment: "در حال رشد",   status: "فعال",      totalSpent: 9600000,  orders: 8,  initials: "رس", gradient: "from-teal-500 to-emerald-500", lastSeen: "۳ ساعت پیش"   },
  { id: "C-208", name: "محمد صدری",    email: "m.sadri@sabzineh.ir",   phone: "0913 550 4417", city: "کرمان",  segment: "ارزشمند",       status: "فعال",      totalSpent: 17100000, orders: 12, initials: "مص", gradient: "from-yellow-500 to-orange-500", lastSeen: "۵۰ دقیقه پیش" },
];

const defaultOrders = [
  { id: "ORD-7801", customerId: "C-201", productId: "P-101", status: "تحویل شده",       amount: 1378000, city: "تهران",  channel: "وب‌سایت",     createdAt: "2026-07-03T10:15:00" },
  { id: "ORD-7802", customerId: "C-202", productId: "P-103", status: "در حال پردازش",  amount: 1658000, city: "اصفهان", channel: "اینستاگرام",  createdAt: "2026-07-03T12:40:00" },
  { id: "ORD-7803", customerId: "C-203", productId: "P-105", status: "آماده ارسال",    amount: 758000,  city: "شیراز",  channel: "وب‌سایت",     createdAt: "2026-07-02T17:20:00" },
  { id: "ORD-7804", customerId: "C-204", productId: "P-109", status: "نیازمند پیگیری", amount: 1190000, city: "مشهد",   channel: "واتساپ",      createdAt: "2026-07-02T09:05:00" },
  { id: "ORD-7805", customerId: "C-205", productId: "P-102", status: "تحویل شده",       amount: 498000,  city: "تبریز",  channel: "وب‌سایت",     createdAt: "2026-07-01T15:10:00" },
  { id: "ORD-7806", customerId: "C-206", productId: "P-112", status: "در حال پردازش",  amount: 438000,  city: "رشت",    channel: "مارکت‌پلیس", createdAt: "2026-07-01T11:35:00" },
  { id: "ORD-7807", customerId: "C-207", productId: "P-106", status: "تحویل شده",       amount: 567000,  city: "ساری",   channel: "وب‌سایت",     createdAt: "2026-06-30T13:14:00" },
  { id: "ORD-7808", customerId: "C-208", productId: "P-108", status: "آماده ارسال",    amount: 938000,  city: "کرمان",  channel: "وب‌سایت",     createdAt: "2026-06-30T18:43:00" },
  { id: "ORD-7809", customerId: "C-201", productId: "P-111", status: "تحویل شده",       amount: 598000,  city: "تهران",  channel: "اپلیکیشن",   createdAt: "2026-06-29T09:51:00" },
  { id: "ORD-7810", customerId: "C-205", productId: "P-104", status: "در حال پردازش",  amount: 1118000, city: "تبریز",  channel: "وب‌سایت",     createdAt: "2026-06-28T16:32:00" },
  { id: "ORD-7811", customerId: "C-202", productId: "P-107", status: "تحویل شده",       amount: 638000,  city: "اصفهان", channel: "اپلیکیشن",   createdAt: "2026-06-28T08:20:00" },
  { id: "ORD-7812", customerId: "C-203", productId: "P-110", status: "آماده ارسال",    amount: 447000,  city: "شیراز",  channel: "اینستاگرام",  createdAt: "2026-06-27T12:02:00" },
  { id: "ORD-7813", customerId: "C-208", productId: "P-101", status: "تحویل شده",       amount: 2067000, city: "کرمان",  channel: "وب‌سایت",     createdAt: "2026-06-27T14:15:00" },
  { id: "ORD-7814", customerId: "C-207", productId: "P-105", status: "نیازمند پیگیری", amount: 379000,  city: "ساری",   channel: "واتساپ",      createdAt: "2026-06-26T20:10:00" },
];

const defaultMessages = [
  { id: "MSG-301", customerId: "C-201", subject: "درخواست فعال‌سازی کد تخفیف خرید وفاداری",       body: "سلام و درود. من از اعضای باشگاه مشتریان سبزینه هستم. آیا این هفته کد تخفیف خرید دوم یا سبد‌های بالای ۱ میلیون تومان فعال می‌شود؟ ممنون می‌شم راهنمایی کنید.", unread: true,  priority: "مهم",  receivedAt: "2026-07-03T09:20:00" },
  { id: "MSG-302", customerId: "C-202", subject: "پیگیری زمان ارسال سفارش ORD-7802",              body: "وقت بخیر. می‌خواستم وضعیت دقیق سفارش جدیدم را بدانم. آیا امروز از انبار مرکزی اصفهان خارج می‌شود یا فردا تحویل پیک می‌گردد؟",                                      unread: true,  priority: "فوری", receivedAt: "2026-07-03T11:05:00" },
  { id: "MSG-303", customerId: "C-204", subject: "پیشنهاد افزودن بسته‌بندی هدیه و کارت تبریک",   body: "اگر برای محصولات منتخب نظیر ظروف سرامیکی و ست ادویه‌جات بسته‌بندی هدیه با کارت تبریک اختصاصی داشته باشید، احتمال خرید من برای مناسبت‌ها بسیار بیشتر می‌شود.", unread: false, priority: "عادی", receivedAt: "2026-07-02T16:25:00" },
  { id: "MSG-304", customerId: "C-205", subject: "استعلام موجودی دوباره سرم مراقبت پوست گیاهی",  body: "سرم مراقبت پوست هیالورونیک را قبلا خریده بودم و فوق‌العاده راضی بودم. لطفا زمان دقیق موجود شدن دوباره آن را اعلام کنید تا بلافاصله سفارش دهم.",               unread: true,  priority: "مهم",  receivedAt: "2026-07-02T13:10:00" },
  { id: "MSG-305", customerId: "C-206", subject: "مشکل جزیی در مرحله بازگشت از درگاه پرداخت",    body: "در مرحله پرداخت نهایی گاهی مرورگر موبایل من به صفحه قبلی برمی‌گردد اما پیامک کسر وجه می‌آید. لطفا سیستم تایید پرداخت را بررسی کنید.",                          unread: false, priority: "فوری", receivedAt: "2026-07-01T18:40:00" },
];

const defaultActivities = [
  { id: "ACT-1", title: "بهبود ۹ درصدی نرخ تبدیل صفحه محصول",        description: "با طراحی جدید نسخه موبایل کارت محصول و دکمه افزودن سریع، نرخ رهاسازی سبد کاهش یافت.", time: "۸ دقیقه پیش",  tone: "emerald" },
  { id: "ACT-2", title: "ثبت سفارش عمده ۲ میلیونی از کرمان",          description: "سفارش ORD-7813 شامل روغن زیتون ارگانیک و عسل کوهستان با موفقیت پردازش شد.",            time: "۲۳ دقیقه پیش", tone: "amber"   },
  { id: "ACT-3", title: "هشدار موجودی: قهوه‌ساز سفری در آستانه اتمام", description: "فقط ۱۸ عدد در انبار باقی مانده است. پیشنهاد می‌شود تامین مجدد در دستور کار قرار گیرد.", time: "۴۵ دقیقه پیش", tone: "rose"    },
  { id: "ACT-4", title: "راه‌اندازی کمپین بازگشت مشتریان کم‌تعامل",   description: "مشتریان بخش «نیازمند توجه» وارد سناریوی ایمیل و پیامک هدیه بازگشت شدند.",              time: "۱ ساعت پیش",   tone: "sky"     },
];

const defaultNotifications = [
  { id: "NOT-1", title: "۳ پیام جدید در پشتیبانی",           body: "پیام‌های اولویت‌دار از تهران و اصفهان نیازمند پاسخ‌گویی سریع هستند.", time: "همین حالا",    tone: "bg-rose-500"    },
  { id: "NOT-2", title: "شاخص رضایت مشتری به ۴.۸ رسید",     body: "روند ۷ روز اخیر نشان می‌دهد امتیاز بررسی محصولات صعودی بوده است.",    time: "۱۲ دقیقه پیش", tone: "bg-emerald-500" },
  { id: "NOT-3", title: "موجودی ۲ کالا در آستانه هشدار",      body: "قهوه‌ساز سفری و ظرف سرو سرامیکی نیاز به سفارش مجدد دارند.",          time: "۲۸ دقیقه پیش", tone: "bg-amber-500"   },
  { id: "NOT-4", title: "کمپین اینستاگرام از هدف عبور کرد",  body: "نرخ کلیک و بازدید ۱۸ درصد بیشتر از پیش‌بینی اولیه ثبت شده است.",    time: "۱ ساعت پیش",   tone: "bg-sky-500"     },
];

const defaultReports = [
  { id: "REP-1", title: "گزارش جامع فروش و درآمد ماهانه",         summary: "تحلیل کامل سود خالص، میانگین ارزش سفارش، نرخ رشد نسبت به ماه قبل و سهم فروش هر دسته‌بندی.", type: "فروش",     date: "۱۴۰۵/۰۴/۱۲", size: "2.4 MB", tone: "emerald" },
  { id: "REP-2", title: "تحلیل رفتار مشتریان و سگمنت‌بندی LTV", summary: "شناسایی مشتریان وفادار، بررسی تکرار خرید، تحلیل ریزش کاربران و اثربخشی باشگاه مشتریان.",       type: "مشتریان",  date: "۱۴۰۵/۰۴/۱۰", size: "1.8 MB", tone: "sky"     },
  { id: "REP-3", title: "وضعیت انبار، موجودی و تامین کالا",       summary: "گزارش سرعت گردش موجودی، کالاهای پرریسک، زمان‌بندی سفارش مجدد و پیش‌بینی تقاضای فصلی.",        type: "موجودی",   date: "۱۴۰۵/۰۴/۰۸", size: "1.2 MB", tone: "amber"   },
  { id: "REP-4", title: "بازدهی کمپین‌های بازاریابی و کانال‌ها", summary: "تحلیل نرخ تبدیل SEO ارگانیک، تبلیغات کلیکی، همکاری در فروش و کمپین‌های شبکه‌های اجتماعی.",    type: "مارکتینگ", date: "۱۴۰۵/۰۴/۰۵", size: "3.1 MB", tone: "violet"  },
];

const defaultEvents = [
  { id: "EV-1", day: 3,  title: "جلسه تحلیل فروش و استراتژی رشد",       time: "۰۹:۰۰ تا ۱۰:۳۰", location: "اتاق کنفرانس آنلاین (Google Meet)", tone: "emerald" },
  { id: "EV-2", day: 8,  title: "مذاکره با تامین‌کنندگان روغن زیتون",   time: "۱۱:۳۰ تا ۱۲:۳۰", location: "دفتر مرکزی سبزینه - سالن ۱",          tone: "amber"   },
  { id: "EV-3", day: 14, title: "راه‌اندازی کمپین فروش ویژه تابستان",   time: "۱۴:۰۰ تا ۱۵:۳۰", location: "هماهنگی تیم مارکتینگ و طراحی",        tone: "sky"     },
  { id: "EV-4", day: 21, title: "بازبینی گزارش مالی و حاشیه سود",       time: "۱۰:۰۰ تا ۱۱:۱۵", location: "داشبورد مدیریت مالی",                 tone: "violet"  },
  { id: "EV-5", day: 27, title: "کارگاه آموزشی ارتقای تجربه مشتری",     time: "۱۶:۰۰ تا ۱۷:۳۰", location: "تیم پشتیبانی و امور مشتریان",         tone: "rose"    },
];

const defaultProfile = {
  firstName: "مریم",
  lastName: "حسینی",
  email: "maryam.h@sabzineh.ir",
  phone: "0912 110 2481",
  role: "مدیر ارشد عملیات و فروش",
  bio: "توسعه‌دهنده راهکارهای تجارت الکترونیک پایدار و مدیریت هوشمند زنجیره تامین در سبزینه.",
};
