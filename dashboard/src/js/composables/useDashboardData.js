import {onMounted, onUnmounted} from "vue";
import {getLights, getSwitches, getRooms} from "../api/getEntity.js";
import getWeather from "../api/getWeather.js";
import {lights, switches, rooms, weather} from "./dashboardStore.js";

const POLL_INTERVAL_MS = 10000;

export function useDashboardData() {
    let intervalId = null;

    async function refresh() {
        weather.value = await getWeather();
        lights.value = await getLights();
        switches.value = await getSwitches();
        rooms.value = await getRooms();
    }

    onMounted(() => {
        refresh();
        intervalId = setInterval(refresh, POLL_INTERVAL_MS);
    });

    onUnmounted(() => {
        clearInterval(intervalId);
    });

    return {weather, lights, switches, rooms};
}