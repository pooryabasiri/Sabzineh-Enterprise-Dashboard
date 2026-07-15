/* سبزینه — Dashboard Page */

let dashCharts = {};
let dashSwiper = null;

function renderDashboard() {
  const totalRev = store.orders.reduce((a, o) => a + o.amount, 0);
  const activeCust = store.customers.filter(c => c.status === "فعال").length;
  const deliveredCnt = store.orders.filter(o => o.status === "تحویل شده").length;
  const avgBasket = store.orders.length ? Math.round(totalRev / store.orders.length) : 0;

  const catBreakdown = Object.entries(categoryMeta).map(([key, meta]) => {
    const items = store.products.filter(p => p.category === key);
    const units = items.reduce((a, p) => a + p.sales, 0);
    const revenue = items.reduce((a, p) => a + p.price * p.sales, 0);
    return { ...meta, key, units, revenue };
  });

  const topProds = [...store.products].sort((a, b) => b.sales - a.sales).slice(0, 8);

  const wrap = document.createElement("div");
  wrap.className = "space-y-6";

  // Hero 
  const hero = document.createElement("div");
  hero.className = `${card} p-5 sm:p-6`;
  hero.innerHTML = `
    <div class="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-center">
      <div>
        <span class="inline-flex items-center gap-2 rounded-full bg-[#eef3df] px-3.5 py-1 text-xs font-bold text-[#7b8f3b] dark:bg-[#26301b] dark:text-[#c5e08a]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-3.5 h-3.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
          پنل مدیریت فروشگاه سبزینه
        </span>
        <h2 class="mt-4 max-w-2xl text-2xl font-extrabold tracking-tight text-[#2f281f] dark:text-[#f5ede3] sm:text-3xl leading-snug">مدیریت یکپارچه فروش، انبار و وفاداری مشتریان</h2>
        <p class="mt-3 max-w-xl text-sm leading-7 text-[#7a6655] dark:text-[#b09080]">داشبورد هوشمند با Chart.js، Swiper، LocalStorage و خروجی CSV — بدون وابستگی به بک‌اند</p>
        <div class="mt-5 flex flex-wrap gap-3">
          <button id="dash-add-product" class="inline-flex items-center gap-2 rounded-xl bg-[#7b8f3b] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#7b8f3b]/20 hover:bg-[#6a7e32] transition">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" class="w-4 h-4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            ثبت محصول جدید
          </button>
          <button id="dash-export-csv" class="inline-flex items-center gap-2 rounded-xl border border-[#eadfce] bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#5e4e3c] hover:bg-white transition dark:border-white/10 dark:bg-white/5 dark:text-[#e7d7c8] dark:hover:bg-white/10">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-4 h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            خروجی CSV سفارشات
          </button>
        </div>
      </div>
      <div class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-2xl border border-[#efe3d5] bg-[#fffdfa] p-5 dark:border-white/10 dark:bg-white/5">
          <p class="text-xs font-medium text-[#9a7b65]">شاخص سلامت عملیات</p>
          <p class="mt-2 text-3xl font-extrabold text-[#7b8f3b]">۹۴.۲٪</p>
          <p class="mt-2 text-xs leading-6 text-[#7a6655] dark:text-[#b09080]">پایداری پردازش، رضایت مشتری و زمان ارسال</p>
        </div>
        <div class="rounded-2xl border border-[#efe3d5] bg-[#fffdfa] p-5 dark:border-white/10 dark:bg-white/5">
          <p class="text-xs font-medium text-[#9a7b65]">ریسک موجودی انبار</p>
          <p class="mt-2 text-3xl font-extrabold text-rose-600 dark:text-rose-400">${formatNumber(store.products.filter(p => p.stock < 40).length)} قلم</p>
          <p class="mt-2 text-xs leading-6 text-[#7a6655] dark:text-[#b09080]">نیازمند تامین مجدد از تولیدکنندگان</p>
        </div>
      </div>
    </div>
  `;
  hero.querySelector("#dash-add-product").addEventListener("click", () => openModal({ type: "add-product" }));
  hero.querySelector("#dash-export-csv").addEventListener("click", exportOrdersCSV);
  wrap.appendChild(hero);

  // Stats row 
  const stats = document.createElement("div");
  stats.className = "grid gap-4 sm:grid-cols-2 xl:grid-cols-4";
  [
    { title: "درآمد کل محقق شده", value: formatCompact(totalRev), trend: "+۱۴.۲٪", isPos: true, iconBg: "bg-emerald-100 dark:bg-emerald-400/20", iconSvg: `<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>` },
    { title: "مشتریان فعال سیستم", value: formatNumber(activeCust), trend: "+۸.۵٪", isPos: true, iconBg: "bg-sky-100 dark:bg-sky-400/20", iconSvg: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>` },
    { title: "سفارشات موفق تحویل‌شده", value: formatNumber(deliveredCnt), trend: "+۶.۱٪", isPos: true, iconBg: "bg-amber-100 dark:bg-amber-400/20", iconSvg: `<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>` },
    { title: "میانگین ارزش هر سبد", value: formatCompact(avgBasket), trend: "+۴.۳٪", isPos: true, iconBg: "bg-violet-100 dark:bg-violet-400/20", iconSvg: `<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>` },
  ].forEach(sc => stats.appendChild(renderStatCard(sc)));
  wrap.appendChild(stats);

  // Charts row 
  const chartsRow = document.createElement("div");
  chartsRow.className = "grid gap-6 xl:grid-cols-[1.7fr_1fr]";

  const revenueCard = document.createElement("div");
  revenueCard.className = `${card} p-5 sm:p-6`;
  revenueCard.innerHTML = `
    <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h3 class="text-sm font-extrabold text-[#2f281f] dark:text-[#f5ede3]">روند درآمد ماهانه</h3>
        <p class="mt-0.5 text-xs text-[#9a7b65]">مقایسه با هدف‌گذاری سالانه</p>
      </div>
      <div class="flex items-center gap-4 text-xs font-semibold text-[#9a7b65]">
        <span class="flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-full bg-[#7b8f3b]"></span>درآمد واقعی</span>
        <span class="flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-full bg-[#d28b45]/60"></span>هدف</span>
      </div>
    </div>
    <div class="chart-container"><canvas id="revenue-chart"></canvas></div>
  `;
  chartsRow.appendChild(revenueCard);

  const catCard = document.createElement("div");
  catCard.className = `${card} p-5 sm:p-6`;
  catCard.innerHTML = `
    <div class="mb-4">
      <h3 class="text-sm font-extrabold text-[#2f281f] dark:text-[#f5ede3]">ترکیب فروش دسته‌بندی‌ها</h3>
      <p class="mt-0.5 text-xs text-[#9a7b65]">سهم هر دسته از تعداد فروش</p>
    </div>
    <div style="height:180px;max-width:16rem;margin:0 auto;position:relative;"><canvas id="cat-chart"></canvas></div>
    <div class="mt-5 space-y-2.5">
      ${catBreakdown.map(item => `
        <div class="flex items-center justify-between gap-3 rounded-xl bg-[#fbf8f3] px-3.5 py-2.5 dark:bg-white/5">
          <div class="flex items-center gap-2.5">
            <span class="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-extrabold" style="background:${item.soft};color:${item.color}">${item.mark}</span>
            <div>
              <p class="text-sm font-semibold text-[#2f281f] dark:text-[#f5ede3]">${item.label}</p>
              <p class="text-[11px] text-[#9a7b65]">${formatCompact(item.revenue)}</p>
            </div>
          </div>
          <span class="text-sm font-bold text-[#5e4e3c] dark:text-[#e7d7c8]">${formatNumber(item.units)} عدد</span>
        </div>
      `).join("")}
    </div>
  `;
  chartsRow.appendChild(catCard);
  wrap.appendChild(chartsRow);

  // Swiper
  const swiperCard = document.createElement("div");
  swiperCard.className = `${card} p-5 sm:p-6 overflow-hidden`;
  swiperCard.innerHTML = `
    <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h3 class="text-sm font-extrabold text-[#2f281f] dark:text-[#f5ede3]">محصولات پرفروش</h3>
        <p class="mt-0.5 text-xs text-[#9a7b65]">اسلایدر تعاملی با Swiper.js</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="sw-prev rounded-xl border border-[#eadfce] bg-white/80 p-2 text-[#7a6655] hover:bg-white dark:border-white/10 dark:bg-white/5"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-4 h-4"><polyline points="9 18 15 12 9 6"/></svg></button>
        <button class="sw-next rounded-xl border border-[#eadfce] bg-white/80 p-2 text-[#7a6655] hover:bg-white dark:border-white/10 dark:bg-white/5"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-4 h-4"><polyline points="15 18 9 12 15 6"/></svg></button>
      </div>
    </div>
    <div class="swiper dash-swiper" style="overflow:visible">
      <div class="swiper-wrapper">
        ${topProds.map(p => `
          <div class="swiper-slide h-auto">
            <article class="flex h-full flex-col rounded-2xl border border-[#efe3d5] bg-[#fffdfa] p-4 transition hover:shadow-md dark:border-white/10 dark:bg-white/5">
              <div class="flex aspect-square items-center justify-center rounded-2xl bg-linear-to-br ${p.gradient} text-2xl font-extrabold text-white shadow-sm">${p.mark}</div>
              <div class="mt-3 flex-1">
                <span class="rounded-full bg-[#f5ede3] px-2 py-0.5 text-[10px] font-bold text-[#9a7b65] dark:bg-white/10 dark:text-[#e6b87a]">${p.badge}</span>
                <h4 class="mt-2 text-xs font-bold leading-6 text-[#2f281f] dark:text-[#f5ede3]">${p.title}</h4>
                <p class="text-[11px] text-[#9a7b65]">${categoryMeta[p.category].label}</p>
              </div>
              <div class="mt-3 flex items-center justify-between border-t border-[#f5ede3] pt-3 dark:border-white/5">
                <span class="text-sm font-bold text-[#7b8f3b]">${formatCompact(p.price)}</span>
                <span class="text-xs text-[#9a7b65]">★ ${formatNumber(p.rating)}</span>
              </div>
            </article>
          </div>
        `).join("")}
      </div>
    </div>
    <div class="sw-pagination mt-4 flex items-center justify-center gap-1.5"></div>
  `;
  wrap.appendChild(swiperCard);

  // Recent orders + activity 
  const bottomRow = document.createElement("div");
  bottomRow.className = "grid gap-6 xl:grid-cols-[1.7fr_1fr]";

  const ordersCard = document.createElement("div");
  ordersCard.className = `${card} p-5 sm:p-6 overflow-hidden`;
  ordersCard.innerHTML = `
    <div class="flex items-center justify-between border-b border-[#efe3d5] pb-4 dark:border-white/10">
      <div>
        <h3 class="text-sm font-extrabold text-[#2f281f] dark:text-[#f5ede3]">سفارشات اخیر</h3>
        <p class="mt-0.5 text-xs text-[#9a7b65]">۵ سفارش آخر ثبت شده</p>
      </div>
      <button id="dash-all-orders" class="rounded-xl bg-[#f5ede3] px-3 py-1.5 text-xs font-bold text-[#7b8f3b] hover:bg-[#eadfce] dark:bg-white/10 dark:text-[#b9d59b]">مشاهده همه</button>
    </div>
    <div class="mt-4 overflow-x-auto">
      <table class="w-full min-w-150">
        <thead>
          <tr class="border-b border-[#efe3d5] text-right text-xs font-bold text-[#9a7b65] dark:border-white/10">
            <th class="pb-3 pr-1">شناسه</th><th class="pb-3">مشتری</th><th class="pb-3">مبلغ</th><th class="pb-3">وضعیت</th><th class="pb-3 pl-1">تاریخ</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#efe3d5] dark:divide-white/10 text-sm">
          ${store.orders.slice(0, 5).map(o => {
            const c = getCustomerById(o.customerId);
            return `<tr class="cursor-pointer hover:bg-[#fdfaf6] dark:hover:bg-white/5" data-orderid="${o.id}">
              <td class="py-3.5 pr-1 font-bold text-[#5e4e3c] dark:text-[#e7d7c8]">${o.id}</td>
              <td class="py-3.5 font-semibold">${c?.name ?? "مهمان"}</td>
              <td class="py-3.5 font-semibold">${formatMoney(o.amount)}</td>
              <td class="py-3.5"><span class="rounded-full px-2.5 py-1 text-xs ${statusChip(o.status)}">${o.status}</span></td>
              <td class="py-3.5 pl-1 text-xs text-[#9a7b65]">${formatShortDate(o.createdAt)}</td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
  ordersCard.querySelector("#dash-all-orders").addEventListener("click", () => navigateTo("orders"));
  ordersCard.querySelectorAll("tr[data-orderid]").forEach(row => {
    row.addEventListener("click", () => openModal({ type: "order-details", payload: row.dataset.orderid }));
  });
  bottomRow.appendChild(ordersCard);

  const actCard = document.createElement("div");
  actCard.className = `${card} p-5 sm:p-6`;
  actCard.innerHTML = `
    <div class="mb-4">
      <h3 class="text-sm font-extrabold text-[#2f281f] dark:text-[#f5ede3]">فعالیت‌های اخیر</h3>
      <p class="mt-0.5 text-xs text-[#9a7b65]">رخدادهای خودکار سیستم</p>
    </div>
    <div class="space-y-3">
      ${store.activities.slice(0, 5).map(act => `
        <div class="rounded-xl p-3.5 ${toneBorder(act.tone)}">
          <p class="text-sm font-bold">${act.title}</p>
          <p class="mt-1 text-xs leading-5 opacity-80">${act.description}</p>
          <p class="mt-1.5 text-[11px] opacity-60">${act.time}</p>
        </div>
      `).join("")}
    </div>
  `;
  bottomRow.appendChild(actCard);
  wrap.appendChild(bottomRow);

  // Init charts & swiper after DOM
  requestAnimationFrame(() => {
    const c = getChartColors();

    const rCanvas = wrap.querySelector("#revenue-chart");
    if (rCanvas) {
      if (dashCharts.revenue) dashCharts.revenue.destroy();
      dashCharts.revenue = new Chart(rCanvas, {
        type: "bar",
        data: {
          labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
          datasets: [
            { label: "درآمد محقق شده", data: monthlyRevenue, backgroundColor: "#7b8f3b", hoverBackgroundColor: "#6a7e32", borderRadius: 10, borderSkipped: false, maxBarThickness: 22 },
            { label: "هدف تعیین شده",  data: monthlyTarget,  backgroundColor: "rgba(210,139,69,0.28)", hoverBackgroundColor: "rgba(210,139,69,0.45)", borderRadius: 10, borderSkipped: false, maxBarThickness: 22 },
          ],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { rtl: true, backgroundColor: c.tooltipBg, titleColor: c.tooltipTxt, bodyColor: c.text, borderColor: c.border, borderWidth: 1, padding: 10, callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.raw} واحد` } },
          },
          scales: {
            x: { grid: { display: false }, ticks: { color: c.text, font: { size: 10, weight: "bold" } } },
            y: { beginAtZero: true, grid: { color: c.grid }, ticks: { color: c.text, font: { size: 10, weight: "bold" } } },
          },
        },
      });
    }

    const dCanvas = wrap.querySelector("#cat-chart");
    if (dCanvas && catBreakdown.length) {
      if (dashCharts.category) dashCharts.category.destroy();
      dashCharts.category = new Chart(dCanvas, {
        type: "doughnut",
        data: { labels: catBreakdown.map(c => c.label), datasets: [{ data: catBreakdown.map(c => c.units), backgroundColor: catBreakdown.map(c => c.color), hoverOffset: 6, borderWidth: 0 }] },
        options: {
          responsive: true, maintainAspectRatio: false, cutout: "72%",
          plugins: {
            legend: { display: false },
            tooltip: { rtl: true, displayColors: false, backgroundColor: c.tooltipBg, titleColor: c.tooltipTxt, bodyColor: c.text, borderColor: c.border, borderWidth: 1, padding: 10, callbacks: { label: ctx => ` سهم فروش: ${ctx.raw} قلم` } },
          },
        },
      });
    }

    // Swiper
    if (dashSwiper) { try { dashSwiper.destroy(true, true); } catch (e) {} dashSwiper = null; }
    const swiperEl = wrap.querySelector(".dash-swiper");
    if (swiperEl) {
      dashSwiper = new Swiper(swiperEl, {
        slidesPerView: 1.2, spaceBetween: 14, observer: true, observeParents: true,
        autoplay: { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true },
        navigation: { prevEl: swiperCard.querySelector(".sw-prev"), nextEl: swiperCard.querySelector(".sw-next") },
        pagination: { el: swiperCard.querySelector(".sw-pagination"), clickable: true },
        breakpoints: { 480: { slidesPerView: 1.7 }, 640: { slidesPerView: 2.2 }, 768: { slidesPerView: 2.6 }, 1024: { slidesPerView: 3.3 }, 1280: { slidesPerView: 4.2 } },
      });
    }
  });

  return wrap;
}
