/* سبزینه — Orders Page */

function renderOrders() {
  const filterOptions = ["همه", "تحویل شده", "در حال پردازش", "آماده ارسال", "نیازمند پیگیری"];

  function getFiltered() {
    return store.orders.filter(o => {
      const c = getCustomerById(o.customerId);
      const p = getProductById(o.productId);
      const q = appState.searchQuery.toLowerCase();
      const matchesSearch = !q || [o.id, c?.name, p?.title, o.city, o.channel, o.status].some(v => String(v ?? "").toLowerCase().includes(q));
      return (appState.ordersFilter === "همه" || o.status === appState.ordersFilter) && matchesSearch;
    });
  }

  const wrap = document.createElement("div");
  wrap.className = "space-y-5";

  // Top bar 
  const topCard = document.createElement("div");
  topCard.className = `${card} p-5`;
  topCard.innerHTML = `
    <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <h2 class="text-base font-extrabold text-[#2f281f] dark:text-[#f5ede3]">مدیریت سفارشات فروشگاه</h2>
        <p class="mt-0.5 text-xs text-[#9a7b65]">جستجو، فیلتر و تغییر وضعیت فوری — با خروجی CSV</p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        ${filterOptions.map(f => `<button data-filter="${f}" class="filter-btn rounded-full px-3.5 py-1.5 text-xs font-bold transition ${appState.ordersFilter === f ? "bg-[#7b8f3b] text-white shadow-sm" : "bg-[#f5ede3] text-[#7a6655] hover:bg-[#eadfce] dark:bg-white/10 dark:text-[#c4aa96]"}">${f}</button>`).join("")}
        <button id="orders-csv" class="inline-flex items-center gap-1.5 rounded-xl bg-[#2f281f] px-4 py-1.5 text-xs font-bold text-white hover:bg-black dark:bg-[#f5ede3] dark:text-[#1a1613]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-3.5 h-3.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          CSV
        </button>
      </div>
    </div>
  `;
  topCard.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      appState.ordersFilter = btn.dataset.filter;
      renderPage();
    });
  });
  topCard.querySelector("#orders-csv").addEventListener("click", exportOrdersCSV);
  wrap.appendChild(topCard);

  // Table
  const tableCard = document.createElement("div");
  tableCard.className = `${card} p-5 overflow-hidden`;
  const filtered = getFiltered();
  tableCard.innerHTML = `
    <div class="overflow-x-auto">
      <table class="w-full min-w-215">
        <thead>
          <tr class="border-b border-[#efe3d5] text-right text-xs font-bold text-[#9a7b65] dark:border-white/10">
            ${["شناسه", "مشتری", "محصول", "کانال", "شهر", "مبلغ", "وضعیت", "تاریخ ثبت"].map(h => `<th class="pb-3 px-1 font-bold">${h}</th>`).join("")}
          </tr>
        </thead>
        <tbody class="divide-y divide-[#efe3d5] text-sm dark:divide-white/10">
          ${filtered.length
            ? filtered.map(o => {
                const c = getCustomerById(o.customerId);
                const p = getProductById(o.productId);
                return `<tr class="cursor-pointer hover:bg-[#fdfaf6] dark:hover:bg-white/5 transition order-row" data-orderid="${o.id}">
                  <td class="py-4 px-1 font-bold text-[#5e4e3c] dark:text-[#e7d7c8]">${o.id}</td>
                  <td class="py-4 px-1 font-semibold">${c?.name ?? "مهمان"}</td>
                  <td class="py-4 px-1 max-w-40 truncate text-[#7a6655] dark:text-[#b09080]">${p?.title ?? "-"}</td>
                  <td class="py-4 px-1 text-xs text-[#9a7b65]">${o.channel}</td>
                  <td class="py-4 px-1 text-[#7a6655] dark:text-[#b09080]">${o.city}</td>
                  <td class="py-4 px-1 font-semibold">${formatMoney(o.amount)}</td>
                  <td class="py-4 px-1"><span class="rounded-full px-2.5 py-1 text-xs ${statusChip(o.status)}">${o.status}</span></td>
                  <td class="py-4 px-1 text-xs text-[#9a7b65]">${formatDateTime(o.createdAt)}</td>
                </tr>`;
              }).join("")
            : `<tr><td colspan="8" class="py-12 text-center text-sm text-[#9a7b65]">سفارشی یافت نشد.</td></tr>`}
        </tbody>
      </table>
    </div>
  `;
  tableCard.querySelectorAll(".order-row").forEach(r => {
    r.addEventListener("click", () => openModal({ type: "order-details", payload: r.dataset.orderid }));
  });
  wrap.appendChild(tableCard);
  return wrap;
}
