import "./styles/main.css";

// Swiper CSS (local)
import "swiper/css/bundle";

// Make Chart & Swiper available as globals for your current scripts
import Chart from "chart.js/auto";
import Swiper from "swiper/bundle";

window.Chart = Chart;
window.Swiper = Swiper;

import * as jalaali from "jalaali-js";
window.jalaali = jalaali;