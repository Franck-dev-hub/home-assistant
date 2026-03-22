import {getAllStates, mapEntity} from "./HomeAssistant.jsx"

// Get wanted lights
export async function getLights() {
    const data = await getAllStates();
    return data
        .filter(e => window.HA_LIGHTS.includes(e.entity_id))
        .map(mapEntity)
}

// Get wanted switches
export async function getSwitches() {
    const data = await getAllStates();
    return data
        .filter(e => window.HA_SWITCHES.includes(e.entity_id))
        .map(mapEntity)
}