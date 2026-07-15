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
    "src/js/data.js",
    "src/js/store.js",
    "src/js/helpers.js",
    "src/js/icons.js",
    "src/js/state.js",
    "src/js/components.js",

    "src/js/auth.js",

    "src/js/pages/dashboard.js",
    "src/js/pages/analytics.js",
    "src/js/pages/orders.js",
    "src/js/pages/products.js",
    "src/js/pages/customers.js",
    "src/js/pages/messages.js",
    "src/js/pages/reports.js",
    "src/js/pages/calendar.js",
    "src/js/pages/settings.js",

    "src/js/app.js",
];

// ترتیب مهمه
for (const src of legacyScripts) {
    await loadScript(src);
}