/* سبزینه — Analytics Page */

let analyticsCharts = {};
let _liveInterval = null;

function renderAnalytics() {
  const kpis = [
    { title: "نرخ بازگشت مشتری (Retention)", value: "۶۴.۲٪", desc: "رشد خریداران تکراری" },
    { title: "نرخ تکمیل سبد خرید",           value: "۷۲.۵٪", desc: "بهبود تجربه پرداخت موبایل" },
    { title: "زمان پاسخ پشتیبانی",           value: "۱۱ دق",  desc: "سریع‌تر از هدف استاندارد" },
    { title: "شاخص رضایت (NPS)",             value: "۴.۸۵",   desc: "بالاترین سطح سال جاری" },
  ];
  const totalVisits = visitorTrend.reduce((a, b) => a + b, 0);

  const wrap = document.createElement("div");
  wrap.className = "space-y-6";

  // Stats 
  const statsRow = document.createElement("div");
  statsRow.className = "grid gap-4 sm:grid-cols-2 xl:grid-cols-4";
  let liveCount = 58;
  [
    { title: "بازدید ۷ روز اخیر", value: formatNumber(totalVisits), trend: "+۱۸.۴٪", isPos: true, iconBg: "bg-emerald-100 dark:bg-emerald-400/20", iconSvg: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>` },
    { title: "نرخ تبدیل کاربران", value: "۴.۸٪", trend: "+۱.۲٪", isPos: true, iconBg: "bg-sky-100 dark:bg-sky-400/20", iconSvg: `<circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 14 14"/>` },
    { title: "کاربران آنلاین", value: `<span id="live-counter">${formatNumber(liveCount)}</span>`, trend: "زنده", isPos: true, iconBg: "bg-amber-100 dark:bg-amber-400/20", iconSvg: `<circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/>` },
    { title: "میانگین مدت هر جلسه", value: "۰۴:۲۶", trend: "-۰.۲٪", isPos: false, iconBg: "bg-violet-100 dark:bg-violet-400/20", iconSvg: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>` },
  ].forEach(sc => statsRow.appendChild(renderStatCard(sc)));
  wrap.appendChild(statsRow);

  // Live counter (clear previous interval)
  if (_liveInterval) { clearInterval(_liveInterval); _liveInterval = null; }
  _liveInterval = setInterval(() => {
    const el = document.getElementById("live-counter");
    if (!el) { clearInterval(_liveInterval); _liveInterval = null; return; }
    liveCount = Math.max(35, Math.min(95, liveCount + Math.floor(Math.random() * 5) - 2));
    el.textContent = formatNumber(liveCount);
  }, 3500);

  // Charts row 
  const chartsRow = document.createElement("div");
  chartsRow.className = "grid gap-6 xl:grid-cols-[1.5fr_1fr]";

  const visCard = document.createElement("div");
  visCard.className = `${card} p-5 sm:p-6`;
  visCard.innerHTML = `
    <div class="mb-5"><h3 class="text-sm font-extrabold text-[#2f281f] dark:text-[#f5ede3]">روند بازدید روزانه سایت</h3><p class="mt-0.5 text-xs text-[#9a7b65]">تغییرات ورودی کاربران در هفته اخیر</p></div>
    <div class="chart-container"><canvas id="visitor-chart"></canvas></div>
  `;
  chartsRow.appendChild(visCard);

  const barCard = document.createElement("div");
  barCard.className = `${card} p-5 sm:p-6`;
  barCard.innerHTML = `
    <div class="mb-5"><h3 class="text-sm font-extrabold text-[#2f281f] dark:text-[#f5ede3]">کانال‌های جذب ترافیک</h3><p class="mt-0.5 text-xs text-[#9a7b65]">سهم هر کانال از ورود کاربران</p></div>
    <div class="chart-container"><canvas id="traffic-bar-chart"></canvas></div>
  `;
  chartsRow.appendChild(barCard);
  wrap.appendChild(chartsRow);

  // Progress bars
  const progressCard = document.createElement("div");
  progressCard.className = `${card} p-5 sm:p-6`;
  progressCard.innerHTML = `
    <div class="mb-5"><h3 class="text-sm font-extrabold text-[#2f281f] dark:text-[#f5ede3]">سهم کانال‌های بازاریابی</h3><p class="mt-0.5 text-xs text-[#9a7b65]">تفکیک دقیق منابع ترافیک ورودی</p></div>
    <div class="space-y-5">
      ${trafficSources.map((s, i) => `
        <div>
          <div class="mb-2 flex items-center justify-between">
            <span class="text-sm font-semibold text-[#2f281f] dark:text-[#f5ede3]">${s.label}</span>
            <span class="text-sm font-extrabold" style="color:${s.color}">${formatNumber(s.value)}٪</span>
          </div>
          <div class="h-2.5 overflow-hidden rounded-full bg-[#f5ede3] dark:bg-white/10">
            <div class="h-full rounded-full transition-all duration-1000 progress-bar" style="width:0%;background:${s.color}"></div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
  wrap.appendChild(progressCard);

  // KPI cards 
  const kpiCard = document.createElement("div");
  kpiCard.className = "grid gap-4 sm:grid-cols-2 xl:grid-cols-4";
  kpis.forEach(kpi => {
    const el = document.createElement("div");
    el.className = "kpi-card dark:kpi-card";
    el.innerHTML = `<p class="text-xs font-medium text-[#9a7b65]">${kpi.title}</p><p class="mt-1.5 text-2xl font-extrabold text-[#2f281f] dark:text-[#f5ede3]">${kpi.value}</p><p class="mt-1 text-[11px] text-[#7a6655] dark:text-[#b09080]">${kpi.desc}</p>`;
    kpiCard.appendChild(el);
  });
  wrap.appendChild(kpiCard);

  // Funnel 
  const funnelCard = document.createElement("div");
  funnelCard.className = `${card} p-5 sm:p-6`;
  funnelCard.innerHTML = `
    <div class="mb-5"><h3 class="text-sm font-extrabold text-[#2f281f] dark:text-[#f5ede3]">قیف تبدیل فروش</h3><p class="mt-0.5 text-xs text-[#9a7b65]">مسیر کاربر از ورود تا خرید نهایی</p></div>
    <div class="space-y-3">
      ${[
        { label: "بازدید صفحه محصول",  value: 6740, pct: 100, color: "#7b8f3b" },
        { label: "افزودن به سبد خرید", value: 2850, pct: 42,  color: "#5f7f68" },
        { label: "شروع فرایند پرداخت", value: 1820, pct: 27,  color: "#d28b45" },
        { label: "تکمیل خرید موفق",    value: 1140, pct: 17,  color: "#9a7757" },
      ].map((step, i) => `
        <div class="flex items-center gap-4">
          <div class="w-5 text-center text-xs font-bold text-[#9a7b65]">${i + 1}</div>
          <div class="flex-1">
            <div class="mb-1.5 flex justify-between text-xs">
              <span class="font-semibold text-[#2f281f] dark:text-[#f5ede3]">${step.label}</span>
              <span class="font-bold" style="color:${step.color}">${formatNumber(step.value)} نفر (${formatNumber(step.pct)}٪)</span>
            </div>
            <div class="h-3 overflow-hidden rounded-full bg-[#f5ede3] dark:bg-white/10">
              <div class="h-full rounded-full" style="width:${step.pct}%;background:${step.color}"></div>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
  wrap.appendChild(funnelCard);

  // Animate progress bars & init charts
  requestAnimationFrame(() => {
    // Animate bars
    const bars = wrap.querySelectorAll(".progress-bar");
    bars.forEach((bar, i) => {
      setTimeout(() => {
        bar.style.width = `${trafficSources[i].value}%`;
      }, 100 + i * 100);
    });

    const c = getChartColors();

    const vc = wrap.querySelector("#visitor-chart");
    if (vc) {
      if (analyticsCharts.visitor) analyticsCharts.visitor.destroy();
      analyticsCharts.visitor = new Chart(vc, {
        type: "line",
        data: {
          labels: ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"],
          datasets: [{
            label: "بازدیدکنندگان", data: visitorTrend, fill: true,
            borderColor: "#7b8f3b", backgroundColor: "rgba(123,143,59,0.10)",
            pointBackgroundColor: "#7b8f3b", pointBorderColor: "#fff",
            pointBorderWidth: 2.5, pointRadius: 5, pointHoverRadius: 7, tension: 0.42,
          }],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          animation: { duration: 900, easing: "easeOutQuart" },
          plugins: {
            legend: { display: false },
            tooltip: { rtl: true, displayColors: false, backgroundColor: c.tooltipBg, titleColor: c.tooltipTxt, bodyColor: c.text, borderColor: c.border, borderWidth: 1, padding: 10, callbacks: { label: ctx => ` بازدید: ${new Intl.NumberFormat("fa-IR").format(ctx.raw)} نفر` } },
          },
          scales: {
            x: { grid: { display: false }, ticks: { color: c.text, font: { size: 11, weight: "bold" } } },
            y: { grid: { color: c.grid }, ticks: { color: c.text, font: { size: 11, weight: "bold" } } },
          },
        },
      });
    }

    const bc = wrap.querySelector("#traffic-bar-chart");
    if (bc) {
      if (analyticsCharts.bar) analyticsCharts.bar.destroy();
      analyticsCharts.bar = new Chart(bc, {
        type: "bar",
        data: {
          labels: trafficSources.map(s => s.label),
          datasets: [{ label: "سهم ترافیک (٪)", data: trafficSources.map(s => s.value), backgroundColor: trafficSources.map(s => s.color), borderRadius: 8, borderSkipped: false, maxBarThickness: 28 }],
        },
        options: {
          responsive: true, maintainAspectRatio: false, indexAxis: "y",
          animation: { duration: 1000, easing: "easeOutBack" },
          plugins: {
            legend: { display: false },
            tooltip: { rtl: true, backgroundColor: c.tooltipBg, titleColor: c.tooltipTxt, bodyColor: c.text, borderColor: c.border, borderWidth: 1, padding: 10, callbacks: { label: ctx => ` سهم: ${ctx.raw}٪` } },
          },
          scales: {
            x: { grid: { color: c.grid }, ticks: { color: c.text, font: { size: 11, weight: "bold" } } },
            y: { grid: { display: false }, ticks: { color: c.text, font: { size: 11, weight: "bold" } } },
          },
        },
      });
    }
  });

  return wrap;
}
