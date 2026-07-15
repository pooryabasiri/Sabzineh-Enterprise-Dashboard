/* سبزینه — Jalali Calendar System */

// ماه‌های شمسی
const _calMonths = [
  "فروردین", "اردیبهشت", "خرداد", "تیر",
  "مرداد", "شهریور", "مهر", "آبان",
  "آذر", "دی", "بهمن", "اسفند",
];

// تابع فرمت کردن سال بدون جداکننده (مثلاً ۱۴۰۵ نه ۱٬۴۰۵)
function _formatYear(year) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(year).replace(/\d/g, d => persianDigits[d]);
}

// افزایش یا کاهش یک ماه در تاریخ شمسی
function _addJMonths({ jy, jm }, delta) {
  let y = jy;
  let m = jm + delta;
  while (m > 12) { m -= 12; y += 1; }
  while (m < 1)  { m += 12; y -= 1; }
  return { jy: y, jm: m };
}

// تبدیل اولین روز ماه شمسی به میلادی برای محاسبه شروع هفته
function _jMonthStartGregorianDate(jy, jm) {
  const g = window.jalaali.toGregorian(jy, jm, 1);
  return new Date(g.gy, g.gm - 1, g.gd);
}

// تبدیل عدد getDay جاوااسکریپت (یکشنبه=۰) به اندیس شنبه (شنبه=۰)
function _satBasedWeekIndex(jsDay) {
  // شنبه(6) -> 0, یکشنبه(0) -> 1 ... جمعه(5) -> 6
  return (jsDay + 1) % 7; 
}

// تولید گرید تمام روزهای نمایش داده شده در ماه (ماه قبل، ماه جاری، ماه بعد)
function _getMonthGridJalali({ jy, jm }) {
  const firstG = _jMonthStartGregorianDate(jy, jm);
  const firstIdx = _satBasedWeekIndex(firstG.getDay());

  const daysInMonth = window.jalaali.jalaaliMonthLength(jy, jm);

  const prev = _addJMonths({ jy, jm }, -1);
  const daysInPrev = window.jalaali.jalaaliMonthLength(prev.jy, prev.jm);

  const grid = [];

  // 1. روزهای ماه قبل (پرکردن خانه‌های خالی ابتدای ماه)
  for (let i = firstIdx - 1; i >= 0; i--) {
    grid.push({ day: daysInPrev - i, other: true, jy: prev.jy, jm: prev.jm });
  }

  // 2. روزهای ماه جاری (روزهای اصلی ماه)
  for (let d = 1; d <= daysInMonth; d++) {
    grid.push({ day: d, other: false, jy, jm });
  }

  // 3. تکمیل ردیف آخر با ماه بعد
  const next = _addJMonths({ jy, jm }, +1);
  let nd = 1;
  while (grid.length % 7 !== 0) {
    grid.push({ day: nd++, other: true, jy: next.jy, jm: next.jm });
  }

  return grid;
}

// تابع کمکی برای بررسی وجود رویداد در یک روز خاص
function _hasEventOnDay(dateObj) {
  const { jy, jm, jd } = dateObj;
  return store.events.some(e => e.jy === jy && e.jm === jm && e.jd === jd);
}
/* تابع رندر روزهای تقویم شمسی */
function _renderCalDays(containerId) {
  const todayJ = window.jalaali.toJalaali(new Date());
  const { jy, jm } = appState.calDate;

  const grid = _getMonthGridJalali(appState.calDate);
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  grid.forEach(({ day, other, jy: cellY, jm: cellM }) => {
    const el = document.createElement("button");

    const hasEvent = !other && store.events.some(e => e.jy === cellY && e.jm === cellM && e.jd === day);

    const isToday = !other && day === todayJ.jd && cellM === todayJ.jm && cellY === todayJ.jy;
    const isSel = !other && day === appState.selectedDay;

    let cls = "calendar-day";
    if (other) cls += " other-month";
    if (isToday) cls += " ring-2 ring-[#7b8f3b]/40";
    if (isSel) cls += " active";
    if (hasEvent && !isSel) cls += " has-event";

    el.className = cls;
    el.textContent = formatNumber(day);

    el.addEventListener("click", () => {
      if (!other) {
        appState.selectedDay = day;
        _updateEventsPanel();
        container.querySelectorAll("button").forEach(b => b.classList.remove("active"));
        el.classList.add("active");
      }
    });

    container.appendChild(el);
  });
}

// پیدا کردن اندکس واقعی یک رویداد در آرایه اصلی برای امکان ویرایش یا حذف
function _findEventIndex(event) {
  return store.events.findIndex(
    e => e.jy === event.jy && e.jm === event.jm && e.jd === event.jd && e.title === event.title
  );
}

