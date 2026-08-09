import {computed, ref} from "vue";

// Local value wins over the polled server value until the next commit resets it,
// so a control reflects the user's action immediately instead of waiting for the next poll.
export function useOptimisticValue(getServerValue) {
    const override = ref(null);
    const value = computed(() => override.value ?? getServerValue());

    function setLocal(newValue) {
        override.value = newValue;
    }

    async function commit(newValue, applyFn) {
        const prev = value.value;
        override.value = newValue;
        try {
            await applyFn(newValue);
        } catch {
            override.value = prev;
        }
    }

    return {value, setLocal, commit};
}
