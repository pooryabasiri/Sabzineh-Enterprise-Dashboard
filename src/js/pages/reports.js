/* سبزینه — Reports & Export Page */

function renderReports() {
  const wrap = document.createElement("div");
  wrap.className = "space-y-6";

  //Header 
  const headerCard = document.createElement("div");
  headerCard.className = `${card} p-5 sm:p-6`;
  headerCard.innerHTML = `
    <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <h2 class="text-base font-extrabold text-[#2f281f] dark:text-[#f5ede3]">گزارشات آماده و خروجی داده</h2>
        <p class="mt-1 text-xs text-[#9a7b65]">دانلود گزارش‌های جامع فروش، مشتریان، موجودی و بازاریابی</p>
      </div>
      <button id="export-csv-btn" class="inline-flex items-center gap-2 rounded-xl bg-[#7b8f3b] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#6a7e32] transition">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-4 h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        خروجی CSV سفارشات
      </button>
    </div>
  `;
  headerCard.querySelector("#export-csv-btn").addEventListener("click", exportOrdersCSV);
  wrap.appendChild(headerCard);

  //Reports grid 
  const grid = document.createElement("div");
  grid.className = "grid gap-4 md:grid-cols-2";

  store.reports.forEach(r => {
    const rCard = document.createElement("div");
    rCard.className = card + " p-5 flex flex-col gap-4";
    const toneColors = {
      emerald: "from-emerald-500 to-lime-600",
      sky: "from-sky-500 to-cyan-500",
      amber: "from-amber-500 to-orange-500",
      violet: "from-violet-500 to-fuchsia-500",
    };
    rCard.innerHTML = `
      <div class="flex items-start justify-between">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${toneColors[r.tone] ?? toneColors.emerald} text-white shadow-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" class="w-6 h-6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        </div>
        <span class="rounded-full bg-[#f5ede3] px-2.5 py-0.5 text-[11px] font-bold text-[#9a7b65] dark:bg-white/10 dark:text-[#e6b87a]">${r.size}</span>
      </div>
      <div>
        <div class="flex items-center gap-2">
          <h3 class="text-sm font-extrabold text-[#2f281f] dark:text-[#f5ede3]">${r.title}</h3>
          <span class="rounded-full px-2 py-0.5 text-[10px] font-bold ${r.type === "فروش" ? "bg-emerald-100 text-emerald-700" : r.type === "مشتریان" ? "bg-sky-100 text-sky-700" : r.type === "موجودی" ? "bg-amber-100 text-amber-700" : "bg-violet-100 text-violet-700"}">${r.type}</span>
        </div>
        <p class="mt-2 text-xs leading-6 text-[#7a6655] dark:text-[#b09080]">${r.summary}</p>
      </div>
      <div class="mt-auto flex items-center justify-between border-t border-[#f5ede3] pt-3 dark:border-white/5">
        <span class="text-xs text-[#9a7b65]">تاریخ: ${r.date}</span>
        <button class="report-download text-xs font-bold text-[#7b8f3b] hover:underline flex items-center gap-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-3.5 h-3.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          دانلود گزارش
        </button>
      </div>
    `;
    rCard.querySelector(".report-download").addEventListener("click", () => {
      showToast(`گزارش «${r.title}» آماده دانلود شد.`, "success");
    });
    grid.appendChild(rCard);
  });
  wrap.appendChild(grid);

  return wrap;
}
