import {onMounted, onUnmounted, ref} from "vue";
import {getPrinter} from "../api/getPrinter.js";

const POLL_INTERVAL_MS = 10000;

export function usePrinterData() {
    const printer = ref(null);
    let intervalId = null;

    async function refresh() {
        printer.value = await getPrinter();
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
