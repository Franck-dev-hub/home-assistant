import {onMounted, onUnmounted, ref} from "vue";
import {getMarsPrinter} from "../api/getMarsPrinter.js";

const POLL_INTERVAL_MS = 10000;

export function useMarsPrinterData() {
    const printer = ref(null);
    let intervalId = null;

    async function refresh() {
        printer.value = await getMarsPrinter();
    }

    onMounted(() => {
        refresh();
        intervalId = setInterval(refresh, POLL_INTERVAL_MS);
    });

    onUnmounted(() => {
        clearInterval(intervalId);
    });

    return {printer, refresh};
}
