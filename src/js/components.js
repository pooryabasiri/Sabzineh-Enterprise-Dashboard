/* سبزینه — Shared UI Components */

/* Card Style */
const card =
  "rounded-2xl border border-white/70 bg-white/85 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#1f1c19]/92";

/* Form Input Styles */
const inpCls =
  "w-full rounded-xl border border-[#eadfce] bg-white/80 p-3 text-sm font-medium outline-none transition focus:border-[#7b8f3b] dark:border-white/10 dark:bg-white/5 dark:text-white";
const lblCls =
  "mb-1 block text-xs font-bold text-[#7a6655] dark:text-[#c4aa96]";

/* Stat Card */
function renderStatCard({ title, value, trend, isPos, iconBg, iconSvg }) {
  const trendCls = isPos
    ? "bg-emerald-100 text-emerald-700"
    : "bg-rose-100 text-rose-700";
  const arrowPath = isPos
    ? `<polyline points="18 15 12 9 6 15"/>`
    : `<polyline points="6 9 12 15 18 9"/>`;
  const el = document.createElement("div");
  el.className = `${card} p-5`;
  el.innerHTML = `
    <div class="mb-4 flex items-center justify-between gap-3">
      <div class="flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}">
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" class="w-5 h-5">${iconSvg}</svg>
      </div>
      <span class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${trendCls}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" class="w-3 h-3">${arrowPath}</svg>
        ${trend}
      </span>
    </div>
    <div class="text-2xl font-extrabold tracking-tight text-[#2f281f] dark:text-[#f5ede3] sm:text-[1.65rem]">${value}</div>
    <p class="mt-1.5 text-xs font-medium text-[#9a7b65] dark:text-[#b09080]">${title}</p>
  `;
  return el;
}

