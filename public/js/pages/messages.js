/* سبزینه — Messages & Support Page */

function renderMessages() {
  const q = appState.searchQuery.toLowerCase();
  const list = store.messages.filter(m => {
    const c = getCustomerById(m.customerId);
    return !q || [m.subject, m.body, c?.name, m.priority].some(v => String(v ?? "").toLowerCase().includes(q));
  });

  // Select first message if current selection is invalid
  if (!appState.selectedMsgId || !list.find(m => m.id === appState.selectedMsgId)) {
    appState.selectedMsgId = list[0]?.id ?? null;
  }
  const activeMsg = list.find(m => m.id === appState.selectedMsgId) ?? list[0];

  const wrap = document.createElement("div");
  wrap.className = "grid gap-5 xl:grid-cols-[1.1fr_1fr]";

  // List panel 
  const listPanel = document.createElement("div");
  listPanel.className = `${card} overflow-hidden`;
  listPanel.innerHTML = `
    <div class="border-b border-[#efe3d5] px-5 py-4 dark:border-white/10">
      <h2 class="text-sm font-extrabold text-[#2f281f] dark:text-[#f5ede3]">پیام‌ها و تیکت‌های پشتیبانی</h2>
      <p class="mt-0.5 text-xs text-[#9a7b65]">مدیریت درخواست‌های خریداران با اولویت‌بندی</p>
    </div>
    <div class="max-h-176 overflow-y-auto divide-y divide-[#efe3d5] dark:divide-white/10" id="msg-list">
      ${list.length
        ? list.map(m => {
            const c = getCustomerById(m.customerId);
            const isSel = activeMsg?.id === m.id;
            return `<button class="msg-item flex w-full items-start gap-3 p-4 text-right transition ${isSel ? "bg-[#f5ede3] dark:bg-white/5 msg-item-active" : "hover:bg-[#fdfaf6] dark:hover:bg-white/5"}" data-msgid="${m.id}">
              <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${c?.gradient ?? "from-stone-500 to-amber-700"} text-sm font-extrabold text-white">${c?.initials ?? "-"}</div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-1">
                  <span class="truncate text-sm font-bold text-[#2f281f] dark:text-[#f5ede3]">${c?.name ?? "کاربر"}</span>
                  <div class="flex items-center gap-1.5 shrink-0">
                    ${m.unread ? `<span class="h-2 w-2 rounded-full bg-emerald-500"></span>` : ""}
                    <span class="rounded-full px-2 py-0.5 text-[10px] ${statusChip(m.priority)}">${m.priority}</span>
                  </div>
                </div>
                <p class="mt-1 truncate text-xs font-semibold text-[#5e4e3c] dark:text-[#e7d7c8]">${m.subject}</p>
                <p class="mt-0.5 text-xs leading-5 text-[#7a6655] dark:text-[#b09080] line-clamp-2">${m.body}</p>
                <p class="mt-1.5 text-[11px] text-[#9a7b65]">${formatDateTime(m.receivedAt)}</p>
              </div>
            </button>`;
          }).join("")
        : `<p class="py-12 text-center text-sm text-[#9a7b65]">پیامی یافت نشد.</p>`}
    </div>
  `;
  listPanel.querySelectorAll(".msg-item").forEach(btn => {
    btn.addEventListener("click", () => {
      appState.selectedMsgId = btn.dataset.msgid;
      renderPage();
    });
  });
  wrap.appendChild(listPanel);

  // Detail panel 
  const detailPanel = document.createElement("div");
  detailPanel.className = `${card} p-5 sm:p-6`;
  if (activeMsg) {
    const c = getCustomerById(activeMsg.customerId);
    detailPanel.innerHTML = `
      <div class="flex items-start gap-3 border-b border-[#efe3d5] pb-4 dark:border-white/10">
        <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${c?.gradient ?? "from-stone-500 to-amber-700"} text-lg font-extrabold text-white">${c?.initials ?? "-"}</div>
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-extrabold text-[#2f281f] dark:text-[#f5ede3]">${c?.name ?? "کاربر"}</h3>
            <span class="rounded-full px-2.5 py-0.5 text-xs ${statusChip(activeMsg.priority)}">${activeMsg.priority}</span>
          </div>
          <p class="text-xs text-[#9a7b65]">${c?.email ?? ""}</p>
          <p class="text-xs text-[#9a7b65]">${formatDateTime(activeMsg.receivedAt)}</p>
        </div>
      </div>
      <div class="mt-5 rounded-2xl border border-[#efe3d5] bg-[#fffdfa] p-5 dark:border-white/10 dark:bg-white/5">
        <h4 class="text-sm font-extrabold text-[#2f281f] dark:text-[#f5ede3]">${activeMsg.subject}</h4>
        <p class="mt-3 text-sm leading-8 text-[#5e4e3c] dark:text-[#d8c6b4]">${activeMsg.body}</p>
      </div>
      <div class="mt-5">
        <label class="mb-2 block text-xs font-bold text-[#7a6655] dark:text-[#c4aa96]">پاسخ سریع پشتیبانی:</label>
        <textarea id="reply-text" rows="4" placeholder="پاسخ خود را بنویسید..." class="w-full rounded-2xl border border-[#eadfce] bg-white/80 p-4 text-sm font-medium outline-none transition focus:border-[#7b8f3b] dark:border-white/10 dark:bg-white/5 dark:text-white"></textarea>
        <div class="mt-3 flex justify-end">
          <button id="send-reply" class="inline-flex items-center gap-2 rounded-xl bg-[#7b8f3b] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#6a7e32] transition">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="w-4 h-4"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            ارسال پاسخ
          </button>
        </div>
      </div>
    `;
    detailPanel.querySelector("#send-reply").addEventListener("click", () => {
      const replyText = detailPanel.querySelector("#reply-text").value.trim();
      if (!replyText) { showToast("متن پاسخ را بنویسید.", "warning"); return; }
      store.replyMessage(activeMsg.id, replyText);
      showToast("پاسخ شما برای مشتری ارسال شد.", "success");
      renderPage();
    });
  } else {
    detailPanel.innerHTML = `<div class="flex items-center justify-center h-64 text-sm text-[#9a7b65]">یک پیام را از لیست انتخاب کنید.</div>`;
  }
  wrap.appendChild(detailPanel);
  return wrap;
}
