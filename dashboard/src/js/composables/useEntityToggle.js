import {ref} from "vue";
import {toggleLight, toggleSwitch} from "../api/toggleEntity.js";

const TOGGLERS = {
    light: toggleLight,
    switch: toggleSwitch,
};

// Optimistic on/off toggle for a single HA entity, with rollback on failure
export function useEntityToggle(entity, type) {
    const active = ref(entity.isActive);

    async function toggle() {
        const prev = active.value;
        active.value = !prev;
        try {
            await TOGGLERS[type](entity.id, prev);
        } catch {
            active.value = prev;
        }
    }

    return {active, toggle};
}