// نمایش و به‌روزرسانی پنل سمت راست (لیست رویدادها)
function _updateEventsPanel() {
  const panel = document.getElementById("cal-events-panel");
  if (!panel) return;

  const { jy, jm } = appState.calDate;
  const selectedDay = appState.selectedDay;

  // فیلتر رویدادهای امروز انتخاب‌شده
  const dayEv = store.events.filter(e => e.jy === jy && e.jm === jm && e.jd === selectedDay);

  // همه رویدادها به ترتیب زمان
  const allEv = [...store.events].sort((a, b) =>
    a.jy !== b.jy ? a.jy - b.jy :
    a.jm !== b.jm ? a.jm - b.jm :
    a.jd - b.jd
  );

  panel.innerHTML = `
    <div class="flex items-center justify-between mb-3">
      <div>
        <h3 class="text-sm font-extrabold text-[#2f281f] dark:text-[#f5ede3]">
          رویدادهای روز ${formatNumber(selectedDay)}
        </h3>
        <p class="mt-0.5 text-xs text-[#9a7b65]">${dayEv.length ? dayEv.length + " رویداد" : "خالی"}</p>
      </div>
      <button id="add-event-btn" class="inline-flex items-center gap-1.5 rounded-xl bg-[#7b8f3b] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#6a7e32] transition">
        افزودن
      </button>
    </div>

    <div class="space-y-2 min-h-20">
      ${dayEv.length ? dayEv.map(ev => {
        const realIdx = _findEventIndex(ev);
        return `
          <div class="rounded-xl p-3 ${toneBorder(ev.tone)} relative group transition-all duration-200">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2">
                  <h4 class="text-sm font-bold truncate">${ev.title}</h4>
                  <span class="text-[10px] opacity-70 shrink-0 font-medium">${ev.time}</span>
                </div>
                <p class="mt-1 text-xs opacity-80 truncate">📍 ${ev.location}</p>
              </div>
              
              <!-- دکمه‌های کنترل ویرایش و حذف -->
              <div class="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition duration-150">
                <button class="edit-ev-btn p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition" data-idx="${realIdx}" title="ویرایش">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
                    <path d="M12 20h9"/>
                    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
                  </svg>
                </button>
                <button class="delete-ev-btn p-1.5 rounded-lg hover:bg-red-500/10 text-red-600 dark:text-red-400 transition" data-idx="${realIdx}" title="حذف">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14H6L5 6"/>
                    <path d="M10 11v6"/>
                    <path d="M14 11v6"/>
                    <path d="M9 6V4h6v2"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join("") : `<p class="py-6 text-center text-xs text-[#9a7b65]">رویدادی ثبت نشده.</p>`}
    </div>

    <div class="mt-4 border-t border-[#efe3d5] pt-3 dark:border-white/10">
      <p class="mb-2 text-xs font-bold text-[#7a6655] dark:text-[#c4aa96]">همه رویدادها</p>
      <div class="space-y-1.5 max-h-64 overflow-y-auto">
        ${allEv.map(ev => `
          <button class="ev-jump flex w-full items-center gap-2 rounded-xl border border-[#efe3d5] p-2 text-right text-xs hover:bg-[#f5ede3] dark:border-white/10 dark:hover:bg-white/5"
                  data-jy="${ev.jy}" data-jm="${ev.jm}" data-jd="${ev.jd}">
            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-extrabold text-white bg-[#7b8f3b]">
              ${formatNumber(ev.jd)}
            </span>
            <span class="truncate font-semibold text-[#2f281f] dark:text-[#f5ede3]">${ev.title}</span>
          </button>
        `).join("")}
      </div>
    </div>
  `;

  // اتصال اکشن‌ها به دکمه‌های تولید شده
  const addBtn = panel.querySelector("#add-event-btn");
  if (addBtn) {
    addBtn.addEventListener("click", () => openModal({ type: "add-event", payload: selectedDay }));
  }

  // افزودن رویداد جدید
  panel.querySelectorAll(".edit-ev-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = Number(btn.dataset.idx);
      const ev = store.events[idx];
      if (ev) {
        openModal({ 
          type: "edit-event", 
          payload: { ...ev, selectedDay: selectedDay, calDate: appState.calDate } 
        });
      }
    });
  });

  // حذف رویداد با تأیید کاربر
  panel.querySelectorAll(".delete-ev-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = Number(btn.dataset.idx);
      if (confirm("آیا از حذف این رویداد اطمینان دارید؟")) {
        store.events.splice(idx, 1);
        _renderCalDays("cal-days");
        _updateEventsPanel();
      }
    });
  });

  // پرش به تاریخ دیگر از لیست
  panel.querySelectorAll(".ev-jump").forEach(b => {
    b.addEventListener("click", () => {
      appState.calDate = { jy: Number(b.dataset.jy), jm: Number(b.dataset.jm) };
      appState.selectedDay = Number(b.dataset.jd);
      _updateEventsPanel();
      _renderCalDays("cal-days");
    });
  });
}
/* تابع اصلی رندر تقویم و مدیریت ناوبری */
function renderCalendar() {
  const { jy, jm } = appState.calDate;

  // استفاده از فرمت سال جدید بدون جداکننده (مثلاً ۱۴۰۵ نه ۱٬۴۰۵)
  const monthLabel = `${_calMonths[jm - 1]} ${_formatYear(jy)}`;

  const wrap = document.createElement("div");
  wrap.className = "grid gap-5 xl:grid-cols-[1fr_1.1fr] items-start";

  // کارت سمت چپ: تقویم
  const calCard = document.createElement("div");
  calCard.className = `${card} p-4 sm:p-5`; // فرض بر وجود متغیر سراسری card

  calCard.innerHTML = `
    <div class="flex items-center justify-between mb-4">
      <button id="cal-prev" class="size-8 text-3xl flex justify-center items-center rounded-lg border border-[#eadfce] bg-white/80 p-1.5 text-[#7a6655] hover:bg-white dark:border-white/10 dark:bg-[#1f1c19]/80 dark:text-[#c4aa96] dark:hover:bg-[#2a231e] transition">
        ‹
      </button>
      <h3 class="text-sm font-extrabold text-[#2f281f] dark:text-[#f5ede3]">${monthLabel}</h3>
      <button id="cal-next" class="size-8 text-3xl flex justify-center items-center rounded-lg border border-[#eadfce] bg-white/80 p-1.5 text-[#7a6655] hover:bg-white dark:border-white/10 dark:bg-[#1f1c19]/80 dark:text-[#c4aa96] dark:hover:bg-[#2a231e] transition">
        ›
      </button>
    </div>

    <div class="grid grid-cols-7 mb-1">
      ${["ش", "ی", "د", "س", "چ", "پ", "ج"].map(d => `<div class="text-center text-[10px] font-bold text-[#9a7b65] py-1">${d}</div>`).join("")}
    </div>

    <div id="cal-days" class="grid grid-cols-7 gap-0.5"></div>

    <div class="mt-3 flex justify-center">
      <button id="cal-today" class="rounded-lg bg-[#f5ede3] px-3 py-1 text-[11px] font-bold text-[#7b8f3b] hover:bg-[#eadfce] dark:bg-white/10 dark:text-[#b9d59b] transition">
        رفتن به امروز
      </button>
    </div>
  `;

  wrap.appendChild(calCard);

  // کارت سمت راست: لیست رویدادها
  const evPanel = document.createElement("div");
  evPanel.id = "cal-events-panel";
  evPanel.className = `${card} p-4 sm:p-5 h-full`;
  wrap.appendChild(evPanel);

  // منطق ناوبری بین ماه‌ها 

  // کمکی برای جلوگیری از خروج از محدوده مجاز روز در ماه جدید
  const _ensureDayWithinBounds = () => {
    const maxDays = window.jalaali.jalaaliMonthLength(appState.calDate.jy, appState.calDate.jm);
    if (appState.selectedDay > maxDays && appState.selectedDay !== 1) {
      appState.selectedDay = maxDays;
    }
  };

  // دکمه ماه قبل
  calCard.querySelector("#cal-prev").addEventListener("click", () => {
    appState.calDate = _addJMonths(appState.calDate, -1);
    _ensureDayWithinBounds();
    
    // به‌روزرسانی هدر
    calCard.querySelector("h3").textContent = 
      `${_calMonths[appState.calDate.jm - 1]} ${_formatYear(appState.calDate.jy)}`;
      
    _renderCalDays("cal-days");
    _updateEventsPanel();
  });

  // دکمه ماه بعد
  calCard.querySelector("#cal-next").addEventListener("click", () => {
    appState.calDate = _addJMonths(appState.calDate, +1);
    _ensureDayWithinBounds();
    
    // به‌روزرسانی هدر
    calCard.querySelector("h3").textContent = 
      `${_calMonths[appState.calDate.jm - 1]} ${_formatYear(appState.calDate.jy)}`;
      
    _renderCalDays("cal-days");
    _updateEventsPanel();
  });

  // دکمه بازگشت به امروز
  calCard.querySelector("#cal-today").addEventListener("click", () => {
    const t = window.jalaali.toJalaali(new Date());
    appState.calDate = { jy: t.jy, jm: t.jm };
    appState.selectedDay = t.jd;
    
    calCard.querySelector("h3").textContent = 
      `${_calMonths[t.jm - 1]} ${_formatYear(t.jy)}`;
      
    _renderCalDays("cal-days");
    _updateEventsPanel();
  });

  // اجرای اولیه پس از رندر شدن المان‌ها در صفحه
  requestAnimationFrame(() => {
    _renderCalDays("cal-days");
    _updateEventsPanel();
  });

  return wrap;
}