/* SIDEBAR */
function renderSidebar() {
  const prof = store.profile;
  const unreadCount = store.messages.filter(m => m.unread).length;
  const pendingOrders = store.orders.filter(o => o.status !== "تحویل شده").length;
  const open = appState.sidebarOpen;
  const dark = appState.theme === "dark";

  const sidebar = document.createElement("aside");
  sidebar.id = "sidebar";
  sidebar.className = `fixed right-0 top-0 z-50 flex h-full w-[88vw] max-w-[280px] flex-col border-l border-[#e8d9c8]/70 bg-[#f8f2ea]/96 backdrop-blur-2xl transition-transform duration-300 ${dark ? "dark:border-white/10 dark:bg-[#1b1715]/96" : ""} lg:w-72 ${open ? "translate-x-0 shadow-2xl" : "translate-x-full lg:translate-x-0"}`;

  // Logo
  const logo = document.createElement("div");
  logo.className = "flex items-center justify-between border-b border-[#e8d9c8] px-5 py-2.5 min-h-16 dark:border-white/10";
  logo.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-[#7b8f3b] to-[#5f7f68] shadow-md shadow-[#7b8f3b]/20">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-6 h-6">
              <path d="M12 3c-2.5 3.5-6 5.5-6 9a6 6 0 0 0 12 0c0-3.5-3.5-5.5-6-9z"/>
            </svg>
      </div>
      <div>
        <h1 class="text-base font-extrabold tracking-tight text-[#2f281f] dark:text-[#f5ede3]">سبزینه</h1>
        <p class="text-[11px] font-medium text-[#9a7b65] dark:text-[#b09080]">پنل مدیریت هوشمند</p>
      </div>
    </div>
    <button id="sidebar-close" class="rounded-xl p-2 text-[#9a7b65] hover:bg-[#eadfce] dark:text-[#b09080] dark:hover:bg-white/10 lg:hidden">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-5 h-5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  `;
  sidebar.appendChild(logo);

  // Navigation
  const nav = document.createElement("div");
  nav.className = "flex-1 overflow-y-auto px-3 py-4 space-y-6";

  const groups = [
    { key: "main", label: "منوی اصلی" },
    { key: "ops", label: "ابزارها" },
  ];

  groups.forEach(({ key, label }) => {
    const groupDiv = document.createElement("div");
    groupDiv.innerHTML = `<p class="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-[#b09080] dark:text-[#8f7060]">${label}</p>`;
    const items = pagesMeta.filter(p => p.group === key);
    items.forEach(p => {
      const isActive = appState.page === p.id;
      let badge = 0;
      if (p.id === "orders") badge = pendingOrders;
      if (p.id === "messages") badge = unreadCount;
      const btn = document.createElement("button");
      btn.className = `flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-right text-sm font-semibold transition-all duration-150 ${isActive
        ? "bg-white text-[#2f281f] shadow-sm font-bold dark:bg-white/12 dark:text-white"
        : "text-[#7a6655] hover:bg-white/70 hover:text-[#2f281f] dark:text-[#c4aa96] dark:hover:bg-white/10 dark:hover:text-white"
        }`;
      btn.innerHTML = `
        <span class="flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${isActive
          ? "bg-[#eef3df] text-[#7b8f3b] dark:bg-[#26301b] dark:text-[#c5e08a]"
          : "bg-[#f5ede3]/80 text-[#9a7b65] dark:bg-white/10 dark:text-[#a8907c]"
        }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">${pageIcons[p.id] ?? ""}</svg>
        </span>
        <span class="flex-1 truncate">${p.label}</span>
        ${badge > 0 ? `<span class="rounded-full bg-[#f3e8d8] px-2 py-0.5 text-[11px] font-bold text-[#946c42] dark:bg-[#2a231e] dark:text-[#e6b87a]">${formatNumber(badge)}</span>` : ""}
      `;
      btn.addEventListener("click", () => navigateTo(p.id));
      groupDiv.appendChild(btn);
    });
    nav.appendChild(groupDiv);
  });
  sidebar.appendChild(nav);

  // Profile section
  const profileDiv = document.createElement("div");
  profileDiv.className = "border-t border-[#e8d9c8] p-3 dark:border-white/10";
  profileDiv.innerHTML = `
    <button id="sidebar-profile-btn" class="flex w-full items-center gap-3 rounded-2xl bg-white/60 p-3 text-right transition hover:bg-white dark:bg-white/5 dark:hover:bg-white/10">
      <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#7b8f3b] to-[#5f7f68] text-sm font-bold text-white shadow-sm">${prof.firstName.charAt(0)}</div>
      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-bold text-[#2f281f] dark:text-white">${prof.firstName} ${prof.lastName}</p>
        <p class="truncate text-[11px] text-[#9a7b65] dark:text-[#b09080]">${prof.role}</p>
      </div>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" class="w-4 h-4 text-[#9a7b65]"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    </button>
  `;
  sidebar.appendChild(profileDiv);

  // Event handlers
  sidebar.querySelector("#sidebar-close")?.addEventListener("click", () => {
    appState.sidebarOpen = false;
    render();
  });
  sidebar.querySelector("#sidebar-profile-btn")?.addEventListener("click", () => navigateTo("settings"));

  return sidebar;
}

/* HEADER */
function renderHeader() {
  const pageLabel = pagesMeta.find(p => p.id === appState.page)?.label ?? "داشبورد";
  const todayStr = new Intl.DateTimeFormat("fa-IR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  }).format(new Date());
  const notifCount = store.notifications.length;
  const dark = appState.theme === "dark";

  const header = document.createElement("header");
  header.className =
    "sticky top-0 z-30 border-b border-[#eadfce]/80 bg-[#faf7f2]/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#161412]/90";
  header.innerHTML = `
    <div class="flex min-h-16 items-center justify-between gap-3 px-4 py-2 sm:px-6">
      <div class="flex items-center gap-3 min-w-0">
        <button id="hamburger" class="rounded-xl border border-[#eadfce] bg-white/80 p-2 text-[#7a6655] hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-[#c4aa96] lg:hidden">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-5 h-5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <div class="min-w-0">
          <h1 class="truncate text-base font-extrabold text-[#2f281f] dark:text-[#f5ede3] sm:text-lg">${pageLabel}</h1>
          <p class="hidden text-xs text-[#9a7b65] dark:text-[#b09080] sm:block">${todayStr}</p>
        </div>
      </div>
      <div class="hidden max-w-sm flex-1 md:block">
        <div class="relative">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a7b65]"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input id="header-search" value="${appState.searchQuery}" placeholder="جستجو در پنل..." class="w-full rounded-xl border border-[#eadfce] bg-white/80 py-2.5 pl-20 pr-10 text-sm font-medium text-[#2f281f] outline-none transition focus:border-[#7b8f3b] dark:border-white/10 dark:bg-white/5 dark:text-white placeholder:text-[#b09080]"/>
          <button id="ctrl-k-btn" class="absolute left-2 top-1/2 -translate-y-1/2 rounded-lg bg-[#f5ede3] px-2 py-0.5 text-[10px] font-bold text-[#9a7b65] hover:bg-[#eadfce] dark:bg-white/10 dark:text-[#b09080]">Ctrl+K</button>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button id="mobile-search-btn" class="rounded-xl border border-[#eadfce] bg-white/80 p-2 text-[#7a6655] hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-[#c4aa96] md:hidden">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-5 h-5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
        <button id="notif-btn" class="relative rounded-xl border border-[#eadfce] bg-white/80 p-2 text-[#7a6655] hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-[#c4aa96]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-5 h-5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          ${notifCount > 0 ? `<span class="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm">${formatNumber(notifCount)}</span>` : ""}
        </button>
      </div>
    </div>
  `;

  // Event handlers
  header.querySelector("#hamburger").addEventListener("click", () => {
    appState.sidebarOpen = !appState.sidebarOpen;
    render();
  });
  // header.querySelector("#theme-toggle").addEventListener("click", toggleTheme);
  header.querySelector("#notif-btn").addEventListener("click", () => openModal({ type: "notifications" }));
  header.querySelector("#ctrl-k-btn").addEventListener("click", () => openModal({ type: "global-search" }));
  header.querySelector("#mobile-search-btn").addEventListener("click", () => openModal({ type: "global-search" }));

  const searchInput = header.querySelector("#header-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      appState.searchQuery = e.target.value;
      renderPage();
    });
  }

  return header;
}

/* FOOTER */
function renderFooter() {
  const el = document.createElement("footer");
  el.className =
    "mt-auto border-t border-[#eadfce]/80 px-4 py-4 dark:border-white/10 sm:px-6";
  el.innerHTML = `
    <div class="flex flex-col items-center justify-between gap-2 text-xs text-[#9a7b65] dark:text-[#b09080] sm:flex-row">
      <p class="font-medium">© ۱۴۰۵ سبزینه — داشبورد مدیریت هوشمند فروشگاه</p>
      <div class="flex items-center gap-4 font-semibold">
        <span class="flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Vanilla JS</span>
        <span class="flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-[#7b8f3b]"></span>Tailwind CSS v4</span>
        <span class="flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-[#d28b45]"></span>Chart.js & Swiper</span>
      </div>
    </div>
  `;
  return el;
}

/* TOAST NOTIFICATIONS */
function renderToast() {
  let toastEl = document.getElementById("toast-container");
  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.id = "toast-container";
    toastEl.className = "fixed bottom-5 left-5 z-[70]";
    document.body.appendChild(toastEl);
  }
  if (!appState.toast) {
    toastEl.innerHTML = "";
    return;
  }

  const t = appState.toast;
  const configs = {
    success: {
      bg: "bg-emerald-600",
      icon: `<polyline points="20 6 9 17 4 12"/>`,
    },
    warning: {
      bg: "bg-amber-500",
      icon: `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/>`,
    },
    error: {
      bg: "bg-rose-600",
      icon: `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`,
    },
    info: {
      bg: "bg-[#2f281f]",
      icon: `<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`,
    },
  };
  const cfg = configs[t.type] ?? configs.success;

  toastEl.innerHTML = `
    <div class="flex items-center gap-2.5 rounded-2xl px-4 py-3 text-sm font-bold text-white shadow-2xl ${cfg.bg} animate-fadeInUp">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" class="w-4 h-4">${cfg.icon}</svg>
      <span>${t.message}</span>
    </div>
  `;
}

/* MODAL SYSTEM - REWRITTEN  پشتیبانی کامل از افزودن و ویرایش رویداد */

// باز کردن مودال با تعیین نوع و داده‌های ورودی
function openModal(m) {
  appState.modal = m;
  renderModal();
}

// بستن مودال فعال
function closeModal() {
  appState.modal = null;
  const el = document.getElementById("modal-container");
  if (el) el.remove();
}

// رندر محتوای داخلی مودال بر اساس نوع درخواست شده
function renderModal() {
  let container = document.getElementById("modal-container");

  // حذف محتوای قبلی اگر وجود دارد
  if (container) container.remove();

  // اگر مودالی بسته باشد، چیزی نمایش نمی‌دهیم
  if (!appState.modal) return;

  // ساخت لایه پس‌زمینه تار
  container = document.createElement("div");
  container.id = "modal-container";
  container.className = "fixed inset-0 z-50 flex items-center justify-center p-4";
  container.innerHTML = `<div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>`;

  // بستن مودال با کلیک روی پس‌زمینه
  container.querySelector("div").addEventListener("click", closeModal);

  // باکس اصلی محتوای مودال
  const box = document.createElement("div");
  box.className =
    "relative z-10 w-full max-w-lg rounded-3xl border border-white/70 bg-[#fffefc] p-6 shadow-2xl dark:border-white/10 dark:bg-[#1f1c19] sm:p-8 animate-fadeInUp";

  const m = appState.modal;

  // تشخیص نوع مودال و فراخوانی سازنده مربوطه
  if (m.type === "add-product") buildProductModal(box, { mode: "add" });
  else if (m.type === "edit-product") buildProductModal(box, { mode: "edit", index: m.payload });
  else if (m.type === "order-details") buildOrderDetailsModal(box, m.payload);
  else if (m.type === "customer-history") buildCustomerHistoryModal(box, m.payload);
  else if (m.type === "add-event") buildEventModal(box, { mode: "add", day: m.payload });
  else if (m.type === "edit-event") buildEventModal(box, { mode: "edit", event: m.payload });
  else if (m.type === "global-search") buildGlobalSearchModal(box);
  else if (m.type === "notifications") buildNotificationsModal(box);

  container.appendChild(box);
  document.body.appendChild(container);
}

// تابع کمکی برای ایجاد هدر مودال
function modalHeader(box, title, subtitle) {
  const div = document.createElement("div");
  div.className =
    "flex items-start justify-between border-b border-[#e8d9c8] pb-4 dark:border-white/10";
  div.innerHTML = `
    <div>
      <h3 class="text-base font-extrabold text-[#2f281f] dark:text-[#f5ede3]">${title}</h3>
      ${subtitle ? `<p class="mt-0.5 text-xs text-[#9a7b65] dark:text-[#b09080]">${subtitle}</p>` : ""}
    </div>
    <button class="modal-close rounded-xl p-1.5 text-[#9a7b65] hover:bg-[#f5ede3] dark:text-[#b09080] dark:hover:bg-white/10 transition">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  `;
  box.appendChild(div);

  // هندل کردن دکمه بستن در هدر
  div.querySelector(".modal-close").addEventListener("click", closeModal);
}
/* Add Product Modal */
/* Product Modal (Add + Edit) */
function buildProductModal(box, options = {}) {
  const mode = options.mode || "add";
  const isEdit = mode === "edit";
  const index = Number(options.index);
  const product = isEdit ? store.products[index] : null;

  if (isEdit && !product) {
    showToast("محصول مورد نظر پیدا نشد.", "warning");
    closeModal();
    return;
  }

  const titleText = isEdit ? "ویرایش محصول" : "افزودن محصول جدید";
  const subText = isEdit
    ? "اطلاعات محصول و موجودی را ویرایش کنید"
    : "کالای جدید به انبار فروشگاه اضافه کنید";

  modalHeader(box, titleText, subText);

  const form = document.createElement("form");
  form.className = "mt-5 space-y-4";

  const currentTitle = product?.title ?? "";
  const currentCat = product?.category ?? Object.keys(categoryMeta)[0];
  const currentBadge = product?.badge ?? "جدید";
  const currentPrice = product?.price ?? 250000;
  const currentStock = product?.stock ?? 50;
  const currentRating = product?.rating ?? 5;
  const currentSales = product?.sales ?? 0;
  const currentGradient = product?.gradient ?? "from-emerald-500 to-lime-600";

  const gradients = [
    "from-emerald-500 to-lime-600",
    "from-amber-500 to-orange-500",
    "from-sky-500 to-cyan-500",
    "from-violet-500 to-fuchsia-500",
    "from-rose-500 to-pink-500",
    "from-teal-500 to-emerald-600",
  ];

  const badges = ["جدید", "پرفروش‌ترین", "محبوب مشتریان", "پیشنهاد ویژه", "موجودی کم"];

  form.innerHTML = `
    <div>
      <label class="${lblCls}">نام محصول</label>
      <input id="pm-title" required placeholder="مثلاً: زعفران نگین قائنات ارگانیک" class="${inpCls}" value="${currentTitle}"/>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <div>
        <label class="${lblCls}">دسته‌بندی</label>
        <select id="pm-cat" class="${inpCls}">
          ${Object.entries(categoryMeta).map(([k, v]) =>
    `<option value="${k}" ${k === currentCat ? "selected" : ""}>${v.label}</option>`
  ).join("")}
        </select>
      </div>
      <div>
        <label class="${lblCls}">برچسب</label>
        <select id="pm-badge" class="${inpCls}">
          ${badges.map(b =>
    `<option value="${b}" ${b === currentBadge ? "selected" : ""}>${b}</option>`
  ).join("")}
        </select>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <div>
        <label class="${lblCls}">قیمت (تومان)</label>
        <input id="pm-price" type="number" min="0" value="${currentPrice}" class="${inpCls}"/>
      </div>
      <div>
        <label class="${lblCls}">موجودی</label>
        <input id="pm-stock" type="number" min="0" value="${currentStock}" class="${inpCls}"/>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <div>
        <label class="${lblCls}">امتیاز (۰ تا ۵)</label>
        <input id="pm-rating" type="number" min="0" max="5" step="0.1" value="${currentRating}" class="${inpCls}"/>
      </div>
      <div>
        <label class="${lblCls}">فروش ماه جاری</label>
        <input id="pm-sales" type="number" min="0" value="${currentSales}" class="${inpCls}"/>
      </div>
    </div>

    <div>
      <label class="${lblCls}">گرادیان کارت</label>
      <select id="pm-gradient" class="${inpCls}">
        ${gradients.map(g =>
    `<option value="${g}" ${g === currentGradient ? "selected" : ""}>${g}</option>`
  ).join("")}
      </select>
    </div>

    <div class="flex flex-wrap items-center justify-between gap-2 border-t border-[#e8d9c8] pt-4 dark:border-white/10">
      <button type="button" class="modal-cancel rounded-xl border border-[#eadfce] px-5 py-2.5 text-sm font-semibold hover:bg-[#f5ede3] dark:border-white/10 dark:hover:bg-white/5">
        انصراف
      </button>

      <div class="flex flex-wrap gap-2">
        ${isEdit ? `
          <button type="button" id="pm-delete" class="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/30">
            حذف محصول
          </button>
        ` : ""}

        <button type="submit" class="rounded-xl bg-[#7b8f3b] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#6a7e32]">
          ${isEdit ? "ذخیره تغییرات" : "ثبت محصول"}
        </button>
      </div>
    </div>
  `;

  // انصراف
  form.querySelector(".modal-cancel").addEventListener("click", closeModal);

  // حذف از داخل مودال (فقط در حالت ویرایش)
  if (isEdit) {
    const delBtn = form.querySelector("#pm-delete");
    if (delBtn) {
      delBtn.addEventListener("click", () => {
        const ok = confirm(`آیا از حذف محصول «${product.title}» مطمئن هستید؟`);
        if (!ok) return;

        store.products.splice(index, 1);

        if (typeof store.save === "function") store.save();
        else if (typeof store.persist === "function") store.persist();

        showToast(`محصول «${product.title}» حذف شد.`, "warning");
        closeModal();
        navigateTo("products");
      });
    }
  }

  // ثبت / ویرایش
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = form.querySelector("#pm-title").value.trim();
    if (!title) {
      showToast("نام محصول را وارد کنید.", "warning");
      return;
    }

    const price = Number(form.querySelector("#pm-price").value) || 0;
    const stock = Number(form.querySelector("#pm-stock").value) || 0;
    const rating = Number(form.querySelector("#pm-rating").value) || 0;
    const sales = Number(form.querySelector("#pm-sales").value) || 0;
    const category = form.querySelector("#pm-cat").value;
    const badge = form.querySelector("#pm-badge").value;
    const gradient = form.querySelector("#pm-gradient").value;
    const mark = title.split(" ")[0].slice(0, 3);

    if (isEdit) {
      // ویرایش محصول موجود
      store.products[index] = {
        ...product,
        title,
        category,
        badge,
        price,
        stock,
        rating,
        sales,
        gradient,
        mark,
      };

      if (typeof store.save === "function") store.save();
      else if (typeof store.persist === "function") store.persist();

      showToast(`محصول «${title}» به‌روزرسانی شد.`, "success");
    } else {
      // افزودن محصول جدید
      const payload = {
        title,
        category,
        badge,
        price,
        stock,
        rating,
        sales,
        gradient,
        mark,
      };

      if (typeof store.addProduct === "function") {
        store.addProduct(payload);
      } else {
        store.products.push({
          id: Date.now(),
          ...payload,
        });
      }

      if (typeof store.save === "function") store.save();
      else if (typeof store.persist === "function") store.persist();

      showToast(`محصول «${title}» ثبت شد.`, "success");
    }

    closeModal();
    navigateTo("products");
  });

  box.appendChild(form);
}

/* Order Details Modal */
function buildOrderDetailsModal(box, orderId) {
  const order = store.orders.find(o => o.id === orderId);
  if (!order) return;
  const cust = getCustomerById(order.customerId);
  const prod = getProductById(order.productId);
  const statuses = ["تحویل شده", "در حال پردازش", "آماده ارسال", "نیازمند پیگیری"];

  const header = document.createElement("div");
  header.className = "flex items-start justify-between border-b border-[#e8d9c8] pb-4 dark:border-white/10";
  header.innerHTML = `
    <div>
      <span class="text-xs text-[#9a7b65]">جزئیات سفارش</span>
      <h3 class="text-base font-extrabold text-[#2f281f] dark:text-[#f5ede3]">${order.id}</h3>
    </div>
    <div class="flex items-center gap-2">
      <span class="rounded-full px-3 py-1 text-xs ${statusChip(order.status)}">${order.status}</span>
      <button class="modal-close rounded-xl p-1.5 text-[#9a7b65] hover:bg-[#f5ede3] dark:hover:bg-white/10 transition"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-5 h-5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
    </div>
  `;
  header.querySelector(".modal-close").addEventListener("click", closeModal);
  box.appendChild(header);

  const body = document.createElement("div");
  body.className = "mt-5 space-y-3 text-sm";
  body.innerHTML = `
    <div class="rounded-2xl bg-[#f8f4ed] p-4 dark:bg-white/5">
      <p class="text-xs text-[#9a7b65]">مشخصات خریدار</p>
      <p class="mt-1 font-bold text-[#2f281f] dark:text-white">${cust?.name ?? "کاربر مهمان"}</p>
      <p class="mt-0.5 text-xs text-[#7a6655] dark:text-[#b09080]">${cust?.phone ?? ""} • ${order.city} • ${cust?.email ?? ""}</p>
    </div>
    <div class="rounded-2xl border border-[#efe3d5] p-4 dark:border-white/10">
      <p class="text-xs text-[#9a7b65]">محصول سفارش داده شده</p>
      <p class="mt-1 font-bold">${prod?.title ?? "محصول نامشخص"}</p>
      <div class="mt-2 flex justify-between text-xs">
        <span class="text-[#9a7b65]">کانال: ${order.channel}</span>
        <span class="font-bold text-[#7b8f3b]">${formatMoney(order.amount)}</span>
      </div>
    </div>
    <p class="text-xs text-[#9a7b65]">تاریخ ثبت: ${formatDateTime(order.createdAt)}</p>
  `;
  box.appendChild(body);

  const statusDiv = document.createElement("div");
  statusDiv.className = "mt-4 border-t border-[#e8d9c8] pt-4 dark:border-white/10";
  statusDiv.innerHTML = `<p class="mb-2 text-xs font-bold text-[#7a6655] dark:text-[#c4aa96]">تغییر وضعیت:</p>
    <div class="flex flex-wrap gap-2">
      ${statuses.map(s => `<button data-status="${s}" class="rounded-xl px-3 py-1.5 text-xs font-bold transition hover:opacity-80 ${statusChip(s)}">${s}</button>`).join("")}
    </div>`;
  statusDiv.querySelectorAll("[data-status]").forEach(btn => {
    btn.addEventListener("click", () => {
      store.updateOrderStatus(orderId, btn.dataset.status);
      showToast(`وضعیت ${orderId} به «${btn.dataset.status}» تغییر کرد.`, "success");
      closeModal();
      renderPage();
    });
  });
  box.appendChild(statusDiv);

  const footer = document.createElement("div");
  footer.className = "mt-4 flex justify-end";
  footer.innerHTML = `<button class="rounded-xl bg-[#2f281f] px-5 py-2 text-sm font-bold text-white hover:bg-black dark:bg-[#f5ede3] dark:text-[#1a1613]">بستن</button>`;
  footer.querySelector("button").addEventListener("click", closeModal);
  box.appendChild(footer);
}

/* Customer History Modal */
function buildCustomerHistoryModal(box, custId) {
  const cust = getCustomerById(custId);
  if (!cust) return;
  const custOrders = store.orders.filter(o => o.customerId === custId);

  const header = document.createElement("div");
  header.className = "flex items-start justify-between border-b border-[#e8d9c8] pb-4 dark:border-white/10";
  header.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${cust.gradient} font-bold text-white">${cust.initials}</div>
      <div>
        <h3 class="font-extrabold text-[#2f281f] dark:text-[#f5ede3]">${cust.name}</h3>
        <p class="text-xs text-[#9a7b65]">${cust.city} • ${cust.phone}</p>
      </div>
    </div>
    <button class="modal-close rounded-xl p-1.5 text-[#9a7b65] hover:bg-[#f5ede3] dark:hover:bg-white/10 transition"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-5 h-5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
  `;
  header.querySelector(".modal-close").addEventListener("click", closeModal);
  box.appendChild(header);

  const stats = document.createElement("div");
  stats.className = "mt-4 grid grid-cols-2 gap-3";
  stats.innerHTML = `
    <div class="rounded-2xl bg-[#f8f4ed] p-3 dark:bg-white/5">
      <p class="text-xs text-[#9a7b65]">تعداد سفارشات</p>
      <p class="mt-1 text-xl font-extrabold">${cust.orders} سفارش</p>
    </div>
    <div class="rounded-2xl bg-[#f8f4ed] p-3 dark:bg-white/5">
      <p class="text-xs text-[#9a7b65]">مجموع خرید</p>
      <p class="mt-1 text-xl font-extrabold text-[#7b8f3b]">${formatCompact(cust.totalSpent)}</p>
    </div>
  `;
  box.appendChild(stats);

  const histDiv = document.createElement("div");
  histDiv.className = "mt-4";
  histDiv.innerHTML = `<p class="mb-2 text-xs font-bold text-[#7a6655]">تاریخچه سفارشات:</p>
    <div class="max-h-52 overflow-y-auto space-y-2">
      ${custOrders.length
      ? custOrders.map(o => {
        const p = getProductById(o.productId);
        return `<div class="flex items-center justify-between rounded-xl border border-[#efe3d5] p-2.5 text-xs dark:border-white/10">
              <div><p class="font-bold">${o.id}</p><p class="text-[#9a7b65] truncate max-w-40">${p?.title ?? "محصول"}</p></div>
              <div class="text-left"><p class="font-bold text-[#7b8f3b]">${formatMoney(o.amount)}</p><span class="rounded px-1.5 py-0.5 text-[10px] ${statusChip(o.status)}">${o.status}</span></div>
            </div>`;
      }).join("")
      : `<p class="py-6 text-center text-xs text-[#9a7b65]">سفارشی ثبت نشده است.</p>`}
    </div>`;
  box.appendChild(histDiv);

  const footer = document.createElement("div");
  footer.className = "mt-4 flex justify-end border-t border-[#e8d9c8] pt-4 dark:border-white/10";
  footer.innerHTML = `<button class="rounded-xl bg-[#2f281f] px-5 py-2 text-sm font-bold text-white hover:bg-black dark:bg-[#f5ede3] dark:text-[#1a1613]">بستن</button>`;
  footer.querySelector("button").addEventListener("click", closeModal);
  box.appendChild(footer);
}

/* EVENT MODAL (Unified Add/Edit System) */
function buildEventModal(box, options) {
  const { mode, event, day } = options;
  const isEdit = mode === "edit";
  const currentTitle = isEdit ? event.title : "";
  const currentTime = isEdit ? event.time : "۱۰:۰۰ تا ۱۱:۳۰";
  const currentLoc = isEdit ? event.location : "سالن جلسات سبزینه";
  const currentTone = isEdit ? event.tone : "emerald";
  const currentDay = isEdit ? event.jd : day;

  const titleText = isEdit ? "ویرایش رویداد" : "افزودن رویداد";
  const subText = isEdit ? "اطلاعات رویداد را ویرایش کنید" : "رویداد جدیدی به تقویم عملیاتی اضافه کنید";

  modalHeader(box, titleText, subText);
  const form = document.createElement("form");
  form.className = "mt-5 space-y-4";
  form.innerHTML = `
    <div>
      <label class="${lblCls}">عنوان رویداد</label>
      <input id="ev-title" required placeholder="مثلاً: هماهنگی تیم مارکتینگ" class="${inpCls}" value="${currentTitle}"/>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div>
        <label class="${lblCls}">روز ماه</label>
        <input id="ev-day" type="number" min="1" max="31" value="${currentDay}" class="${inpCls}"/>
      </div>
      <div>
        <label class="${lblCls}">رنگ رویداد</label>
        <select id="ev-tone" class="${inpCls}">
          <option value="emerald" ${currentTone === 'emerald' ? 'selected' : ''}>سبز — فروش</option>
          <option value="amber" ${currentTone === 'amber' ? 'selected' : ''}>نارنجی — تامین</option>
          <option value="sky" ${currentTone === 'sky' ? 'selected' : ''}>آبی — مارکتینگ</option>
          <option value="violet" ${currentTone === 'violet' ? 'selected' : ''}>بنفش — مالی</option>
          <option value="rose" ${currentTone === 'rose' ? 'selected' : ''}>قرمز — فوری</option>
        </select>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div>
        <label class="${lblCls}">ساعت برگزاری</label>
        <input id="ev-time" value="${currentTime}" class="${inpCls}"/>
      </div>
      <div>
        <label class="${lblCls}">محل برگزاری</label>
        <input id="ev-loc" value="${currentLoc}" class="${inpCls}"/>
      </div>
    </div>
    <div class="flex justify-between gap-2 border-t border-[#e8d9c8] pt-4 dark:border-white/10">
      <button type="button" class="modal-cancel rounded-xl border border-[#eadfce] px-5 py-2.5 text-sm font-semibold hover:bg-[#f5ede3] dark:border-white/10 dark:hover:bg-white/5">انصراف</button>
      ${isEdit
      ? `<button id="del-btn" type="button" class="rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/30">حذف</button>`
      : ''}
      <button type="submit" class="rounded-xl bg-[#7b8f3b] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#6a7e32]">${isEdit ? 'ذخیره تغییرات' : 'افزودن به تقویم'}</button>
    </div>
  `;

  // هندل دکمه بستن فرم
  form.querySelector(".modal-cancel").addEventListener("click", closeModal);

  // هندل دکمه حذف (فقط در حالت ادیت)
  if (isEdit) {
    const delBtn = form.querySelector("#del-btn");
    if (delBtn) {
      delBtn.addEventListener("click", () => {
        if (confirm("آیا واقعاً می‌خواهید این رویداد را حذف کنید؟")) {
          const evtIdx = event.idx || store.events.findIndex(e => e.jy === event.jy && e.jm === event.jm && e.jd === event.jd);
          if (evtIdx > -1) {
            store.events.splice(evtIdx, 1);
            showToast("رویداد با موفقیت حذف شد.", "warning");
            closeModal();
            _renderCalDays("cal-days");
            _updateEventsPanel();
          }
        }
      });
    }
  }

  // هندل سابمیت
  form.addEventListener("submit", e => {
    e.preventDefault();
    const title = form.querySelector("#ev-title").value.trim();
    if (!title) { showToast("عنوان رویداد را وارد کنید.", "warning"); return; }

    const eventData = {
      title,
      jy: isEdit ? event.jy : appState.calDate.jy,
      jm: isEdit ? event.jm : appState.calDate.jm,
      jd: Number(form.querySelector("#ev-day").value),
      time: form.querySelector("#ev-time").value,
      location: form.querySelector("#ev-loc").value,
      tone: form.querySelector("#ev-tone").value,
    };

    if (isEdit) {
      // بروزرسانی رویداد موجود
      const idx = store.events.findIndex(ev => ev.jy === eventData.jy && ev.jm === eventData.jm && ev.jd === eventData.jd);
      if (idx > -1) {
        store.events[idx] = eventData;
        showToast("تغییرات با موفقیت ذخیره شد.", "success");
      }
    } else {
      // افزودن رویداد جدید
      store.addEvent(eventData);
      showToast(`رویداد «${title}» به تقویم اضافه شد.`, "success");
    }

    closeModal();
    // رفرش صفحه تقویم
    if (window.navigateByRoute && window.navigateByRoute instanceof Function) {
      navigateTo("calendar");
    } else {
      _renderCalDays("cal-days");
      _updateEventsPanel();
    }
  });
  box.appendChild(form);
}

/* Global Search Modal */

function buildGlobalSearchModal(box) {
  const searchDiv = document.createElement("div");
  searchDiv.className = "flex items-center gap-3 border-b border-[#e8d9c8] pb-3 dark:border-white/10";
  searchDiv.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-5 h-5 text-[#9a7b65] shrink-0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <input id="gs-input" placeholder="جستجو در سفارشات، مشتریان، محصولات..." class="flex-1 bg-transparent text-base font-medium outline-none text-[#2f281f] dark:text-white placeholder:text-[#b09080]"/>
    <button id="gs-esc" class="rounded-lg bg-[#f5ede3] px-2 py-0.5 text-[10px] font-bold text-[#9a7b65] dark:bg-white/10">ESC</button>
  `;
  box.appendChild(searchDiv);

  const results = document.createElement("div");
  results.className = "mt-4 max-h-72 overflow-y-auto";
  results.innerHTML = `<p class="py-8 text-center text-sm text-[#9a7b65]">برای شروع جستجو، عبارتی تایپ کنید...</p>`;
  box.appendChild(results);

  const footerDiv = document.createElement("div");
  footerDiv.className = "mt-3 border-t border-[#e8d9c8] pt-3 flex justify-between text-[11px] text-[#b09080] dark:border-white/10";
  footerDiv.innerHTML = `<span>Enter برای انتخاب</span><span>سبزینه داشبورد</span>`;
  box.appendChild(footerDiv);

  searchDiv.querySelector("#gs-esc").addEventListener("click", closeModal);

  const input = searchDiv.querySelector("#gs-input");
  setTimeout(() => input.focus(), 50);

  input.addEventListener("input", () => {
    const q = input.value.toLowerCase().trim();
    if (!q) {
      results.innerHTML = `<p class="py-8 text-center text-sm text-[#9a7b65]">برای شروع جستجو، عبارتی تایپ کنید...</p>`;
      return;
    }
    const prods = store.products.filter(p => p.title.toLowerCase().includes(q) || p.badge.toLowerCase().includes(q)).slice(0, 3);
    const custs = store.customers.filter(c => c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q)).slice(0, 3);
    const ords = store.orders.filter(o => o.id.toLowerCase().includes(q) || o.city.toLowerCase().includes(q)).slice(0, 3);

    if (!prods.length && !custs.length && !ords.length) {
      results.innerHTML = `<p class="py-8 text-center text-sm text-[#9a7b65]">نتیجه‌ای یافت نشد.</p>`;
      return;
    }
    results.innerHTML = "";
    if (prods.length) {
      const sec = document.createElement("div");
      sec.className = "mb-3";
      sec.innerHTML = `<p class="px-2 pb-1 text-[11px] font-bold text-[#b09080]">محصولات</p>`;
      prods.forEach(p => {
        const btn = document.createElement("button");
        btn.className = "flex w-full items-center justify-between rounded-xl p-2.5 text-right hover:bg-[#f5ede3] dark:hover:bg-white/5";
        btn.innerHTML = `<span class="text-sm font-semibold">${p.title}</span><span class="text-xs text-[#7b8f3b] font-bold">${formatCompact(p.price)}</span>`;
        btn.addEventListener("click", () => { closeModal(); navigateTo("products"); });
        sec.appendChild(btn);
      });
      results.appendChild(sec);
    }
    if (custs.length) {
      const sec = document.createElement("div");
      sec.className = "mb-3";
      sec.innerHTML = `<p class="px-2 pb-1 text-[11px] font-bold text-[#b09080]">مشتریان</p>`;
      custs.forEach(c => {
        const btn = document.createElement("button");
        btn.className = "flex w-full items-center justify-between rounded-xl p-2.5 text-right hover:bg-[#f5ede3] dark:hover:bg-white/5";
        btn.innerHTML = `<span class="text-sm font-semibold">${c.name}</span><span class="text-xs text-[#9a7b65]">${c.city}</span>`;
        btn.addEventListener("click", () => { closeModal(); navigateTo("customers"); });
        sec.appendChild(btn);
      });
      results.appendChild(sec);
    }
    if (ords.length) {
      const sec = document.createElement("div");
      sec.className = "mb-3";
      sec.innerHTML = `<p class="px-2 pb-1 text-[11px] font-bold text-[#b09080]">سفارشات</p>`;
      ords.forEach(o => {
        const btn = document.createElement("button");
        btn.className = "flex w-full items-center justify-between rounded-xl p-2.5 text-right hover:bg-[#f5ede3] dark:hover:bg-white/5";
        btn.innerHTML = `<span class="text-sm font-semibold">${o.id}</span><span class="text-xs text-[#9a7b65]">${o.city}</span>`;
        btn.addEventListener("click", () => { closeModal(); openModal({ type: "order-details", payload: o.id }); });
        sec.appendChild(btn);
      });
      results.appendChild(sec);
    }
  });
}

/* Notifications Modal */
function buildNotificationsModal(box) {
  modalHeader(box, "اعلان‌ها", `${store.notifications.length} اعلان فعال`);
  const list = document.createElement("div");
  list.className = "mt-5 space-y-3 max-h-80 overflow-y-auto";

  if (store.notifications.length) {
    store.notifications.forEach(n => {
      const item = document.createElement("div");
      item.className = `rounded-2xl p-4 text-white ${n.tone}`;
      item.innerHTML = `
        <div class="flex items-start justify-between">
          <h4 class="text-sm font-bold">${n.title}</h4>
          <span class="text-[10px] opacity-80 shrink-0">${n.time}</span>
        </div>
        <p class="mt-1 text-xs leading-6 opacity-90">${n.body}</p>
      `;
      list.appendChild(item);
    });
  } else {
    list.innerHTML = `<p class="py-8 text-center text-sm text-[#9a7b65]">اعلانی وجود ندارد.</p>`;
  }
  box.appendChild(list);

  const footer = document.createElement("div");
  footer.className = "mt-4 flex justify-end border-t border-[#e8d9c8] pt-4 dark:border-white/10";
  footer.innerHTML = `<button class="rounded-xl bg-[#2f281f] px-5 py-2 text-sm font-bold text-white hover:bg-black dark:bg-[#f5ede3] dark:text-[#1a1613]">بستن</button>`;
  footer.querySelector("button").addEventListener("click", closeModal);
  box.appendChild(footer);
}