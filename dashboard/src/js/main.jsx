import {config} from "../../config.js";

window.HA_URL = config.HA_URL
window.HA_TOKEN = config.HA_TOKEN
window.HA_LIGHTS = config.HA_LIGHTS
window.HA_SWITCHES = config.HA_SWITCHES
window.HEADERS = {
    "Authorization": `Bearer ${HA_TOKEN}`,
    "Content-Type": "application/json"
}

import {StrictMode, useEffect, useState} from "react";
import {createRoot} from "react-dom/client";

import App from "./App.jsx";
import "../css/global.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App/>
    </StrictMode>,
);
