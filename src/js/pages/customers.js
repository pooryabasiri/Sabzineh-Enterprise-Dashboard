/* سبزینه — Customers & Loyalty Page */

function renderCustomers() {
  const q = appState.searchQuery.toLowerCase();
  const filtered = store.customers.filter(c => !q || [c.name, c.email, c.city, c.segment, c.status].some(v => String(v ?? "").toLowerCase().includes(q)));
  const vipCount = store.customers.filter(c => c.segment === "وفادار" || c.segment === "ارزشمند").length;
  const totalLtv = store.customers.reduce((a, c) => a + c.totalSpent, 0);

  const wrap = document.createElement("div");
  wrap.className = "space-y-6";

  // Summary
  const summary = document.createElement("div");
  summary.className = `${card} p-5`;
  summary.innerHTML = `
    <div class="grid gap-6 lg:grid-cols-2">
      <div>
        <h2 class="text-base font-extrabold text-[#2f281f] dark:text-[#f5ede3]">مشتریان و وفاداری</h2>
        <p class="mt-1 text-xs text-[#9a7b65]">تحلیل ارزش طول عمر مشتری (LTV) و سگمنت‌بندی هوشمند</p>
      </div>
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="rounded-2xl border border-[#efe3d5] bg-[#fffdfa] p-4 dark:border-white/10 dark:bg-white/5">
          <p class="text-xs font-medium text-[#9a7b65]">مشتریان VIP (وفادار + ارزشمند)</p>
          <p class="mt-2 text-2xl font-extrabold text-[#7b8f3b]">${formatNumber(vipCount)} کاربر</p>
        </div>
        <div class="rounded-2xl border border-[#efe3d5] bg-[#fffdfa] p-4 dark:border-white/10 dark:bg-white/5">
          <p class="text-xs font-medium text-[#9a7b65]">مجموع ارزش خرید اعضا</p>
          <p class="mt-2 text-2xl font-extrabold text-[#2f281f] dark:text-[#f5ede3]">${formatCompact(totalLtv)}</p>
        </div>
      </div>
    </div>
  `;
  wrap.appendChild(summary);

  // Customer grid
  const grid = document.createElement("div");
  grid.className = "grid gap-4 md:grid-cols-2 xl:grid-cols-3";
  if (filtered.length) {
    filtered.forEach(c => {
      const cCard = document.createElement("div");
      cCard.className = `${card} p-5 flex flex-col gap-4`;
      cCard.innerHTML = `
        <div class="flex items-start gap-3">
          <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${c.gradient} text-lg font-extrabold text-white shadow-sm">${c.initials}</div>
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="truncate text-sm font-extrabold text-[#2f281f] dark:text-[#f5ede3]">${c.name}</h3>
              <span class="rounded-full px-2 py-0.5 text-[10px] ${statusChip(c.segment)}">${c.segment}</span>
            </div>
            <p class="mt-0.5 text-xs text-[#7a6655] dark:text-[#b09080] truncate">${c.email}</p>
            <p class="text-xs text-[#9a7b65]">${c.city} • ${c.phone}</p>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-2 rounded-2xl bg-[#f8f4ed] p-3 dark:bg-white/5">
          <div><p class="text-[11px] text-[#9a7b65]">سفارشات</p><p class="mt-0.5 text-sm font-extrabold">${formatNumber(c.orders)}</p></div>
          <div><p class="text-[11px] text-[#9a7b65]">ارزش خرید</p><p class="mt-0.5 text-xs font-extrabold text-[#7b8f3b]">${formatCompact(c.totalSpent)}</p></div>
          <div><p class="text-[11px] text-[#9a7b65]">وضعیت</p><p class="mt-0.5 text-xs font-extrabold ${c.status === "فعال" ? "text-emerald-600" : "text-rose-600"}">${c.status}</p></div>
        </div>
        <div class="flex items-center justify-between border-t border-[#f5ede3] pt-3 dark:border-white/5 text-xs">
          <span class="text-[#9a7b65]">آخرین فعالیت: ${c.lastSeen}</span>
          <button class="history-btn font-bold text-[#7b8f3b] hover:underline flex items-center gap-1" data-custid="${c.id}">
            تاریخچه<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-3.5 h-3.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
        </div>
      `;
      cCard.querySelector(".history-btn").addEventListener("click", e => openModal({ type: "customer-history", payload: e.currentTarget.dataset.custid }));
      grid.appendChild(cCard);
    });
  } else {
    grid.innerHTML = `<div class="col-span-full py-12 text-center text-sm text-[#9a7b65]">مشتری‌ای یافت نشد.</div>`;
  }
  wrap.appendChild(grid);
  return wrap;
}
