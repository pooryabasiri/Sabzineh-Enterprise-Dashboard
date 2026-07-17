/* سبزینه — Authentication Overlay */

function renderAuthOverlay(wrapper) {

  // جلوگیری از ساخت دوباره
  if (document.getElementById("auth-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "auth-overlay";
  overlay.innerHTML = `
    <div class="auth-backdrop"></div>

    <div class="auth-shell z-2 w-[min(540px,100%)]">
      <div class="auth-card flex flex-col items-center w-full max-w-160 overflow-hidden text-[#f5ede3] 
      border border-white/5 backdrop-blur-[30px] bg-linear-to-b from-[#24201c]/95 to-[#1d1916]/92 shadow-[0_35px_120px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.04)]
          max-h-[95vh] lg:max-h-220 rounded-3xl md:rounded-4xl lg:rounded-[40px]
          pt-4 md:pt-6 lg:pt-8 pb-4 md:pb-6 lg:pb-8" id="auth-card">
          
        <!-- Status -->
        <div class="auth-status grid  grid-cols-[3fr_1fr] w-full gap-3 mb-8">
          
          <div class="auth-status flex items-center ms-2 md:ms-8">
          <span class="auth-status-dot w-2.5 h-2.5 rounded-full bg-[#7b8f3b] shadow-[0_0_0_0_rgba(123,143,59,.55)] animate-[authPulse_2.2s_infinite]"></span>
            <div class="ms-4">
            <p class="auth-status-title text-sm font-extrabold">سیستم آماده ورود </p>
            <p class="auth-status-sub text-xs opacity-70 mt-1">سیستم قفل است — برای ادامه وارد شوید</p>
            </div>
          </div>
          <div class="flex justify-end md:me-8">
            <div class="auth-logo w-12 md:w-16 h-12 md:h-16 rounded-2xl flex items-center justify-center text-[#b9d56b] border border-[rgba(123,143,59,.22)] bg-[linear-gradient(145deg,rgba(123,143,59,.18),rgba(123,143,59,.08))] shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_14px_40px_rgba(123,143,59,.15)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-6 h-6">
                <path d="M12 3c-2.5 3.5-6 5.5-6 9a6 6 0 0 0 12 0c0-3.5-3.5-5.5-6-9z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Header -->
        <div class="auth-header text-center mb-4">
          
          <h1 class="text-2xl md:text-4xl font-black tracking-[-.04em] mb-3">خوش آمدید</h1>
          <p class="max-w-68 mx-auto text-xs md:text-sm leading-loose opacity-[.58]">برای ورود به داشبورد هوشمند سبزینه، اطلاعات خود را وارد کنید</p>
        </div>

        <!-- Form -->
        <form id="auth-form" class="auth-form flex flex-col gap-4 w-[85%]" autocomplete="on">
          <div class="auth-field ">
            <label class="block text-xs font-bold mb-1.5 opacity-85" for="auth-email">ایمیل سازمانی</label>
            <input
              class="w-full rounded-2xl border border-white/10 bg-white/4 text-inherit py-3.5 px-4 outline-none transition duration-200"
              id="auth-email"
              type="email"
              placeholder="مثلاً guest@sabzineh.com"
              value="guest@sabzineh.com"
              required
            />
          </div>

          <div class="auth-field">
            <label class="block text-xs font-bold mb-1.5 opacity-85" for="auth-password">رمز عبور</label>
            <div class="auth-password-wrap relative mb-5">
              <input
                class="w-full rounded-2xl border border-white/10 bg-white/4 text-inherit py-3.5 px-4 pe-11 outline-none transition duration-200"
                id="auth-password"
                type="password"
                placeholder="رمز عبور"
                value="guest123"
                required
              />
              <button type="button" id="auth-toggle-pass" class="auth-eye absolute inset-e-3 top-1/2 -translate-y-1/2 border-none bg-transparent cursor-pointer opacity-70 hover:opacity-100 transition" aria-label="نمایش رمز">
                👁
              </button>
            </div>
          </div>

          <div class="auth-meta flex items-center justify-between gap-3 text-xs ">
            <label class="auth-remember inline-flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" id="auth-remember inline-flex items-center gap-1.5 cursor-pointer" checked />
              <span>مرا به خاطر بسپار</span>
            </label>
            <button type="button" class="auth-link hover:underline border-none bg-transparent text-[#7b8f3b] font-bold cursor-pointer text-xs transition hover:opacity-80" id="auth-forgot">فراموشی رمز عبور؟</button>
          </div>

          <div class="flex gap-x-4">
          <button type="submit" class="auth-btn-primary w-full h-12 rounded-2xl border-none py-[0.9rem] px-4 text-sm font-extrabold cursor-pointer transition duration-200 hover:scale-[1.02] active:scale-95" id="auth-submit">
            ورود به داشبورد
          </button>

          <button type="button" class="auth-btn-secondary w-full h-12 rounded-2xl border-none py-[0.9rem] px-4 text-sm font-extrabold cursor-pointer transition duration-200 hover:scale-[1.02] active:scale-95" id="auth-guest">
            ورود مهمان
          </button>
          </div>

        </form>

        <!-- Divider -->
        <div class="auth-divider flex items-center gap-3 mt-4 mb-3.5 text-xs opacity-60">
          <span>یا ورود با</span>
        </div>

        <!-- Social -->
        <div class="auth-social grid grid-cols-3 gap-2.5">
          <button type="button" class="auth-social-btn flex justify-center items-center rounded-xl border border-white/10 bg-white/3 text-inherit p-2.75 font-extrabold cursor-pointer transition duration-200 hover:bg-white/10" data-provider="apple">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M16.37 12.72c.02 2.48 2.17 3.31 2.19 3.32-.02.06-.34 1.17-1.12 2.31-.67.98-1.37 1.95-2.46 1.97-1.07.02-1.41-.64-2.64-.64-1.23 0-1.61.62-2.62.66-1.05.04-1.85-1.05-2.53-2.02-1.38-1.99-2.44-5.61-1.02-8.07.7-1.22 1.96-1.99 3.32-2.01 1.03-.02 2 .69 2.64.69.64 0 1.84-.85 3.1-.72.53.02 2.02.22 2.98 1.63-.08.05-1.78 1.04-1.76 3.08zM14.47 4.5c.56-.68.94-1.63.84-2.58-.81.03-1.79.54-2.37 1.22-.52.6-.98 1.56-.86 2.48.91.07 1.84-.46 2.39-1.12z"/>
            </svg>
          </button>
          <button type="button" class="auth-social-btn flex justify-center items-center rounded-xl border border-white/10 bg-white/3 text-inherit p-2.75 font-extrabold cursor-pointer transition duration-200 hover:bg-white/10" data-provider="github">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.69.08-.69 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.27 1.18-3.08-.12-.29-.51-1.47.11-3.07 0 0 .96-.31 3.14 1.18a10.9 10.9 0 0 1 5.72 0c2.18-1.49 3.14-1.18 3.14-1.18.62 1.6.23 2.78.11 3.07.73.81 1.18 1.83 1.18 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.77 1.08.77 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
            </svg>
          </button>
          <button type="button" class="auth-social-btn flex justify-center items-center rounded-xl border border-white/10 bg-white/3 text-inherit p-2.75 font-extrabold cursor-pointer transition duration-200 hover:bg-white/10" data-provider="google">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.6 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.3l-6.3-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.2C9.5 37.5 16.1 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.5-6.3 7.2l6.3 5.2C39.6 36.6 44 31 44 24c0-1.3-.1-2.3-.4-3.5z"/>
            </svg>
          </button>
        </div>

        <!-- Footer -->
        <div class="auth-footer mt-4 text-center">
          <button type="button" class="auth-link border-none bg-transparent text-[#7b8f3b] font-bold cursor-pointer text-xs transition hover:opacity-80" id="auth-request">درخواست دسترسی</button>
          <p class="mt-2 text-xs opacity-60 leading-relaxed">حساب عمومی ساخته نمی‌شود. دسترسی توسط مدیر سیستم صادر می‌شود.</p>
        </div>
      </div>
    </div>
  `;

  wrapper.appendChild(overlay);
  _bindAuthEvents();
}

/* Events */
function _bindAuthEvents() {
  const form = document.getElementById("auth-form");
  const passInput = document.getElementById("auth-password");
  const emailInput = document.getElementById("auth-email");
  const togglePass = document.getElementById("auth-toggle-pass");
  const guestBtn = document.getElementById("auth-guest");
  const forgotBtn = document.getElementById("auth-forgot");
  const requestBtn = document.getElementById("auth-request");
  const socialBtns = document.querySelectorAll(".auth-social-btn");

  // نمایش/مخفی کردن رمز
  if (togglePass && passInput) {
    togglePass.addEventListener("click", () => {
      const isPass = passInput.type === "password";
      passInput.type = isPass ? "text" : "password";
      togglePass.textContent = isPass ? "🙈" : "👁";
    });
  }

  // Submit فرم
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      _attemptLogin({ mode: "user" });
    });
  }

  // ورود مهمان
  if (guestBtn) {
    guestBtn.addEventListener("click", () => {
      _attemptLogin({ mode: "guest" });
    });
  }

  // فعلاً فقط Toast
  if (forgotBtn) {
    forgotBtn.addEventListener("click", () => {
      showToast("لینک بازیابی رمز به‌زودی فعال می‌شود.", "warning");
    });
  }

  if (requestBtn) {
    requestBtn.addEventListener("click", () => {
      showToast("درخواست دسترسی ثبت شد. مدیر سیستم بررسی می‌کند.", "success");
    });
  }

  socialBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const provider = btn.dataset.provider;
      showToast(`ورود با ${provider} به‌زودی فعال می‌شود.`, "warning");
    });
  });

  // شفاف‌تر شدن ملایم داشبورد هنگام تایپ
  _bindTypingClarity(emailInput, passInput);
}

