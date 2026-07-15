/* DataStore (LocalStorage-backed state) */

class DataStore {
  constructor() {
    this._listeners = [];
    this.state = this._normalize(this._load())
      ;
  }
  _normalize(state) {
    const t = window.jalaali.toJalaali(new Date());
    const events = (state.events ?? []).map(ev => {
      // اگر از قبل کامل شمسی است
      if (ev.jy && ev.jm && ev.jd) return ev;

      // نسخه قدیمی: فقط day داشت
      const jd = ev.jd ?? ev.day ?? 1;
      return { ...ev, jy: ev.jy ?? t.jy, jm: ev.jm ?? t.jm, jd };
    });

    return { ...state, events };
  }

  _load() {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) {
        const p = JSON.parse(s);
        return {
          products: p.products ?? [...defaultProducts],
          customers: p.customers ?? [...defaultCustomers],
          orders: p.orders ?? [...defaultOrders],
          messages: p.messages ?? [...defaultMessages],
          activities: p.activities ?? [...defaultActivities],
          notifications: p.notifications ?? [...defaultNotifications],
          reports: p.reports ?? [...defaultReports],
          events: p.events ?? [...defaultEvents],
          profile: p.profile ?? { ...defaultProfile },
        };
      }
    } catch (e) {
      // Corrupted data — fall through to defaults
    }
    return this._getDefaults();
  }

  _getDefaults() {
    return {
      products: [...defaultProducts],
      customers: [...defaultCustomers],
      orders: [...defaultOrders],
      messages: [...defaultMessages],
      activities: [...defaultActivities],
      notifications: [...defaultNotifications],
      reports: [...defaultReports],
      events: [...defaultEvents],
      profile: { ...defaultProfile },
    };
  }

  subscribe(fn) {
    this._listeners.push(fn);
    return () => {
      this._listeners = this._listeners.filter(l => l !== fn);
    };
  }

  _notify() {
    this._save();
    this._listeners.forEach(fn => fn());
  }

  _save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      // localStorage full or unavailable
    }
  }

  resetToDefaults() {
    localStorage.removeItem(STORAGE_KEY);
    this.state = this._getDefaults();
    this._notify();
  }

  /* Getters */
  get products() { return this.state.products; }
  get customers() { return this.state.customers; }
  get orders() { return this.state.orders; }
  get messages() { return this.state.messages; }
  get activities() { return this.state.activities; }
  get notifications() { return this.state.notifications; }
  get reports() { return this.state.reports; }
  get events() { return this.state.events; }
  get profile() { return this.state.profile; }

  /* Mutations */
  addProduct(data) {
    const id = `P-${200 + this.state.products.length}`;
    const prod = { id, sales: 0, rating: 5.0, ...data };
    this.state.products.unshift(prod);
    this.state.activities.unshift({
      id: `ACT-${Date.now()}`,
      title: "محصول جدید اضافه شد",
      description: `کالای «${prod.title}» به انبار متصل شد.`,
      time: "همین حالا",
      tone: "emerald",
    });
    this._notify();
    return prod;
  }

  addEvent(data) {
    const id = `EV-${100 + this.state.events.length}`;
    const ev = { id, ...data };
    this.state.events.push(ev);
    this._notify();
    return ev;
  }

  updateOrderStatus(orderId, newStatus) {
    const o = this.state.orders.find(x => x.id === orderId);
    if (!o) return;
    o.status = newStatus;
    this.state.activities.unshift({
      id: `ACT-${Date.now()}`,
      title: `وضعیت ${orderId} تغییر کرد`,
      description: `سفارش به «${newStatus}» به‌روزرسانی شد.`,
      time: "همین حالا",
      tone: "sky",
    });
    this._notify();
  }

  replyMessage(msgId, replyText) {
    const m = this.state.messages.find(x => x.id === msgId);
    if (!m) return;
    m.unread = false;
    this.state.activities.unshift({
      id: `ACT-${Date.now()}`,
      title: "پاسخ پشتیبانی ارسال شد",
      description: `به «${m.subject}» پاسخ داده شد: ${replyText.slice(0, 40)}...`,
      time: "همین حالا",
      tone: "emerald",
    });
    this._notify();
  }

  updateProfile(data) {
    this.state.profile = { ...this.state.profile, ...data };
    this._notify();
  }
}

const store = new DataStore();
