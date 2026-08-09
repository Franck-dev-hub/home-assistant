import {ref} from "vue";

export const lights = ref([]);
export const switches = ref([]);
export const rooms = ref([]);
export const weather = ref(null);

export function setSwitchActive(id, isActive) {
    const target = switches.value.find(s => s.id === id);
    if (target) {
        target.isActive = isActive;
    }
}

export function setLightActive(id, isActive) {
    const target = lights.value.find(l => l.id === id);
    if (target) {
        target.isActive = isActive;
    }
}