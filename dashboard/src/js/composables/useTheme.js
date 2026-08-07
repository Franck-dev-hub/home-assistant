import {ref, watchEffect} from "vue";

const STORAGE_KEY = "theme";
const DEFAULT_THEME = "dark";

function readStoredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : DEFAULT_THEME;
}

const theme = ref(readStoredTheme());

watchEffect(() => {
    document.documentElement.dataset.theme = theme.value;
    localStorage.setItem(STORAGE_KEY, theme.value);
});

export function useTheme() {
    function toggleTheme() {
        theme.value = theme.value === "dark" ? "light" : "dark";
    }

    return {theme, toggleTheme};
}
