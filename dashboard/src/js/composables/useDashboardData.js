import {onMounted, ref} from "vue";
import {getLights, getSwitches, getRooms} from "../api/getEntity.js";
import getWeather from "../api/getWeather.js";

// Loads all dashboard
export function useDashboardData() {
    const weather = ref(null);
    const lights = ref([]);
    const switches = ref([]);
    const rooms = ref([]);

    onMounted(async () => {
        weather.value = await getWeather();
        lights.value = await getLights();
        switches.value = await getSwitches();
        rooms.value = await getRooms();
    });

    return {weather, lights, switches, rooms};
}
