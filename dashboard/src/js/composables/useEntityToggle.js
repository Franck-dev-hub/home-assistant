import {toggleLight, toggleSwitch} from "../api/toggleEntity.js";
import {useOptimisticValue} from "./useOptimisticValue.js";
import {setLightActive, setSwitchActive} from "./dashboardStore.js";

const STORE_SETTERS = {
    light: setLightActive,
    switch: setSwitchActive,
};

const TOGGLERS = {
    light: toggleLight,
    switch: toggleSwitch,
};

export function useEntityToggle(entity, type) {
    const {value: active, commit} = useOptimisticValue(() => entity.isActive);

    function toggle() {
        const wasActive = active.value;
        STORE_SETTERS[type](entity.id, !wasActive);
        commit(!wasActive, () => TOGGLERS[type](entity.id, wasActive));
    }

    return {active, toggle};
}
