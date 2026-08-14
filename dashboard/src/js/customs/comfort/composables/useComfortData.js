import {onMounted, onUnmounted, ref} from "vue";
import {getComfort} from "../api/getComfort.js";

const POLL_INTERVAL_MS = 10000;

export function useComfortData(key) {
    const comfort = ref(null);
    let intervalId = null;

    async function refresh() {
        comfort.value = await getComfort(key);
    }

    onMounted(() => {
        refresh();
        intervalId = setInterval(refresh, POLL_INTERVAL_MS);
    });

    onUnmounted(() => {
        clearInterval(intervalId);
    });

    return {comfort, refresh};
}
