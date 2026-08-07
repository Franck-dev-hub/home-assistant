import {config} from "../../config.js";

window.ROOMS = config.ROOMS;
window.GREETING_NAME = config.GREETING_NAME;

import "./composables/useTheme.js";

import {createApp} from "vue";

import App from "./App.vue";
import "../css/styles.scss";

createApp(App).mount("#app");
