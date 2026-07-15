/* سبزینه — Helper Utilities */

/* Formatting */
function formatNumber(n) {
  return new Intl.NumberFormat("fa-IR").format(n ?? 0);
}

function formatMoney(n) {
  return `${formatNumber(n)} تومان`;
}

function formatCompact(n) {
  if (n >= 1e9) return `${formatNumber(+(n / 1e9).toFixed(1))} میلیارد تومان`;
  if (n >= 1e6) return `${formatNumber(+(n / 1e6).toFixed(1))} میلیون تومان`;
  return formatMoney(n);
}

function formatShortDate(s) {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      day: "numeric",
      month: "short",
    }).format(new Date(s));
  } catch (e) {
    return s;
  }
}

function formatDateTime(s) {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(s));
  } catch (e) {
    return s;
  }
}

/* Status Chips */
function statusChip(s) {
  const m = {
    "تحویل شده":       "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300",
    "در حال پردازش":  "bg-amber-100 text-amber-800 ring-1 ring-amber-300",
    "آماده ارسال":    "bg-sky-100 text-sky-800 ring-1 ring-sky-300",
    "نیازمند پیگیری": "bg-rose-100 text-rose-800 ring-1 ring-rose-300",
    "وفادار":         "bg-emerald-100 text-emerald-800",
    "ارزشمند":        "bg-sky-100 text-sky-800",
    "در حال رشد":     "bg-amber-100 text-amber-800",
    "جدید":           "bg-violet-100 text-violet-800",
    "نیازمند توجه":   "bg-rose-100 text-rose-800",
    "عادی":           "bg-stone-100 text-stone-700",
    "مهم":            "bg-amber-100 text-amber-800",
    "فوری":           "bg-rose-100 text-rose-800",
  };
  return (m[s] ?? "bg-stone-100 text-stone-700") + " font-bold";
}

/* Tone Border */
function toneBorder(tone) {
  const m = {
    emerald: "border-r-4 border-emerald-500 bg-emerald-50 text-emerald-900",
    amber:   "border-r-4 border-amber-500 bg-amber-50 text-amber-900",
    rose:    "border-r-4 border-rose-500 bg-rose-50 text-rose-900",
    sky:     "border-r-4 border-sky-500 bg-sky-50 text-sky-900",
    violet:  "border-r-4 border-violet-500 bg-violet-50 text-violet-900",
  };
  return m[tone] ?? m.emerald;
}

/* Lookups */
function getCustomerById(id) {
  return store.customers.find(c => c.id === id);
}

function getProductById(id) {
  return store.products.find(p => p.id === id);
}

/* Dark Mode Detection */
function isDark() {
  return document.documentElement.classList.contains("dark");
}

/* Element Creation Helpers */
function h(tag, cls, ...children) {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  children.forEach(c => {
    if (c == null) return;
    if (typeof c === "string") el.insertAdjacentHTML("beforeend", c);
    else el.appendChild(c);
  });
  return el;
}

function svgIcon(path, cls = "w-5 h-5") {
  const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  s.setAttribute("viewBox", "0 0 24 24");
  s.setAttribute("fill", "none");
  s.setAttribute("stroke", "currentColor");
  s.setAttribute("stroke-width", "2");
  s.setAttribute("stroke-linecap", "round");
  s.setAttribute("stroke-linejoin", "round");
  s.setAttribute("class", cls);
  s.innerHTML = path;
  return s;
}

/* CSV Export (shared) */
function exportOrdersCSV() {
  const headers = ["شناسه", "مشتری", "محصول", "وضعیت", "مبلغ", "شهر", "کانال", "تاریخ"];
  const rows = store.orders.map(o => {
    const c = getCustomerById(o.customerId);
    const p = getProductById(o.productId);
    return [
      o.id,
      c?.name ?? "مهمان",
      p?.title ?? "-",
      o.status,
      String(o.amount),
      o.city,
      o.channel,
      o.createdAt,
    ];
  });
  const csv = [headers, ...rows]
    .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sabzineh-orders.csv";
  a.click();
  URL.revokeObjectURL(url);
  showToast("فایل CSV سفارشات دانلود شد.", "success");
}

/* Theme colors for charts */
function getChartColors() {
  const d = isDark();
  return {
    text:       d ? "#e2d6c8"           : "#5e4e3c",
    grid:       d ? "rgba(255,255,255,0.06)" : "rgba(94,78,60,0.08)",
    tooltipBg:  d ? "#231f1c"           : "#fffefc",
    tooltipTxt: d ? "#f5ede3"           : "#2f281f",
    border:     d ? "rgba(255,255,255,0.1)" : "rgba(94,78,60,0.15)",
  };
}
