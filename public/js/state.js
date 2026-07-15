/* App State */
const appState = {
  page: "dashboard",
  theme: (() => {
    const s = localStorage.getItem("sabzineh_theme");
    if (s === "dark" || s === "light") return s;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  })(),
  sidebarOpen: false,
  notifOpen: false,
  searchQuery: "",
  toast: null,
  toastTimer: null,
  modal: null,

  auth: {
    state: "locked",
    loading: false,
    user: null
  },

  ordersFilter: "همه",
  selectedMsgId: null,
  calDate: (() => {
    const { jy, jm } = window.jalaali.toJalaali(new Date());
    return { jy, jm }; // فقط سال/ماه شمسی
  })(),
  selectedDay: (() => window.jalaali.toJalaali(new Date()).jd)(),
};

/* Theme */
function applyTheme() {
  const root = document.documentElement;
  if (appState.theme === "dark") {
    root.classList.add("dark");
    document.body.classList.add("bg-[#161412]", "text-[#f5ede3]");
    document.body.classList.remove("bg-[#faf7f2]", "text-[#2f281f]");
  } else {
    root.classList.remove("dark");
    document.body.classList.add("bg-[#faf7f2]", "text-[#2f281f]");
    document.body.classList.remove("bg-[#161412]", "text-[#f5ede3]");
  }
  localStorage.setItem("sabzineh_theme", appState.theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", appState.theme === "dark" ? "#161412" : "#faf7f2");
  }
}

function toggleTheme() {
  appState.theme = appState.theme === "dark" ? "light" : "dark";
  applyTheme();
  render();
}

/* Toast Notifications */
function showToast(message, type = "success") {
  appState.toast = { message, type, id: Date.now() };
  if (appState.toastTimer) clearTimeout(appState.toastTimer);
  renderToast();
  appState.toastTimer = setTimeout(() => {
    appState.toast = null;
    renderToast();
  }, 3500);
}

/* Navigation  */
function navigateTo(pageId) {
  if (!pagesMeta.some(p => p.id === pageId)) return;
  appState.page = pageId;
  appState.sidebarOpen = false;
  appState.notifOpen = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}
