/* سبزینه — System Settings Page */

function renderSettings() {
  const prof = store.profile;
  const wrap = document.createElement("div");
  wrap.className = "grid gap-6 xl:grid-cols-[1.4fr_1fr]";

  // Profile form
  const profileCard = document.createElement("div");
  profileCard.className = `${card} p-5 sm:p-6`;
  profileCard.innerHTML = `
    <div class="flex items-center gap-4 border-b border-[#efe3d5] pb-5 dark:border-white/10">
      <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-[#7b8f3b] to-[#5f7f68] text-2xl font-extrabold text-white shadow-md">${prof.firstName.charAt(0)}</div>
      <div>
        <h2 class="text-base font-extrabold text-[#2f281f] dark:text-[#f5ede3]">پروفایل مدیر سیستم</h2>
        <p class="mt-0.5 text-xs text-[#9a7b65]">اطلاعات ذخیره شونده در LocalStorage</p>
      </div>
    </div>
    <form id="profile-form" class="mt-6 space-y-4">
      <div class="grid gap-4 sm:grid-cols-2">
        <div><label class="${lblCls}">نام</label><input id="pf-fname" value="${prof.firstName}" class="${inpCls}"/></div>
        <div><label class="${lblCls}">نام خانوادگی</label><input id="pf-lname" value="${prof.lastName}" class="${inpCls}"/></div>
      </div>
      <div class="grid gap-4 sm:grid-cols-2">
        <div><label class="${lblCls}">ایمیل کاری</label><input id="pf-email" type="email" value="${prof.email}" class="${inpCls}"/></div>
        <div><label class="${lblCls}">تلفن تماس</label><input id="pf-phone" value="${prof.phone}" class="${inpCls}"/></div>
      </div>
      <div><label class="${lblCls}">عنوان شغلی</label><input id="pf-role" value="${prof.role}" class="${inpCls}"/></div>
      <div><label class="${lblCls}">بیوگرافی و مسئولیت‌ها</label><textarea id="pf-bio" rows="3" class="${inpCls}">${prof.bio}</textarea></div>
      <div class="flex flex-wrap gap-3 border-t border-[#efe3d5] pt-4 dark:border-white/10">
        <button type="submit" class="inline-flex items-center gap-2 rounded-xl bg-[#7b8f3b] px-6 py-2.5 text-sm font-bold text-white shadow-sm shadow-[#7b8f3b]/20 hover:bg-[#6a7e32] transition">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" class="w-4 h-4"><polyline points="20 6 9 17 4 12"/></svg>
          ذخیره تنظیمات
        </button>
        <button type="button" id="reset-btn" class="rounded-xl border border-[#eadfce] px-5 py-2.5 text-sm font-semibold text-[#9a7b65] hover:bg-[#f5ede3] dark:border-white/10 dark:hover:bg-white/5 transition">بازنشانی اطلاعات اولیه</button>
      </div>
    </form>
  `;
  profileCard.querySelector("#profile-form").addEventListener("submit", e => {
    e.preventDefault();
    store.updateProfile({
      firstName: profileCard.querySelector("#pf-fname").value,
      lastName:  profileCard.querySelector("#pf-lname").value,
      email:     profileCard.querySelector("#pf-email").value,
      phone:     profileCard.querySelector("#pf-phone").value,
      role:      profileCard.querySelector("#pf-role").value,
      bio:       profileCard.querySelector("#pf-bio").value,
    });
    showToast("پروفایل در LocalStorage ذخیره شد.", "success");
  });
  profileCard.querySelector("#reset-btn").addEventListener("click", () => {
    if (!confirm("آیا مطمئن هستید؟ تمام داده‌ها به حالت اولیه برمی‌گردند.")) return;
    store.resetToDefaults();
    showToast("سیستم به حالت اولیه بازنشانی شد.", "info");
    renderPage();
  });
  wrap.appendChild(profileCard);

  // Right column
  const rightCol = document.createElement("div");
  rightCol.className = "space-y-5";

  // Theme
  const themeCard = document.createElement("div");
  themeCard.className = `${card} p-5 sm:p-6`;
  themeCard.innerHTML = `
    <h3 class="text-sm font-extrabold text-[#2f281f] dark:text-[#f5ede3] mb-1">ظاهر و تم داشبورد</h3>
    <p class="text-xs text-[#9a7b65] mb-5">حالت نمایش با کنتراست بالا</p>
    <div class="grid gap-3 sm:grid-cols-2">
      <button id="theme-light" class="rounded-2xl border p-4 text-right transition ${appState.theme === "light" ? "border-[#7b8f3b] bg-[#eef3df] shadow-sm" : "border-[#eadfce] bg-white/80 hover:bg-white dark:border-white/10 dark:bg-white/5"}">
        <div class="mb-3 h-16 rounded-xl border border-[#efe3d5] bg-[#faf7f2]"></div>
        <div class="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-4 h-4 text-amber-500"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>
          <span class="text-sm font-bold text-[#2f281f] dark:text-[#f5ede3]">تم روشن</span>
        </div>
      </button>
      <button id="theme-dark" class="rounded-2xl border p-4 text-right transition ${appState.theme === "dark" ? "border-[#7b8f3b] bg-[#26301b] shadow-sm" : "border-[#eadfce] bg-white/80 hover:bg-white dark:border-white/10 dark:bg-white/5"}">
        <div class="mb-3 h-16 rounded-xl border border-white/10 bg-[#161412]"></div>
        <div class="flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-4 h-4 text-indigo-400"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          <span class="text-sm font-bold text-[#2f281f] dark:text-[#f5ede3]">تم تیره</span>
        </div>
      </button>
    </div>
  `;
  // themeCard.querySelector("#theme-light").addEventListener("click", () => { if (appState.theme !== "light") toggleTheme(); });
  themeCard.querySelector("#theme-dark").addEventListener("click", () => { if (appState.theme !== "dark") toggleTheme(); });
  rightCol.appendChild(themeCard);

  // System info
  const sysCard = document.createElement("div");
  sysCard.className = `${card} p-5`;
  sysCard.innerHTML = `
    <h3 class="text-sm font-extrabold text-[#2f281f] dark:text-[#f5ede3] mb-4">وضعیت فنی سیستم</h3>
    <div class="space-y-2.5">
      ${[
        ["معماری",    "Vanilla JavaScript", "text-emerald-600"],
        ["استایل",    "Tailwind CSS v4",    "text-[#7b8f3b]"],
        ["چارت‌ها",   "Chart.js v4",        "text-sky-600"],
        ["اسلایدر",   "Swiper.js v11",      "text-amber-600"],
        ["ذخیره‌سازی","LocalStorage",       "text-violet-600"],
        ["فونت",      "Vazirmatn",          "text-rose-600"],
      ].map(([k, v, cls]) => `
        <div class="flex justify-between items-center rounded-xl bg-[#f8f4ed] p-3 dark:bg-white/5">
          <span class="text-xs font-medium text-[#9a7b65]">${k}</span>
          <span class="text-xs font-bold ${cls}">${v}</span>
        </div>
      `).join("")}
    </div>
  `;
  rightCol.appendChild(sysCard);
  wrap.appendChild(rightCol);

  return wrap;
}
