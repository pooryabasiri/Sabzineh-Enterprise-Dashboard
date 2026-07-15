/* سبزینه — Products & Inventory Page  پشتیبانی کامل از افزودن / ویرایش / حذف محصول */

function renderProducts() {
  const q = appState.searchQuery.toLowerCase();

  const filtered = store.products.filter(p =>
    !q ||
    [p.title, categoryMeta[p.category]?.label, p.badge]
      .some(v => String(v ?? "").toLowerCase().includes(q))
  );

  const lowStock = store.products.filter(p => p.stock < 40).length;
  const avgRating = store.products.length
    ? (store.products.reduce((a, p) => a + p.rating, 0) / store.products.length).toFixed(1)
    : "5.0";
  const totalVal = store.products.reduce((a, p) => a + p.price * p.stock, 0);
  const maxSales = Math.max(1, ...store.products.map(p => p.sales || 0));

  const wrap = document.createElement("div");
  wrap.className = "space-y-6";

  // Stats
  const stats = document.createElement("div");
  stats.className = "grid gap-4 sm:grid-cols-2 xl:grid-cols-4";

  [
    {
      title: "تعداد کل محصولات",
      value: formatNumber(store.products.length),
      trend: "پایدار",
      isPos: true,
      iconBg: "bg-emerald-100 dark:bg-emerald-400/20",
      iconSvg: `<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>`,
    },
    {
      title: "کالاهای کم‌موجودی",
      value: formatNumber(lowStock),
      trend: "هشدار تامین",
      isPos: false,
      iconBg: "bg-rose-100 dark:bg-rose-400/20",
      iconSvg: `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`,
    },
    {
      title: "میانگین امتیاز رضایت",
      value: `${formatNumber(Number(avgRating))} ★`,
      trend: "بسیار عالی",
      isPos: true,
      iconBg: "bg-amber-100 dark:bg-amber-400/20",
      iconSvg: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
    },
    {
      title: "ارزش کل موجودی انبار",
      value: formatCompact(totalVal),
      trend: "سرمایه در گردش",
      isPos: true,
      iconBg: "bg-violet-100 dark:bg-violet-400/20",
      iconSvg: `<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>`,
    },
  ].forEach(sc => stats.appendChild(renderStatCard(sc)));

  wrap.appendChild(stats);

  // Top bar
  const topBar = document.createElement("div");
  topBar.className = `${card} p-5`;
  topBar.innerHTML = `
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <div>
        <h2 class="text-base font-extrabold text-[#2f281f] dark:text-[#f5ede3]">کاتالوگ محصولات و موجودی</h2>
        <p class="mt-0.5 text-xs text-[#9a7b65]">وضعیت فروش، قیمت و موجودی لحظه‌ای</p>
      </div>
      <button id="add-product-btn" class="inline-flex items-center gap-1.5 rounded-xl bg-[#7b8f3b] px-4 py-2 text-xs font-bold text-white hover:bg-[#6a7e32] transition">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" class="w-3.5 h-3.5">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        ثبت محصول جدید
      </button>
    </div>
  `;

  topBar.querySelector("#add-product-btn").addEventListener("click", () => {
    openModal({ type: "add-product" });
  });

  wrap.appendChild(topBar);

  // Product grid 
  const grid = document.createElement("div");
  grid.className = "grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4";

  if (!filtered.length) {
    grid.innerHTML = `<div class="col-span-full py-12 text-center text-sm text-[#9a7b65]">محصولی یافت نشد.</div>`;
    wrap.appendChild(grid);
    return wrap;
  }

  filtered.forEach(p => {
    const index = store.products.indexOf(p);

    const pCard = document.createElement("div");
    pCard.className = `${card} group relative p-5 flex flex-col gap-4 overflow-hidden`;

    pCard.innerHTML = `
      <!-- دکمه‌های ویرایش / حذف -->
      <div class="absolute left-3 top-3 z-10 flex gap-1.5 opacity-0 transition duration-200 group-hover:opacity-100">
        <button
          type="button"
          class="edit-product flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 shadow-sm border border-[#eadfce] text-[#7a6655] hover:bg-[#f5ede3] dark:bg-[#25211d] dark:border-white/10 dark:text-[#c4aa96] dark:hover:bg-[#2f281f] transition"
          data-index="${index}"
          title="ویرایش محصول">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
          </svg>
        </button>

        <button
          type="button"
          class="delete-product flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 shadow-sm border border-red-200 text-red-600 hover:bg-red-50 dark:bg-[#25211d] dark:border-red-900/40 dark:text-red-400 dark:hover:bg-red-900/20 transition"
          data-index="${index}"
          title="حذف محصول">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14H6L5 6"/>
            <path d="M10 11v6"/>
            <path d="M14 11v6"/>
            <path d="M9 6V4h6v2"/>
          </svg>
        </button>
      </div>

      <div class="flex aspect-square items-center justify-center rounded-2xl bg-linear-to-br ${p.gradient} text-3xl font-extrabold text-white shadow-sm">
        ${p.mark}
      </div>

      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0">
          <span class="rounded-full bg-[#f5ede3] px-2 py-0.5 text-[10px] font-bold text-[#9a7b65] dark:bg-white/10 dark:text-[#e6b87a]">
            ${p.badge}
          </span>
          <h3 class="mt-2 text-sm font-bold leading-6 text-[#2f281f] dark:text-[#f5ede3]">
            ${p.title}
          </h3>
          <p class="text-xs text-[#9a7b65]">
            ${categoryMeta[p.category]?.label ?? "بدون دسته"}
          </p>
        </div>

        <div class="flex items-start gap-2 shrink-0">

    ${p.stock < 40
        ? `
      <div class="stock-alert" title="نیاز به تامین موجودی">
          <svg viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-4 h-4">
              <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.53 21h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
      </div>
      `
        : ""
      }

    <div class="rounded-xl bg-[#f8f4ed] px-2.5 py-2 text-center dark:bg-white/5">
        <p class="text-[10px] text-[#9a7b65]">
            امتیاز
        </p>

        <p class="mt-0.5 text-sm font-extrabold">
            ${formatNumber(p.rating)}
        </p>
    </div>

</div>
      </div>

      <div class="flex items-center justify-between border-t border-[#f5ede3] pt-3 dark:border-white/5 text-sm">
        <span class="font-bold text-[#7b8f3b]">${formatCompact(p.price)}</span>
        <span class="text-xs font-bold ${p.stock < 40 ? "text-rose-600" : "text-emerald-600"}">
          موجودی: ${formatNumber(p.stock)}
        </span>
      </div>

      <div>
        <div class="mb-1.5 flex justify-between text-xs text-[#9a7b65]">
          <span>فروش ماه جاری</span>
          <span class="font-bold">${formatNumber(p.sales)} واحد</span>
        </div>
        <div class="h-2 overflow-hidden rounded-full bg-[#f5ede3] dark:bg-white/10">
          <div
            class="h-full rounded-full bg-[#7b8f3b] transition-all duration-700"
            style="width:${Math.min(100, (p.sales / maxSales) * 100)}%">
          </div>
        </div>
      </div>

    `;

    // اتصال دکمه ویرایش
    const editBtn = pCard.querySelector(".edit-product");
    if (editBtn) {
      editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = Number(editBtn.dataset.index);
        openModal({
          type: "edit-product",
          payload: idx,
        });
      });
    }

    // اتصال دکمه حذف 
    const deleteBtn = pCard.querySelector(".delete-product");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = Number(deleteBtn.dataset.index);
        const product = store.products[idx];

        if (!product) return;

        const ok = confirm(`آیا از حذف محصول «${product.title}» مطمئن هستید؟`);
        if (!ok) return;

        // حذف از استور
        store.products.splice(idx, 1);

        // اگر store متد ذخیره‌سازی دارد
        if (typeof store.save === "function") {
          store.save();
        } else if (typeof store.persist === "function") {
          store.persist();
        }

        showToast(`محصول «${product.title}» حذف شد.`, "warning");
        navigateTo("products");
      });
    }

    grid.appendChild(pCard);
  });

  wrap.appendChild(grid);
  return wrap;
}