/*  Typing clarity effect */
function _bindTypingClarity(emailInput, passInput) {
  const dashboard = document.getElementById("dashboard-wrapper");
  if (!dashboard || (!emailInput && !passInput)) return;

  const clear = () => dashboard.classList.add("auth-typing-clear");
  const maybeRestore = () => {
    const stillFocused =
      document.activeElement === emailInput ||
      document.activeElement === passInput;
    if (!stillFocused) {
      dashboard.classList.remove("auth-typing-clear");
    }
  };

  [emailInput, passInput].forEach((input) => {
    if (!input) return;
    input.addEventListener("focus", clear);
    input.addEventListener("input", clear);
    input.addEventListener("blur", () => setTimeout(maybeRestore, 0));
  });
}

/* Subtle parallax (mouse move) */
let _authParallaxHandler = null;

function _bindParallax() {
  if (_authParallaxHandler) return;
  const app = document.getElementById("app");
  if (!app) return;

  _authParallaxHandler = (e) => {
    const { innerWidth: w, innerHeight: h } = window;
    if (!w || !h) return;
    const x = (e.clientX / w - 0.5) * 2; // -1..1
    const y = (e.clientY / h - 0.5) * 2;
    const maxShift = 6; // px — very subtle, overlay stays stable

    app.style.setProperty("--auth-parallax-x", `${(x * maxShift).toFixed(2)}px`);
    app.style.setProperty("--auth-parallax-y", `${(y * maxShift).toFixed(2)}px`);
  };

  window.addEventListener("mousemove", _authParallaxHandler, { passive: true });
}

