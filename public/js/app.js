/*سبزینه — Main Application Entry */

/* Render Engine */
function renderPage() {
  const mainEl = document.getElementById("main-content");
  if (!mainEl) return;

  // Destroy charts/swiper from previous page
  if (dashCharts.revenue) { try { dashCharts.revenue.destroy(); } catch (e) { } dashCharts.revenue = null; }
  if (dashCharts.category) { try { dashCharts.category.destroy(); } catch (e) { } dashCharts.category = null; }
  if (dashSwiper) { try { dashSwiper.destroy(true, true); } catch (e) { } dashSwiper = null; }
  if (analyticsCharts.visitor) { try { analyticsCharts.visitor.destroy(); } catch (e) { } analyticsCharts.visitor = null; }
  if (analyticsCharts.bar) { try { analyticsCharts.bar.destroy(); } catch (e) { } analyticsCharts.bar = null; }

  // Clean up analytics live interval
  if (typeof _liveInterval !== "undefined" && _liveInterval) {
    clearInterval(_liveInterval);
    _liveInterval = null;
  }

  const pageMap = {
    dashboard: renderDashboard,
    analytics: renderAnalytics,
    orders: renderOrders,
    products: renderProducts,
    customers: renderCustomers,
    messages: renderMessages,
    reports: renderReports,
    calendar: renderCalendar,
    settings: renderSettings,
  };

  mainEl.innerHTML = "";
  const pageEl = document.createElement("div");
  pageEl.className = "page-transition";
  const content = pageMap[appState.page] ? pageMap[appState.page]() : document.createElement("div");
  pageEl.appendChild(content);
  mainEl.appendChild(pageEl);
}

function render() {
  const app = document.getElementById("app");
  if (!app) return;
  app.innerHTML = "";

  // Sidebar overlay (mobile)
  if (appState.sidebarOpen) {
    const overlay = document.createElement("div");
    overlay.className = "sidebar-backdrop lg:hidden";
    overlay.addEventListener("click", () => {
      appState.sidebarOpen = false;
      render();
    });
    app.appendChild(overlay);
  }

  const sidebarEl = renderSidebar();
  sidebarEl.id = "dashboard-sidebar";

  if (appState.auth?.state === "locked") {
    sidebarEl.classList.add("dashboard-locked-surface");
  }
  app.appendChild(sidebarEl);
  const wrapper = document.createElement("div");
  wrapper.id = "dashboard-wrapper";
  wrapper.className = "min-h-screen lg:pr-70 flex flex-col";

  if (appState.auth?.state === "locked") {
    wrapper.classList.add("dashboard-locked-surface");
  }
  const headerEl = renderHeader();
  headerEl.id = "dashboard-header";
  if (appState.auth?.state === "locked") {
    headerEl.classList.add("dashboard-locked-surface");
  }
  wrapper.appendChild(headerEl);
  const main = document.createElement("main");
  main.id = "main-content";
  main.className = "flex-1 space-y-6 px-4 py-6 sm:px-6";
  wrapper.appendChild(main);
  const footerEl = renderFooter();
  footerEl.id = "dashboard-footer";
  if (appState.auth?.state === "locked") {
    footerEl.classList.add("dashboard-locked-surface");
  }
  wrapper.appendChild(footerEl);
  app.appendChild(wrapper);
  renderPage();
  if (appState.auth.state !== "unlocked") {
    renderAuthOverlay(app);
  }
  if (appState.auth.state === "unlocked") {
    renderLogoutControl(app);
  }
  renderToast();
}
/* Keyboard Shortcuts */
document.addEventListener("keydown", e => {
  const tag = document.activeElement?.tagName;
  if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;

  if (e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey))) {
    e.preventDefault();
    openModal({ type: "global-search" });
  }
  if (e.key === "Escape") {
    appState.sidebarOpen = false;
    appState.notifOpen = false;
    closeModal();
    render();
  }
});

/* Initialisation */
// Guard: make sure the auth slice always exists before the first render,
// even if the store module hasn't seeded it yet.
if (!appState.auth) {
  appState.auth = { state: "locked", user: null, loading: false };
}

// Check localStorage for an existing session BEFORE the first render,
// so a remembered user never sees the lock overlay flash on load.
restoreAuthSession();

// Apply saved theme
applyTheme();

// Subscribe to store changes for auto-render
store.subscribe(() => render());

// Initial render
render();