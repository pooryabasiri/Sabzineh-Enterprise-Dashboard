import "./boot.js"; // Tailwind + Font + Chart/Swiper globals

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.defer = true;
        s.onload = resolve;
        s.onerror = () => reject(new Error(`Failed to load: ${src}`));
        document.body.appendChild(s);
    });
}

const legacyScripts = [
    "/js/data.js",
    "/js/store.js",
    "/js/helpers.js",
    "/js/icons.js",
    "/js/state.js",
    "/js/components.js",

    "/js/auth.js",

    "/js/pages/dashboard.js",
    "/js/pages/analytics.js",
    "/js/pages/orders.js",
    "/js/pages/products.js",
    "/js/pages/customers.js",
    "/js/pages/messages.js",
    "/js/pages/reports.js",
    "/js/pages/calendar.js",
    "/js/pages/settings.js",

    "/js/app.js",
];

// ترتیب مهمه
for (const src of legacyScripts) {
    await loadScript(src);
}