function _unbindParallax() {
  if (!_authParallaxHandler) return;
  window.removeEventListener("mousemove", _authParallaxHandler);
  _authParallaxHandler = null;

  const app = document.getElementById("app");
  app?.style.removeProperty("--auth-parallax-x");
  app?.style.removeProperty("--auth-parallax-y");
}

/* ── Login attempt ────────────────────────────── */
function _attemptLogin({ mode = "user" } = {}) {
  if (appState.auth.loading) return;

  const email = document.getElementById("auth-email")?.value.trim() || "";
  const password = document.getElementById("auth-password")?.value || "";
  const submitBtn = document.getElementById("auth-submit");
  const card = document.getElementById("auth-card");

  // اعتبارسنجی ساده
  if (mode === "user") {
    if (!email || !password) {
      card?.classList.add("auth-shake");
      setTimeout(() => card?.classList.remove("auth-shake"), 450);
      showToast("ایمیل و رمز عبور را وارد کنید.", "warning");
      return;
    }
  }

  appState.auth.loading = true;
  appState.auth.state = "unlocking";

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="auth-spinner inline-block w-3.5 h-3.5 rounded-full border-2 border-white/35 border-t-white ms-2 align-[-2px] animate-spin"></span> در حال ورود...`;
  }

  // شبیه‌سازی تأخیر ورود
  setTimeout(() => {
    appState.auth.loading = false;
    appState.auth.user = {
      email: mode === "guest" ? "guest@sabzineh.com" : email,
      role: mode === "guest" ? "guest" : "admin",
      name: mode === "guest" ? "کاربر مهمان" : "مدیر سیستم",
    };

    unlockDashboard();
  }, 900);
}

/* Unlock cinematic */
function unlockDashboard() {
  const dashboard = document.getElementById("dashboard-wrapper");
  const sidebar = document.getElementById("dashboard-sidebar");
  const header = document.getElementById("dashboard-header");
  const footer = document.getElementById("dashboard-footer");
  const surfaces = [dashboard, sidebar, header, footer].filter(Boolean);

  const overlay = document.getElementById("auth-overlay");
  const backdrop = overlay?.querySelector(".auth-backdrop");
  const card = document.getElementById("auth-card");

  // پارالاکس و افکت تایپ دیگر لازم نیستند
  dashboard?.classList.remove("auth-typing-clear");

  // اگر overlay نبود، مستقیم آزاد کن
  if (!overlay) {
    appState.auth.state = "unlocked";
    appState.auth.loading = false;
    surfaces.forEach((el) => {
      el.classList.remove("dashboard-locked-surface", "dashboard-unlocking-surface");
      el.classList.add("dashboard-active");
    });
    _persistAuthSession();
    renderLogoutControl(document.getElementById("app"));   // ← این خط اضافه شد
    render();
    return;
  }

  appState.auth.state = "unlocking";

  // 1) شروع بیدار شدن داشبورد (همه سطوح: سایدبار، هدر، wrapper، فوتر)
  surfaces.forEach((el) => {
    el.classList.remove("dashboard-locked-surface");
    el.classList.add("dashboard-unlocking-surface");
  });

  // 2) شروع محو شدن auth
  overlay.classList.add("auth-unlocking");
  card?.classList.add("auth-card-out");
  backdrop?.classList.add("auth-backdrop-out");

  // 3) فریم بعدی: active + wake sequence
  requestAnimationFrame(() => {
    surfaces.forEach((el) => el.classList.add("dashboard-active"));
    _playDashboardWakeSequence(dashboard);
  });

  // 4) پایان sequence
  setTimeout(() => {
    appState.auth.state = "unlocked";
    appState.auth.loading = false;

    // کلاس‌ها را تمیز کن (روی همه سطوح)
    surfaces.forEach((el) => {
      el.classList.remove("dashboard-locked-surface", "dashboard-unlocking-surface");
      el.classList.add("dashboard-active");
    });

    // session
    _persistAuthSession();

    // overlay را حذف کن
    overlay.remove();

    // toast
    showToast(`خوش آمدید ${appState.auth.user?.name || ""}`, "success");

    // اگر chartها نیاز به reflow دارند
    window.dispatchEvent(new Event("resize"));

    // دکمه‌ی خروج را همین الان بساز، منتظر رفرش نمان
    renderLogoutControl(document.getElementById("app"));
  }, 1100);
}

/*  Dashboard wake animations  */
function _playDashboardWakeSequence(dashboard) {
  if (!dashboard) return;

  // Sidebar
  const sidebar = document.querySelector("aside, #sidebar, .sidebar");
  sidebar?.classList.add("auth-wake-sidebar");

  // Header
  const header = dashboard.querySelector("header");
  header?.classList.add("auth-wake-header");

  // Cards / sections
  const cards = dashboard.querySelectorAll(
    ".page-transition > * > *, main > * > *, #main-content > * > *"
  );

  // فقط چند تا اول را animate کن تا سنگین نشود
  Array.from(cards).slice(0, 18).forEach((el, i) => {
    el.classList.add("auth-wake-item");
    el.style.setProperty("--wake-delay", `${80 + i * 45}ms`);
  });

  // Chart containers
  const charts = dashboard.querySelectorAll(
    ".chart-container, canvas, .swiper, [class*='chart']"
  );
  charts.forEach((el, i) => {
    el.classList.add("auth-wake-chart");
    el.style.setProperty("--wake-delay", `${180 + i * 70}ms`);
  });

  // Count-up for numbers (optional soft effect)
  _animateVisibleNumbers(dashboard);
}

/* Soft number count-up */
function _animateVisibleNumbers(root) {
  const nodes = root.querySelectorAll("h2, h3, p, span, strong");

  nodes.forEach((node) => {
    const text = (node.textContent || "").trim();

    // فقط اعداد ساده/compact مثل 12.4M یا 247
    const match = text.match(/^([\d۰-۹,.]+)([٪%+]?|[A-Za-z۰-۹]*)$/);
    if (!match) return;

    // اگر خیلی طولانی است رد کن
    if (text.length > 12) return;

    // فقط یک‌بار
    if (node.dataset.wakeCounted === "1") return;
    node.dataset.wakeCounted = "1";

    node.classList.add("auth-wake-number");
  });
}

/* Session  */
function _persistAuthSession() {
  try {
    localStorage.setItem(
      "sabzineh_auth",
      JSON.stringify({
        state: appState.auth.state,
        user: appState.auth.user,
      })
    );
  } catch (e) { }
}

function restoreAuthSession() {
  try {
    const raw = localStorage.getItem("sabzineh_auth");
    if (!raw) return;

    const data = JSON.parse(raw);
    if (data?.state === "unlocked" && data?.user) {
      appState.auth.state = "unlocked";
      appState.auth.user = data.user;
      appState.auth.loading = false;
    }
  } catch (e) { }
}

/* Lock (Logout) */
function lockDashboard() {
  appState.auth.state = "locked";
  appState.auth.user = null;
  appState.auth.loading = false;

  try {
    localStorage.removeItem("sabzineh_auth");
  } catch (e) { }

  _unbindParallax();

  // پاکسازی کلاس‌های wake
  document
    .querySelectorAll(
      ".auth-wake-sidebar, .auth-wake-header, .auth-wake-item, .auth-wake-chart, .auth-wake-number"
    )
    .forEach((el) => {
      el.classList.remove(
        "auth-wake-sidebar",
        "auth-wake-header",
        "auth-wake-item",
        "auth-wake-chart",
        "auth-wake-number"
      );
      if (el.dataset) delete el.dataset.wakeCounted;
    });

  render();
}

/* Floating Logout Control */
function renderLogoutControl(container) {
  const existing = document.getElementById("logout-control");
  if (existing) existing.remove();

  const control = document.createElement("button");
  control.id = "logout-control";
  control.type = "button";
  control.className = "logout-fab";
  control.setAttribute("aria-label", "خروج از سیستم");
  control.title = "خروج از سیستم";
  control.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="logout-fab-icon">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <path d="M16 17l5-5-5-5"/>
      <path d="M21 12H9"/>
    </svg>
  `;

  control.addEventListener("click", () => {
    _confirmLogout();
  });

  container.appendChild(control);
}

function _confirmLogout() {
  const ok = window.confirm("آیا مطمئن هستید که می‌خواهید از سیستم خارج شوید؟");
  if (ok) {
    lockDashboard();
  }
}

function _confirmLogout() {
  const ok = window.confirm("آیا مطمئن هستید که می‌خواهید از سیستم خارج شوید؟");
  if (ok) {
    lockDashboard();
  }
}